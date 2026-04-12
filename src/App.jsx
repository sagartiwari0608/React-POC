import { Navigate, Route, Routes } from "react-router-dom";
import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import { useApi } from "./hooks/useApi";
import { useDebounce } from "./hooks/useDebounce";
import { useProjects } from "./hooks/useProjects";
import { mockData } from "./data/mockData";
import ProjectsScreen from "./components/ProjectsScreen";
import TasksScreen from "./components/TasksScreen";
import "./App.css";

const PAGE_SIZE = 10;

const createFallbackManager = (id) => `API Owner ${((id - 1) % 5) + 1}`;

const normalizeMockProject = (project) => ({
  id: `mock-${project.id}`,
  name: project.name,
  manager: project.manager,
  status: project.status,
  deadline: project.deadline,
  description: project.description,
  source: "mock",
});

const normalizeApiProject = (project) => ({
  id: `api-${project.id}`,
  name: project.title,
  manager: createFallbackManager(project.id),
  status:
    project.id % 3 === 0
      ? "Completed"
      : project.id % 2 === 0
        ? "On Hold"
        : "In Progress",
  deadline: `2026-${String((project.id % 12) + 1).padStart(2, "0")}-${String((project.id % 28) + 1).padStart(2, "0")}`,
  description: project.body,
  source: "api",
});

const taskTemplates = [
  {
    suffix: "Discovery",
    statuses: ["In Progress", "In Review", "Completed"],
    owners: ["Research", "Planning", "Analysis"],
  },
  {
    suffix: "Delivery",
    statuses: ["Planned", "In Progress", "Blocked"],
    owners: ["Engineering", "QA", "Operations"],
  },
];

const buildTasksFromProjects = (projects) =>
  projects.flatMap((project, projectIndex) =>
    taskTemplates.map((template, templateIndex) => ({
      id: `${project.id}-task-${templateIndex + 1}`,
      title: `${project.name} ${template.suffix}`,
      projectName: project.name,
      owner: template.owners[(projectIndex + templateIndex) % template.owners.length],
      status: template.statuses[(projectIndex + templateIndex) % template.statuses.length],
      dueDate: project.deadline,
      source: project.source,
    }))
  );

const initialViewState = {
  mock: { search: "", page: 1, selectedId: null },
  api: { search: "", page: 1, selectedId: null },
};

function App() {
  const { projects: mockProjects } = useProjects();
  const { data: apiProjects, loading: apiLoading, error } = useApi();

  const [source, setSource] = useState("mock");
  const [viewState, setViewState] = useState(initialViewState);

  const activeView = viewState[source];
  const debouncedSearch = useDebounce(activeView.search);

  const normalizedProjects = useMemo(
    () => ({
      mock: (mockProjects.length > 0 ? mockProjects : mockData.projects).map(normalizeMockProject),
      api: apiProjects.map(normalizeApiProject),
    }),
    [apiProjects, mockProjects]
  );

  const tasksBySource = useMemo(
    () => ({
      mock: buildTasksFromProjects(normalizedProjects.mock),
      api: buildTasksFromProjects(normalizedProjects.api),
    }),
    [normalizedProjects]
  );

  const baseData = normalizedProjects[source];

  const filtered = useMemo(() => {
    return baseData.filter((item) =>
      [item.name, item.manager, item.status, item.description]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(debouncedSearch.toLowerCase()))
    );
  }, [baseData, debouncedSearch]);

  const paginated = useMemo(() => {
    const start = (activeView.page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [activeView.page, filtered]);

  const selectedProject = useMemo(() => {
    const matchingProject = baseData.find((project) => project.id === activeView.selectedId);
    return matchingProject ?? paginated[0] ?? null;
  }, [activeView.selectedId, baseData, paginated]);

  const updateActiveView = (updates) => {
    setViewState((currentState) => ({
      ...currentState,
      [source]: {
        ...currentState[source],
        ...updates,
      },
    }));
  };

  const handleSearchChange = (value) => {
    updateActiveView({ search: value, page: 1, selectedId: null });
  };

  const handlePageChange = (nextPage) => {
    updateActiveView({ page: nextPage, selectedId: null });
  };

  const handleProjectSelect = (project) => {
    updateActiveView({ selectedId: project.id });
  };

  const isLoading = source === "api" ? apiLoading : false;
  const emptyMessage =
    source === "api"
      ? "No API projects match the current search."
      : "No mock projects match the current search.";

  return (
    <div className="app-shell">
      <Navbar source={source} setSource={setSource} />

      <Routes>
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route
          path="/projects"
          element={
            <ProjectsScreen
              source={source}
              search={activeView.search}
              setSearch={handleSearchChange}
              isLoading={isLoading}
              error={error}
              paginatedProjects={paginated}
              selectedProject={selectedProject}
              onProjectSelect={handleProjectSelect}
              emptyMessage={emptyMessage}
              page={activeView.page}
              setPage={handlePageChange}
              total={filtered.length}
              pageSize={PAGE_SIZE}
            />
          }
        />
        <Route
          path="/tasks"
          element={
            <TasksScreen
              source={source}
              tasks={tasksBySource[source]}
              isLoading={isLoading}
              error={error}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

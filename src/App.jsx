import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import { useApi } from "./hooks/useApi";
import { useDebounce } from "./hooks/useDebounce";
import { useProjects } from "./hooks/useProjects";
import { mockData } from "./data/mockData";
import SearchBar from "./components/Searchbar";
import Pagination from "./components/Pagination";
import ProjectList from "./components/ProjectList";
import ProjectDetails from "./components/ProjectDetails";
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
  status: project.id % 3 === 0 ? "Completed" : project.id % 2 === 0 ? "On Hold" : "In Progress",
  deadline: `2026-${String((project.id % 12) + 1).padStart(2, "0")}-${String((project.id % 28) + 1).padStart(2, "0")}`,
  description: project.body,
  source: "api",
});

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
    <>
      <Navbar source={source} setSource={setSource} />

      <div className="container">
        <div className="toolbar">
          <SearchBar search={activeView.search} setSearch={handleSearchChange} />
          <p className="view-label">
            Viewing <strong>{source === "mock" ? "Mock Data" : "API Data"}</strong>
          </p>
        </div>

        {isLoading && <p className="status-message">Loading {source} projects...</p>}
        {error && source === "api" && (
          <p className="status-message error">Unable to load API projects.</p>
        )}

        <div className="dashboard">
          <div className="left-panel">
            <ProjectList
              projects={paginated}
              onSelect={handleProjectSelect}
              selectedId={selectedProject?.id}
              emptyMessage={emptyMessage}
            />
          </div>

          <div className="right-panel">
            <ProjectDetails project={selectedProject} />
          </div>
        </div>

        <Pagination
          page={activeView.page}
          setPage={handlePageChange}
          total={filtered.length}
          pageSize={PAGE_SIZE}
        />
      </div>
    </>
  );
}

export default App;

import { Navigate, Route, Routes } from "react-router-dom";
import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import EntityModal from "./components/EntityModal";
import { useDebounce } from "./hooks/useDebounce";
import ProjectsScreen from "./components/ProjectsScreen";
import TasksScreen from "./components/TasksScreen";
import { useProjectsApi } from "./hooks/useProjectsApi";
import { useTasksApi } from "./hooks/useTasksApi";
import "./App.css";

const PAGE_SIZE = 10;

const initialModalState = {
  open: false,
  entityType: "project",
  mode: "create",
  initialValues: null,
};

function App() {
  const {
    projects,
    loading: projectsLoading,
    saving: projectsSaving,
    error: projectsError,
    createProject,
    updateProject,
  } = useProjectsApi();
  const {
    tasks,
    loading: tasksLoading,
    saving: tasksSaving,
    error: tasksError,
    createTask,
    updateTask,
    patchTaskStatus,
  } = useTasksApi();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [modalState, setModalState] = useState(initialModalState);

  const debouncedSearch = useDebounce(search);

  const projectTaskCounts = useMemo(
    () =>
      tasks.reduce((counts, task) => {
        counts[task.projectId] = (counts[task.projectId] ?? 0) + 1;
        return counts;
      }, {}),
    [tasks]
  );

  const projectsWithMetrics = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        taskCount: projectTaskCounts[project.id] ?? 0,
      })),
    [projectTaskCounts, projects]
  );

  const filtered = useMemo(() => {
    return projectsWithMetrics.filter((item) =>
      [item.name, item.manager, item.status, item.description]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(debouncedSearch.toLowerCase()))
    );
  }, [debouncedSearch, projectsWithMetrics]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const selectedProject = useMemo(() => {
    const matchingProject = projectsWithMetrics.find((project) => project.id === selectedProjectId);
    return matchingProject ?? paginated[0] ?? null;
  }, [paginated, projectsWithMetrics, selectedProjectId]);

  const tasksWithProjectName = useMemo(
    () =>
      tasks.map((task) => ({
        ...task,
        projectName:
          projects.find((project) => project.id === task.projectId)?.name ?? "Unknown Project",
      })),
    [projects, tasks]
  );

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
    setSelectedProjectId(null);
  };

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
    setSelectedProjectId(null);
  };

  const handleProjectSelect = (project) => {
    setSelectedProjectId(project.id);
  };

  const openModal = (entityType, mode, initialValues = null) => {
    setModalState({
      open: true,
      entityType,
      mode,
      initialValues,
    });
  };

  const closeModal = () => {
    setModalState(initialModalState);
  };

  const handleProjectSubmit = async (values) => {
    if (modalState.mode === "create") {
      const createdProject = await createProject(values);
      setSelectedProjectId(createdProject.id);
    } else {
      await updateProject(modalState.initialValues.id, values);
    }

    closeModal();
  };

  const handleTaskSubmit = async (values) => {
    const payload = {
      ...values,
      projectId: Number(values.projectId),
    };

    if (modalState.mode === "create") {
      await createTask(payload);
    } else {
      await updateTask(modalState.initialValues.id, payload);
    }

    closeModal();
  };

  const handleModalSubmit = async (values) => {
    if (modalState.entityType === "project") {
      await handleProjectSubmit(values);
      return;
    }

    await handleTaskSubmit(values);
  };

  const handleTaskStatusChange = async (taskId, status) => {
    await patchTaskStatus(taskId, status);
  };

  const openCreateProjectModal = () => openModal("project", "create");
  const openEditProjectModal = (project) => openModal("project", "update", project);
  const openCreateTaskModal = (project = null) =>
    openModal("task", "create", project ? { projectId: String(project.id) } : null);
  const openEditTaskModal = (task) =>
    openModal("task", "update", {
      ...task,
      projectId: String(task.projectId),
    });

  const isLoading = projectsLoading || tasksLoading;
  const isSaving = projectsSaving || tasksSaving;
  const error = projectsError ?? tasksError;
  const emptyMessage = "No API projects match the current search.";

  return (
    <div className="app-shell">
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route
          path="/projects"
          element={
            <ProjectsScreen
              search={search}
              setSearch={handleSearchChange}
              isLoading={isLoading}
              error={error}
              paginatedProjects={paginated}
              selectedProject={selectedProject}
              onProjectSelect={handleProjectSelect}
              emptyMessage={emptyMessage}
              page={page}
              setPage={handlePageChange}
              total={filtered.length}
              pageSize={PAGE_SIZE}
              onCreateProject={openCreateProjectModal}
              onEditProject={openEditProjectModal}
              onAddTask={openCreateTaskModal}
            />
          }
        />
        <Route
          path="/tasks"
          element={
            <TasksScreen
              tasks={tasksWithProjectName}
              isLoading={isLoading}
              error={error}
              onCreateTask={() => openCreateTaskModal(selectedProject)}
              onEditTask={openEditTaskModal}
              onStatusChange={handleTaskStatusChange}
            />
          }
        />
      </Routes>

      <EntityModal
        open={modalState.open}
        entityType={modalState.entityType}
        mode={modalState.mode}
        initialValues={modalState.initialValues}
        projects={projects}
        isSaving={isSaving}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}

export default App;

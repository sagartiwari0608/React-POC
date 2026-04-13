import Pagination from "./Pagination";
import ProjectDetails from "./ProjectDetails";
import ProjectList from "./ProjectList";
import SearchBar from "./Searchbar";

const ProjectsScreen = ({
  search,
  setSearch,
  isLoading,
  error,
  paginatedProjects,
  selectedProject,
  onProjectSelect,
  emptyMessage,
  page,
  setPage,
  total,
  pageSize,
  onCreateProject,
  onEditProject,
  onAddTask,
}) => {
  return (
    <div className="container">
      <div className="toolbar">
        <SearchBar search={search} setSearch={setSearch} />
        <div className="toolbar-actions">
          <p className="view-label">
            Viewing <strong>Live API projects</strong>
          </p>
          <button type="button" className="primary-button" onClick={onCreateProject}>
            Add Project
          </button>
        </div>
      </div>

      {isLoading && <p className="status-message">Loading projects...</p>}
      {error && <p className="status-message error">Unable to load projects.</p>}

      <div className="dashboard">
        <div className="left-panel">
          <ProjectList
            projects={paginatedProjects}
            onSelect={onProjectSelect}
            selectedId={selectedProject?.id}
            emptyMessage={emptyMessage}
          />
        </div>

        <div className="right-panel">
          <ProjectDetails
            project={selectedProject}
            onEditProject={onEditProject}
            onAddTask={onAddTask}
          />
        </div>
      </div>

      <Pagination page={page} setPage={setPage} total={total} pageSize={pageSize} />
    </div>
  );
};

export default ProjectsScreen;

import Pagination from "./Pagination";
import ProjectDetails from "./ProjectDetails";
import ProjectList from "./ProjectList";
import SearchBar from "./Searchbar";

const ProjectsScreen = ({
  source,
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
}) => {
  return (
    <div className="container">
      <div className="toolbar">
        <SearchBar search={search} setSearch={setSearch} />
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
            projects={paginatedProjects}
            onSelect={onProjectSelect}
            selectedId={selectedProject?.id}
            emptyMessage={emptyMessage}
          />
        </div>

        <div className="right-panel">
          <ProjectDetails project={selectedProject} />
        </div>
      </div>

      <Pagination page={page} setPage={setPage} total={total} pageSize={pageSize} />
    </div>
  );
};

export default ProjectsScreen;

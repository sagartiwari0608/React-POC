const ProjectDetails = ({ project, onEditProject, onAddTask }) => {
  if (!project) {
    return <p className="details-empty">Select a project to see more information.</p>;
  }

  return (
    <div className="project-details">
      <div className="details-header">
        <div>
          <p className="details-source">Live API project</p>
          <h2>{project.name}</h2>
        </div>
        <div className="details-actions">
          <button type="button" className="ghost-button" onClick={() => onEditProject(project)}>
            Edit Project
          </button>
          <button type="button" className="primary-button" onClick={() => onAddTask(project)}>
            Add Task
          </button>
        </div>
      </div>
      <p className="details-description">{project.description}</p>
      <dl className="details-grid">
        <div>
          <dt>Manager</dt>
          <dd>{project.manager}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{project.status}</dd>
        </div>
        <div>
          <dt>Deadline</dt>
          <dd>{project.deadline}</dd>
        </div>
        <div>
          <dt>Tasks</dt>
          <dd>{project.taskCount ?? 0}</dd>
        </div>
      </dl>
    </div>
  );
};

export default ProjectDetails;

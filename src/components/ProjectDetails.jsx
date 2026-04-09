const ProjectDetails = ({ project }) => {
  if (!project) {
    return <p className="details-empty">Select a project to see more information.</p>;
  }

  return (
    <div className="project-details">
      <p className="details-source">
        {project.source === "mock" ? "Mock dataset" : "API dataset"}
      </p>
      <h2>{project.name}</h2>
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
      </dl>
    </div>
  );
};

export default ProjectDetails;

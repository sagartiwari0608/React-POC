import React from "react";
import "./ProjectCard.css";

const statusClassName = (status) => {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus.includes("complete")) {
    return "completed";
  }

  if (normalizedStatus.includes("progress")) {
    return "progress";
  }

  return "hold";
};

const ProjectCard = ({ project, onSelect, isSelected }) => {
  return (
    <button
      type="button"
      className={`card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(project)}
    >
      <h3>{project.name}</h3>
      <p className={`status ${statusClassName(project.status)}`}>{project.status}</p>
      <p className="meta">Manager: {project.manager}</p>
      <p className="meta">Deadline: {project.deadline}</p>
    </button>
  );
};

export default React.memo(ProjectCard);

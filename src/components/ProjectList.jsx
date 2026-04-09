import ProjectCard from "./ProjectCard";

const ProjectList = ({ projects, onSelect, selectedId, emptyMessage }) => {
  if (projects.length === 0) {
    return <p className="list-empty">{emptyMessage}</p>;
  }

  return (
    <div className="project-list">
      {projects.map((p) => (
        <ProjectCard
          key={p.id}
          project={p}
          onSelect={onSelect}
          isSelected={p.id === selectedId}
        />
      ))}
    </div>
  );
};

export default ProjectList;

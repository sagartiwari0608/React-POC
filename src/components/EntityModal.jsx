import { useEffect, useState } from "react";

const PROJECT_DEFAULTS = {
  name: "",
  manager: "",
  status: "Planned",
  deadline: "",
  description: "",
};

const createTaskDefaults = (projectId = "") => ({
  title: "",
  projectId,
  owner: "",
  status: "Planned",
  dueDate: "",
  description: "",
});

const EntityModal = ({
  open,
  entityType,
  mode,
  initialValues,
  projects,
  isSaving,
  onClose,
  onSubmit,
}) => {
  const [formValues, setFormValues] = useState(PROJECT_DEFAULTS);

  useEffect(() => {
    if (!open) {
      return;
    }

    if (entityType === "task") {
      setFormValues({ ...createTaskDefaults(initialValues?.projectId ?? ""), ...initialValues });
      return;
    }

    setFormValues({ ...PROJECT_DEFAULTS, ...initialValues });
  }, [entityType, initialValues, open]);

  if (!open) {
    return null;
  }

  const title =
    mode === "create"
      ? `Create ${entityType === "project" ? "Project" : "Task"}`
      : `Update ${entityType === "project" ? "Project" : "Task"}`;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(formValues);
  };

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="entity-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="entity-modal-title">{title}</h2>
          <button type="button" className="ghost-button" onClick={onClose}>
            Close
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          {entityType === "project" ? (
            <>
              <label>
                Project Name
                <input
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Manager
                <input
                  name="manager"
                  value={formValues.manager}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Status
                <select name="status" value={formValues.status} onChange={handleChange}>
                  <option>Planned</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>On Hold</option>
                </select>
              </label>
              <label>
                Deadline
                <input
                  type="date"
                  name="deadline"
                  value={formValues.deadline}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="full-width">
                Description
                <textarea
                  name="description"
                  rows="4"
                  value={formValues.description}
                  onChange={handleChange}
                  required
                />
              </label>
            </>
          ) : (
            <>
              <label>
                Task Title
                <input
                  name="title"
                  value={formValues.title}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Project
                <select
                  name="projectId"
                  value={formValues.projectId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Owner
                <input
                  name="owner"
                  value={formValues.owner}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Status
                <select name="status" value={formValues.status} onChange={handleChange}>
                  <option>Planned</option>
                  <option>In Progress</option>
                  <option>In Review</option>
                  <option>Completed</option>
                  <option>Blocked</option>
                </select>
              </label>
              <label>
                Due Date
                <input
                  type="date"
                  name="dueDate"
                  value={formValues.dueDate}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="full-width">
                Description
                <textarea
                  name="description"
                  rows="4"
                  value={formValues.description}
                  onChange={handleChange}
                  required
                />
              </label>
            </>
          )}

          <div className="modal-actions">
            <button type="button" className="ghost-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button" disabled={isSaving}>
              {isSaving ? "Saving..." : mode === "create" ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntityModal;

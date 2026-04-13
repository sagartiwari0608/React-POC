const TasksScreen = ({ tasks, isLoading, error, onCreateTask, onEditTask, onStatusChange }) => {
  const completedTasks = tasks.filter((task) => task.status === "Completed").length;

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <p className="eyebrow">Task Board</p>
          <h1>Tasks from the Live API</h1>
          <p className="page-copy">
            Use the modal to create or edit tasks, and use the inline status control to track task
            progress without leaving the screen.
          </p>
        </div>
        <button type="button" className="primary-button" onClick={onCreateTask}>
          Add Task
        </button>
      </div>

      {isLoading && <p className="status-message">Loading tasks...</p>}
      {error && <p className="status-message error">Unable to load tasks.</p>}

      <div className="task-summary">
        <div className="summary-card">
          <span>Total Tasks</span>
          <strong>{tasks.length}</strong>
        </div>
        <div className="summary-card">
          <span>Completed</span>
          <strong>{completedTasks}</strong>
        </div>
        <div className="summary-card">
          <span>Open</span>
          <strong>{tasks.length - completedTasks}</strong>
        </div>
      </div>

      <div className="task-grid">
        {tasks.length === 0 ? (
          <p className="list-empty">No tasks are available yet.</p>
        ) : (
          tasks.map((task) => (
            <article key={task.id} className="task-card">
              <p className="task-source">Task #{task.id}</p>
              <h2>{task.title}</h2>
              <p className="task-project">Project: {task.projectName}</p>
              <div className="task-card-actions">
                <p className={`status task-status ${task.status.toLowerCase().replace(/\s+/g, "-")}`}>
                  {task.status}
                </p>
                <button type="button" className="ghost-button" onClick={() => onEditTask(task)}>
                  Edit
                </button>
              </div>
              <label className="status-select">
                Status
                <select
                  value={task.status}
                  onChange={(event) => onStatusChange(task.id, event.target.value)}
                >
                  <option>Planned</option>
                  <option>In Progress</option>
                  <option>In Review</option>
                  <option>Completed</option>
                  <option>Blocked</option>
                </select>
              </label>
              <dl className="task-meta">
                <div>
                  <dt>Owner</dt>
                  <dd>{task.owner}</dd>
                </div>
                <div>
                  <dt>Due date</dt>
                  <dd>{task.dueDate}</dd>
                </div>
                <div>
                  <dt>Description</dt>
                  <dd>{task.description}</dd>
                </div>
              </dl>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default TasksScreen;

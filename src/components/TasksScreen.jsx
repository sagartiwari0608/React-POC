const TasksScreen = ({ source, tasks, isLoading, error }) => {
  const completedTasks = tasks.filter((task) => task.status === "Completed").length;

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <p className="eyebrow">Task Board</p>
          <h1>Tasks for {source === "mock" ? "Mock Data" : "API Data"}</h1>
          <p className="page-copy">
            This screen uses client-side routing, so switching between Projects and Tasks stays
            inside the app without a full-page reload.
          </p>
        </div>
      </div>

      {isLoading && <p className="status-message">Loading {source} tasks...</p>}
      {error && source === "api" && (
        <p className="status-message error">Unable to load API tasks.</p>
      )}

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
          <p className="list-empty">No tasks are available for this source.</p>
        ) : (
          tasks.map((task) => (
            <article key={task.id} className="task-card">
              <p className="task-source">
                {task.source === "mock" ? "Mock dataset" : "API dataset"}
              </p>
              <h2>{task.title}</h2>
              <p className="task-project">Project: {task.projectName}</p>
              <p className={`status task-status ${task.status.toLowerCase().replace(/\s+/g, "-")}`}>
                {task.status}
              </p>
              <dl className="task-meta">
                <div>
                  <dt>Owner</dt>
                  <dd>{task.owner}</dd>
                </div>
                <div>
                  <dt>Due date</dt>
                  <dd>{task.dueDate}</dd>
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

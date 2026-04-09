import React from "react";

const Filterbar = ({ status, setStatus }) => {
  return (
    <select value={status} onChange={(e) => setStatus(e.target.value)}>
      <option value="">All</option>
      <option value="Completed">Completed</option>
      <option value="In Progress">In Progress</option>
      <option value="On Hold">On Hold</option>
    </select>
  );
};

export default React.memo(Filterbar);
import { render, screen } from "@testing-library/react";
import TasksScreen from "./TasksScreen";

const tasks = [
  {
    id: "task-1",
    title: "Mock Alpha Discovery",
    projectName: "Mock Alpha",
    owner: "Research",
    status: "Completed",
    dueDate: "2026-06-15",
    source: "mock",
  },
  {
    id: "task-2",
    title: "Mock Alpha Delivery",
    projectName: "Mock Alpha",
    owner: "Engineering",
    status: "In Progress",
    dueDate: "2026-06-15",
    source: "mock",
  },
];

describe("TasksScreen", () => {
  it("renders summary values and task cards", () => {
    render(<TasksScreen source="mock" tasks={tasks} isLoading={false} error={null} />);

    expect(screen.getByRole("heading", { name: "Tasks for Mock Data" })).toBeInTheDocument();
    expect(screen.getByText("Mock Alpha Discovery")).toBeInTheDocument();
    expect(screen.getByText("Research")).toBeInTheDocument();
  });

  it("renders an empty state when there are no tasks", () => {
    render(<TasksScreen source="api" tasks={[]} isLoading={false} error={null} />);

    expect(screen.getByText("No tasks are available for this source.")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import TasksScreen from "./TasksScreen";

const tasks = [
  {
    id: 101,
    title: "Discovery Workshop",
    projectName: "Apollo Migration",
    owner: "Research",
    status: "Completed",
    dueDate: "2026-06-15",
    description: "Validate requirements.",
  },
  {
    id: 102,
    title: "Release Checklist",
    projectName: "Apollo Migration",
    owner: "Engineering",
    status: "In Progress",
    dueDate: "2026-06-15",
    description: "Verify release readiness.",
  },
];

describe("TasksScreen", () => {
  it("renders summary values and task cards", () => {
    render(
      <TasksScreen
        tasks={tasks}
        isLoading={false}
        error={null}
        onCreateTask={() => {}}
        onEditTask={() => {}}
        onStatusChange={() => {}}
      />
    );

    expect(screen.getByRole("heading", { name: "Tasks from the Live API" })).toBeInTheDocument();
    expect(screen.getByText("Discovery Workshop")).toBeInTheDocument();
    expect(screen.getByText("Research")).toBeInTheDocument();
  });

  it("renders an empty state when there are no tasks", () => {
    render(
      <TasksScreen
        tasks={[]}
        isLoading={false}
        error={null}
        onCreateTask={() => {}}
        onEditTask={() => {}}
        onStatusChange={() => {}}
      />
    );

    expect(screen.getByText("No tasks are available yet.")).toBeInTheDocument();
  });

  it("calls the status change handler when the task status changes", async () => {
    const user = userEvent.setup();
    const onStatusChange = vi.fn();

    render(
      <TasksScreen
        tasks={tasks}
        isLoading={false}
        error={null}
        onCreateTask={() => {}}
        onEditTask={() => {}}
        onStatusChange={onStatusChange}
      />
    );

    await user.selectOptions(screen.getAllByLabelText("Status")[0], "Planned");

    expect(onStatusChange).toHaveBeenCalledWith(101, "Planned");
  });
});

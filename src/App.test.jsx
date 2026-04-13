import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import App from "./App";
import { projectsFixture, tasksFixture } from "./test/testData";

const createProjectMock = vi.fn();
const updateProjectMock = vi.fn();
const createTaskMock = vi.fn();
const updateTaskMock = vi.fn();
const patchTaskStatusMock = vi.fn();

vi.mock("./hooks/useProjectsApi", () => ({
  useProjectsApi: () => ({
    projects: projectsFixture,
    loading: false,
    saving: false,
    error: null,
    createProject: createProjectMock,
    updateProject: updateProjectMock,
  }),
}));

vi.mock("./hooks/useTasksApi", () => ({
  useTasksApi: () => ({
    tasks: tasksFixture,
    loading: false,
    saving: false,
    error: null,
    createTask: createTaskMock,
    updateTask: updateTaskMock,
    patchTaskStatus: patchTaskStatusMock,
  }),
}));

vi.mock("./hooks/useDebounce", () => ({
  useDebounce: (value) => value,
}));

const renderApp = (initialEntries = ["/projects"]) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );

describe("App routing", () => {
  it("renders the projects screen by default", () => {
    renderApp(["/"]);

    expect(screen.getByText(/Live API projects/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Apollo Migration", level: 3 })
    ).toBeInTheDocument();
  });

  it("navigates to the tasks screen without a full page transition", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole("link", { name: "Tasks" }));

    expect(
      screen.getByRole("heading", { name: "Tasks from the Live API" })
    ).toBeInTheDocument();
    expect(screen.getByText("Discovery Workshop")).toBeInTheDocument();
  });

  it("opens the create project modal from the projects screen", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole("button", { name: "Add Project" }));

    expect(screen.getByRole("heading", { name: "Create Project" })).toBeInTheDocument();
    expect(screen.getByLabelText("Project Name")).toBeInTheDocument();
  });
});

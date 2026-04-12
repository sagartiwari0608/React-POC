import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import App from "./App";
import { apiProjectsFixture, mockProjectsFixture } from "./test/testData";

vi.mock("./hooks/useProjects", () => ({
  useProjects: () => ({
    projects: mockProjectsFixture,
    loading: false,
  }),
}));

vi.mock("./hooks/useApi", () => ({
  useApi: () => ({
    data: apiProjectsFixture,
    loading: false,
    error: null,
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

    expect(screen.getByText(/Viewing/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Mock Alpha", level: 3 })).toBeInTheDocument();
  });

  it("navigates to the tasks screen without a full page transition", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole("link", { name: "Tasks" }));

    expect(
      screen.getByRole("heading", { name: "Tasks for Mock Data" })
    ).toBeInTheDocument();
    expect(screen.getByText("Mock Alpha Discovery")).toBeInTheDocument();
  });

  it("keeps mock and api searches isolated when switching sources", async () => {
    const user = userEvent.setup();
    renderApp();

    const search = screen.getByPlaceholderText("Search projects, managers, status...");
    await user.type(search, "Beta");

    expect(screen.getByRole("heading", { name: "Mock Beta", level: 3 })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Mock Alpha", level: 3 })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "API Data" }));

    expect(screen.getByRole("heading", { name: "API Launch", level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "API Billing", level: 3 })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Mock Data" }));

    expect(screen.getByDisplayValue("Beta")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Mock Alpha", level: 3 })).not.toBeInTheDocument();
  });
});

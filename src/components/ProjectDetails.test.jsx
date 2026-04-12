import { render, screen } from "@testing-library/react";
import ProjectDetails from "./ProjectDetails";

describe("ProjectDetails", () => {
  it("shows an empty state when no project is selected", () => {
    render(<ProjectDetails project={null} />);

    expect(
      screen.getByText("Select a project to see more information.")
    ).toBeInTheDocument();
  });

  it("renders the selected project metadata", () => {
    render(
      <ProjectDetails
        project={{
          id: "mock-1",
          name: "Mock Alpha",
          manager: "Alice",
          status: "In Progress",
          deadline: "2026-06-15",
          description: "Mock alpha description",
          source: "mock",
        }}
      />
    );

    expect(screen.getByRole("heading", { name: "Mock Alpha" })).toBeInTheDocument();
    expect(screen.getByText("Mock dataset")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });
});

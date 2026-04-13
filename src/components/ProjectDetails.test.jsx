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
          id: 1,
          name: "Apollo Migration",
          manager: "Alice",
          status: "In Progress",
          deadline: "2026-06-15",
          description: "Move the reporting stack to the new platform.",
          taskCount: 3,
        }}
      />
    );

    expect(screen.getByRole("heading", { name: "Apollo Migration" })).toBeInTheDocument();
    expect(screen.getByText("Live API project")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });
});

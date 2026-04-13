import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import EntityModal from "./EntityModal";

describe("EntityModal", () => {
  it("submits a new project payload", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(
      <EntityModal
        open
        entityType="project"
        mode="create"
        initialValues={null}
        projects={[]}
        isSaving={false}
        onClose={() => {}}
        onSubmit={onSubmit}
      />
    );

    await user.type(screen.getByLabelText("Project Name"), "Payments Hub");
    await user.type(screen.getByLabelText("Manager"), "Priya");
    await user.selectOptions(screen.getByLabelText("Status"), "In Progress");
    await user.type(screen.getByLabelText("Deadline"), "2026-08-10");
    await user.type(screen.getByLabelText("Description"), "Build the payments control plane.");
    await user.click(screen.getByRole("button", { name: "Create" }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Payments Hub",
      manager: "Priya",
      status: "In Progress",
      deadline: "2026-08-10",
      description: "Build the payments control plane.",
    });
  });
});

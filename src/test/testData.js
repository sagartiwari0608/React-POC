export const projectsFixture = [
  {
    id: 1,
    name: "Apollo Migration",
    manager: "Alice",
    status: "In Progress",
    deadline: "2026-06-15",
    description: "Move the reporting stack to the new platform.",
  },
  {
    id: 2,
    name: "Billing Revamp",
    manager: "Bob",
    status: "Completed",
    deadline: "2026-07-12",
    description: "Finish the billing system refresh.",
  },
];

export const tasksFixture = [
  {
    id: 101,
    title: "Discovery Workshop",
    projectId: 1,
    owner: "Research",
    status: "In Progress",
    dueDate: "2026-05-14",
    description: "Validate requirements with stakeholders.",
  },
  {
    id: 102,
    title: "Release Checklist",
    projectId: 2,
    owner: "QA",
    status: "Completed",
    dueDate: "2026-05-20",
    description: "Run the pre-release validation list.",
  },
];

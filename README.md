# React POC

This project is a small React single-page application built with Vite. It shows two main routed views:

- `Projects` view
- `Tasks` view

The app lets the user switch between two data sources without reloading the page:

- `Mock Data`
- `API Data`

Each source keeps its own UI state for search, pagination, and selected project so the screens do not mix together.

## App Flow

1. The app loads inside `BrowserRouter`.
2. `/` redirects to `/projects`.
3. The navbar lets the user switch routes between `Projects` and `Tasks`.
4. The source buttons let the user switch between mock data and API data.
5. The projects route supports searching, pagination, and detail selection.
6. The tasks route shows task cards derived from the active project source.

## Components

### Core App

- [App.jsx](D:\Work\GitHub Repos\React\React-POC\src\App.jsx)
  - Main application shell.
  - Owns the active source state (`mock` or `api`).
  - Owns per-source UI state for search text, current page, and selected project.
  - Normalizes mock and API responses into the same project shape.
  - Builds task data from projects.
  - Configures routing with `Routes`, `Route`, and `Navigate`.

- [main.jsx](D:\Work\GitHub Repos\React\React-POC\src\main.jsx)
  - React entry point.
  - Mounts the app with `createRoot`.
  - Wraps the app with `StrictMode`.
  - Wraps the app with `BrowserRouter`.

### Layout and Navigation

- [Navbar.jsx](D:\Work\GitHub Repos\React\React-POC\src\components\Navbar.jsx)
  - Top navigation bar.
  - Contains route links for `Projects` and `Tasks`.
  - Contains source toggle buttons for `Mock Data` and `API Data`.
  - Uses `NavLink` so active navigation is styled automatically.

### Route Screens

- [ProjectsScreen.jsx](D:\Work\GitHub Repos\React\React-POC\src\components\ProjectsScreen.jsx)
  - Route-level screen for the project dashboard.
  - Composes the search bar, project list, detail panel, and pagination.
  - Shows loading and error messages for API mode.

- [TasksScreen.jsx](D:\Work\GitHub Repos\React\React-POC\src\components\TasksScreen.jsx)
  - Route-level screen for task cards.
  - Shows summary cards for total, completed, and open tasks.
  - Renders tasks based on the currently selected source.
  - Shows empty, loading, and error states.

### Project UI Components

- [ProjectList.jsx](D:\Work\GitHub Repos\React\React-POC\src\components\ProjectList.jsx)
  - Displays a list of projects.
  - Renders `ProjectCard` for each project.
  - Shows an empty state when no projects are available.

- [ProjectCard.jsx](D:\Work\GitHub Repos\React\React-POC\src\components\ProjectCard.jsx)
  - Clickable card for one project.
  - Shows name, status, manager, and deadline.
  - Highlights the selected project.
  - Wrapped with `React.memo` to avoid unnecessary re-renders when props do not change.

- [ProjectDetails.jsx](D:\Work\GitHub Repos\React\React-POC\src\components\ProjectDetails.jsx)
  - Detail panel for the selected project.
  - Shows source label, name, description, manager, status, and deadline.
  - Shows an empty state when no project is selected.

- [Searchbar.jsx](D:\Work\GitHub Repos\React\React-POC\src\components\Searchbar.jsx)
  - Controlled input for filtering projects.

- [Pagination.jsx](D:\Work\GitHub Repos\React\React-POC\src\components\Pagination.jsx)
  - Reusable pagination controls.
  - Supports previous and next navigation.
  - Calculates total pages from `total` and `pageSize`.

## Hooks

- [useApi.js](D:\Work\GitHub Repos\React\React-POC\src\hooks\useApi.js)
  - Custom hook for API-driven project loading.
  - Uses `useEffect` to fetch data on mount.
  - Tracks `data`, `loading`, and `error`.

- [useProjects.js](D:\Work\GitHub Repos\React\React-POC\src\hooks\useProjects.js)
  - Custom hook that simulates async project loading from local mock data.
  - Uses `setTimeout` inside `useEffect`.

- [useDebounce.js](D:\Work\GitHub Repos\React\React-POC\src\hooks\useDebounce.js)
  - Custom hook that delays search updates.
  - Helps avoid filtering on every keystroke immediately.

## Data and API Utilities

- [mockData.js](D:\Work\GitHub Repos\React\React-POC\src\data\mockData.js)
  - Static mock project dataset.

- [apiClient.js](D:\Work\GitHub Repos\React\React-POC\src\api\apiClient.js)
  - API helper functions using both `fetch` and `axios`.
  - Includes examples for:
  - GET with `fetch`
  - GET with `axios`
  - POST
  - PUT
  - PATCH

## Tests

- [App.test.jsx](D:\Work\GitHub Repos\React\React-POC\src\App.test.jsx)
  - Tests route rendering and source-state isolation.

- [ProjectDetails.test.jsx](D:\Work\GitHub Repos\React\React-POC\src\components\ProjectDetails.test.jsx)
  - Tests selected and empty detail states.

- [TasksScreen.test.jsx](D:\Work\GitHub Repos\React\React-POC\src\components\TasksScreen.test.jsx)
  - Tests task rendering and empty state.

- [vitest.config.js](D:\Work\GitHub Repos\React\React-POC\vitest.config.js)
  - Vitest configuration for `jsdom` and global test setup.

- [setupTests.js](D:\Work\GitHub Repos\React\React-POC\src\test\setupTests.js)
  - Enables `jest-dom` matchers for Vitest.

## React Features Used In This Application

This section is split into:

- features actively used by the running app
- React-related patterns present in the repo but not currently wired into the running app

### Actively Used

- Functional components
  - Every screen and UI element is written as a function component.

- JSX
  - Used throughout the app for component rendering.

- Props
  - Components communicate through props such as `source`, `projects`, `project`, `page`, and handlers.

- Local state with `useState`
  - Used in `App.jsx`, `useApi.js`, `useProjects.js`, and `useDebounce.js`.
  - Used for source selection, per-view UI state, fetched data, loading flags, and debounced values.

- Side effects with `useEffect`
  - Used in `useApi.js`, `useProjects.js`, and `useDebounce.js`.
  - Handles API loading, mock async simulation, and debounce timers.

- Memoized derived data with `useMemo`
  - Used in `App.jsx`.
  - Memoizes normalized projects, derived tasks, filtered results, paginated results, and selected project lookup.

- Component memoization with `React.memo`
  - Used in `ProjectCard.jsx`.

- Controlled components
  - The search input in `Searchbar.jsx` is controlled by React state.

- Event handling
  - `onClick` for source buttons, project selection, and pagination.
  - `onChange` for search input.

- Conditional rendering
  - Loading states, error states, empty states, and selected detail states are rendered conditionally.

- List rendering
  - `map()` is used to render project cards and task cards.

- Keys in lists
  - Stable `key` props are used for list rendering.

- Custom hooks
  - `useApi`
  - `useProjects`
  - `useDebounce`

- Client-side routing with React Router
  - `BrowserRouter`
  - `Routes`
  - `Route`
  - `Navigate`
  - `NavLink`

- SPA behavior
  - Route changes happen without full-page reloads.

- Strict mode
  - The app is wrapped in `StrictMode` in `main.jsx`.

- Root API from React 18+
  - `createRoot` is used in `main.jsx`.

- Derived state pattern
  - Filtered projects, paginated projects, selected project, and task summaries are derived from source state and project data.

- State isolation per view
  - Mock and API modes maintain separate search, page, and selection state objects.

- Basic performance optimization
  - `useMemo` and `React.memo` reduce avoidable recalculation and re-rendering.

### React-Related Patterns Present In The Repo But Not Currently Wired Into The Running App

- Context API
  - [ProjectContext.js](D:\Work\GitHub Repos\React\React-POC\src\context\ProjectContext.js)
  - Includes `createContext`, `useContext`, and a provider component.
  - This is present in the repo but not mounted in `main.jsx` or used by the live app.

- Redux-style store setup
  - [store.js](D:\Work\GitHub Repos\React\React-POC\src\redux\store.js)
  - [projectSlice.js](D:\Work\GitHub Repos\React\React-POC\src\redux\projectSlice.js)
  - Includes `configureStore` and `createSlice`.
  - These files are present in the repo but are not connected to the running app right now.

## Test Stack

The automated tests use:

- `Vitest`
- `React Testing Library`
- `@testing-library/jest-dom`
- `@testing-library/user-event`
- `jsdom`

Run tests with:

```bash
npm test
```

## Run The App

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Current Limitations

- Tasks are derived from projects and are not fetched from a real task API.
- There is no create, edit, or delete flow for projects or tasks.
- Search is only available on the projects screen.
- Selected project is not reflected in the URL.
- State is not persisted across browser refresh.
- Context and Redux files exist but are not yet integrated into the app.

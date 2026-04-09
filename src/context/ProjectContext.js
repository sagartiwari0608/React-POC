import { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [globalProjects, setGlobalProjects] = useState([]);

  return (
    <ProjectContext.Provider value={{ globalProjects, setGlobalProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);

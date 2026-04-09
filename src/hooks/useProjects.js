import { useEffect, useState } from "react";
import { mockData } from "../data/mockData";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate API call
    const timer = setTimeout(() => {
      setProjects(mockData.projects);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { projects, loading };
};
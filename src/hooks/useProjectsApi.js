import { useCallback, useEffect, useState } from "react";
import {
  createProject as createProjectRequest,
  fetchProjects,
  updateProject as updateProjectRequest,
} from "../api/apiClient";

export const useProjectsApi = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (loadError) {
      setError(loadError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const createProject = async (payload) => {
    setSaving(true);
    setError(null);

    try {
      const createdProject = await createProjectRequest(payload);
      setProjects((currentProjects) => [createdProject, ...currentProjects]);
      return createdProject;
    } catch (saveError) {
      setError(saveError);
      throw saveError;
    } finally {
      setSaving(false);
    }
  };

  const updateProject = async (id, payload) => {
    setSaving(true);
    setError(null);

    try {
      const updatedProject = await updateProjectRequest(id, payload);
      setProjects((currentProjects) =>
        currentProjects.map((project) => (project.id === id ? updatedProject : project))
      );
      return updatedProject;
    } catch (saveError) {
      setError(saveError);
      throw saveError;
    } finally {
      setSaving(false);
    }
  };

  return {
    projects,
    loading,
    saving,
    error,
    createProject,
    updateProject,
    reloadProjects: loadProjects,
  };
};

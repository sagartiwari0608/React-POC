import { useCallback, useEffect, useState } from "react";
import {
  createTask as createTaskRequest,
  fetchTasks,
  patchTaskStatus as patchTaskStatusRequest,
  updateTask as updateTaskRequest,
} from "../api/apiClient";

export const useTasksApi = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (loadError) {
      setError(loadError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const createTask = async (payload) => {
    setSaving(true);
    setError(null);

    try {
      const createdTask = await createTaskRequest(payload);
      setTasks((currentTasks) => [createdTask, ...currentTasks]);
      return createdTask;
    } catch (saveError) {
      setError(saveError);
      throw saveError;
    } finally {
      setSaving(false);
    }
  };

  const updateTask = async (id, payload) => {
    setSaving(true);
    setError(null);

    try {
      const updatedTask = await updateTaskRequest(id, payload);
      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === id ? updatedTask : task))
      );
      return updatedTask;
    } catch (saveError) {
      setError(saveError);
      throw saveError;
    } finally {
      setSaving(false);
    }
  };

  const patchTaskStatus = async (id, status) => {
    setSaving(true);
    setError(null);

    try {
      const updatedTask = await patchTaskStatusRequest(id, status);
      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === id ? updatedTask : task))
      );
      return updatedTask;
    } catch (saveError) {
      setError(saveError);
      throw saveError;
    } finally {
      setSaving(false);
    }
  };

  return {
    tasks,
    loading,
    saving,
    error,
    createTask,
    updateTask,
    patchTaskStatus,
    reloadTasks: loadTasks,
  };
};

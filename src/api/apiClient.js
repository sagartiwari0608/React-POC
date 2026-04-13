import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api",
});

export const fetchProjects = async () => {
  const response = await apiClient.get("/projects");
  return response.data;
};

export const createProject = async (data) => {
  const response = await apiClient.post("/projects", data);
  return response.data;
};

export const updateProject = async (id, data) => {
  const response = await apiClient.put(`/projects/${id}`, data);
  return response.data;
};

export const fetchTasks = async () => {
  const response = await apiClient.get("/tasks");
  return response.data;
};

export const createTask = async (data) => {
  const response = await apiClient.post("/tasks", data);
  return response.data;
};

export const updateTask = async (id, data) => {
  const response = await apiClient.put(`/tasks/${id}`, data);
  return response.data;
};

export const patchTaskStatus = async (id, status) => {
  const response = await apiClient.patch(`/tasks/${id}/status`, { status });
  return response.data;
};

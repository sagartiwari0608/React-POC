import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

// FETCH
export const fetchProjects = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
};

// AXIOS
export const fetchProjectsAxios = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

// POST
export const createProject = async (data) => {
  return axios.post(BASE_URL, data);
};

// PUT
export const updateProject = async (id, data) => {
  return axios.put(`${BASE_URL}/${id}`, data);
};

// PATCH
export const patchProject = async (id, data) => {
  return axios.patch(`${BASE_URL}/${id}`, data);
};

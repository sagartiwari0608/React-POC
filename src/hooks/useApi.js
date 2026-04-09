import { useState, useEffect } from "react";
import { fetchProjectsAxios } from "../api/apiClient";

export const useApi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjectsAxios()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

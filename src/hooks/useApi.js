import { useState } from "react";

const useApi = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await fetch(...args);
    const data = await response.json();
    setLoading(false);

    if (data.error) return setError(true);

    setError(false);
    setData(data);
  };

  return { data, error, loading, request };
};

export default useApi;

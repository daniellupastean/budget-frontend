import { useState, useEffect } from "react";

const useFetch = (url, method = "GET", body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: method !== "GET" && method !== "HEAD" ? JSON.stringify(body) : null,
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [url, method, body]); // Added method and body to the dependency array

  return { data, loading, error };
};

export default useFetch;

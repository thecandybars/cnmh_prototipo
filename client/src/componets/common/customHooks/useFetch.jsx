import { useEffect, useState } from "react";

export default function useFetch(service) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true); // Used for forcing data load or reloading

  useEffect(() => {
    (async function () {
      try {
        if (load) {
          setLoading(true);
          const response = await service();
          setResponse(response);
          setLoad(false);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [load, service]);

  const renderLoading = loading && <div>Loading...</div>;

  return [response?.data, renderLoading, error, () => setLoad(true), response];
  // return [data, error, loading, () => setLoad(true)];
}

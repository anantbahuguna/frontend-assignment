import { useEffect, useState } from "react";

// In production, we would use some library like react-query which gives us features like caching, refetching, etc.
export default function useFetchData(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      return;
    }
    let ignore = false;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const newData = await response.json();
        if (!ignore) {
          setData(newData);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          console.error("Failed to fetch data: ", err);
          throw err;
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [url]);
  return { data, isLoading, error };
}

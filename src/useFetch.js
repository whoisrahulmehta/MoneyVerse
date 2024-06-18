import React, { useEffect, useState } from "react";

function useFetch(url, time) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = () => {
      fetch(url, { signal: abortController.signal })
        .then((res) => {
          if (!res.ok) {
            throw new Error("The source you want to fetch is not responding");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("Fetch is aborted");
          } else {
            setError(err.message); // Corrected error message spelling
            setIsPending(false);
          }
        });
    };

    const timer = setTimeout(fetchData, time);

    // Cleanup function to clear timeout and abort fetch
    return () => {
      clearTimeout(timer);
      abortController.abort();
    };
  }, [url, time]);

  return { data, isPending, error };
}

export default useFetch;

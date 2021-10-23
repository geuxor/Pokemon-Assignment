import { useState, useEffect } from 'react';

const useFetch = (currentPageUrl) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    console.log("Fetch: url", currentPageUrl);

    setTimeout(() => {
      fetch(currentPageUrl, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Fetch: data", data);
          setIsLoading(false);
          setData(data);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("Fetch: aborted");
          } else {
            setIsLoading(false);
            setError(err.message);
          }
        });
    }, 1);

    return () => abortCont.abort();
  }, [currentPageUrl]);

  return { data, isLoading, error };
};
 
export default useFetch;
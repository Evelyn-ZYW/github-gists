import { useState, useEffect } from "react";

export default function useInfiniteScroll(pageNumber) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setIsFetching(true);
    setError(false);

    const abortController = new AbortController();
    const requestGists = async () => {
      const res = await fetch(
        `https://api.github.com/gists?per_page=30&page=${pageNumber}`,
        {
          signal: abortController.signal,
        }
      );

      if (res.status !== 200) {
        throw new Error(setError("😵 It seems like a network error."));
      }

      const data = await res.json();
      setItems((prevItems) => [...new Set([...prevItems, ...data])]);
      setIsFetching(false);
    };

    requestGists().catch((err) => {
      setIsFetching(false);
      setError(`🧐 Some error just happened. ${err.message}`);
    });

    return () => abortController.abort();
  }, [pageNumber]);

  return { isFetching, error, items };
}

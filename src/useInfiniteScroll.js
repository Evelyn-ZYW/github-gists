import { useState, useEffect } from "react";

export default function useInfiniteScroll(pageNumber) {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setIsFetching(true);
    setError(false);

    requestGists()
        .catch((err) => {
            setIsFetching(false);
            setError(`🧐 Some error just happened. ${err.message}.`);
    });
  }, [pageNumber]);

  const requestGists = async () => {
    const res = await fetch(
      `https://api.github.com/gists?per_page=30&page=${pageNumber}`
    );

    if (res.status !== 200) {
      throw new Error(setError("😵 It seems like a network error."));
    }

    const data = await res.json();
    setItems((prevItems) => [...prevItems, ...data]);
    setIsFetching(false);
  };

  return { isFetching, error, items };
}

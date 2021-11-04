import { useState, useEffect } from "react";

export default function useInfiniteScroll(pageNumber) {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    setError(false);

    requestGists().catch((err) => {
      setIsFetching(false);
      setError(`🧐 Please check the api. ${err.message}.`);
    });
  }, []);

  const requestGists = async () => {
    const res = await fetch(`https://api.github.com/gists?page=${pageNumber}`);

    //custom error message when there is a network error
    if (res.status !== 200) {
      throw new Error(setError("😵 It seems like a network error."));
    }

    const data = await res.json();
    console.log(data);
    setItems((previousItems) => [...previousItems, ...data]);
    setHasMore(data.length > 0);
    setIsFetching(false);
  };

  return { isFetching, error, items, hasMore };
}

import React, { useState, useEffect } from "react";
import useInfiniteScroll from "./useInfiniteScroll";
import "./styles.scss";

export default function App() {
  //storing the returned data into items state
  const [pageNumber, setPageNumber] = useState(1);
  //   const [isFetching, setIsFetching] = useInfiniteScroll(moreGists);

  const { isFetching, error, items, hasMore } = useInfiniteScroll(pageNumber);

  return (
    <div className="App">
      {items.map((item) => (
        <div className="line" key={item.id}>
          <img src={item.owner.avatar_url} alt="" />
          <p>{Object.keys(item.files)}</p>
        </div>
      ))}
      {isFetching && <div>Loading...</div>}
      {error && <div>{error}</div>}
    </div>
  );
}

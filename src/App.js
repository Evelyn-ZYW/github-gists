import React, { useState, useRef, useCallback } from "react";
import useInfiniteScroll from "./useInfiniteScroll";
import useObserver from "./useObserver";
import "./styles.scss";

export default function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const { isFetching, error, items } = useInfiniteScroll(pageNumber);
  const { lastItemRef } = useObserver(pageNumber, setPageNumber);

  return (
    <div className="App">
      {items.map((item, index) => (
        <div
          className="single_line"
          key={item.node_id}
          ref={items.length === index + 1 ? lastItemRef : null}
        >
          <img src={item.owner.avatar_url} alt="" />
          <p>{Object.keys(item.files)[0]}</p>
        </div>
      ))}
      {isFetching && <div>Loading...</div>}
      {error && <div>{error}</div>}
    </div>
  );
}

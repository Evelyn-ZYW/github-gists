import React, { useState, useRef, useCallback } from "react";
import useInfiniteScroll from "./useInfiniteScroll";
import "./styles.scss";

export default function App() {
  const [pageNumber, setPageNumber] = useState(1);

  const { isFetching, error, items } = useInfiniteScroll(pageNumber);

  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log(items.length);
          if (pageNumber < 2 && items.length < 60) {
            setPageNumber((pageNum) => pageNum + 1);
          } else {
            // console.log(items.length);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, pageNumber]
  );

  return (
    <div className="App">
      {items.map((item, index) => (
        <div
          className="line"
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

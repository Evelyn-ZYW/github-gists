import React, { useState } from "react";
import useFetch from "./useFetch";
import useInifiniteScroll from "./useInifiniteScroll";
import "./styles.scss";

export default function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const { isFetching, error, items } = useFetch(pageNumber);
  const { lastItemRef } = useInifiniteScroll(pageNumber, setPageNumber);

  return (
    <div className="App">
      {items.map((item, index) => (
        <div
          className="single_line"
          key={item.node_id}
          ref={index === items.length - 1 ? lastItemRef : null}
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

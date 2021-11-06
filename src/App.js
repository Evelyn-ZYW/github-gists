import React, { useState } from "react";
import useFetch from "./useFetch";
import useInifiniteScroll from "./useInifiniteScroll";
import Modal from "./Modal";
import "./styles.scss";

export default function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const { isFetching, error, items } = useFetch(pageNumber);
  const { lastItemRef } = useInifiniteScroll(pageNumber, setPageNumber);
  const [showModal, setShowModal] = useState(false);
  const [onItem, setOnItem] = useState();

  const toggleModal = (index) => {
    setShowModal(true);
    setOnItem(items[index]);

    setTimeout(() => {
      setShowModal(false);
    }, 1000);
  };

  return (
    <div className="App">
      {items.map((item, index) => (
        <div
          className="single-line"
          key={item.node_id}
          ref={index === items.length - 1 ? lastItemRef : null}
          onClick={() => toggleModal(index)}
        >
          <img src={item.owner.avatar_url} alt="" />
          <p>{Object.keys(item.files)[0]}</p>
        </div>
      ))}
      {isFetching && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {showModal ? (
        <Modal>
          <img
            src={onItem.owner.avatar_url}
            alt=""
          />
        </Modal>
      ) : null}
    </div>
  );
}

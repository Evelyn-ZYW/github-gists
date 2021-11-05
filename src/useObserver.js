import { useRef, useCallback } from "react";
import useInfiniteScroll from "./useInfiniteScroll";

export default function Observer(pageNumber, setPageNumber) {
  const { isFetching, items } = useInfiniteScroll(pageNumber);

  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && pageNumber < 2) {
          setPageNumber((pageNum) => pageNum + 1);
          console.log(items.length);
        } else {
          console.log(items.length);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, pageNumber]
  );

  return { lastItemRef };
}

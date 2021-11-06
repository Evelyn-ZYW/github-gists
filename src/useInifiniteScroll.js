import { useRef, useCallback, useEffect } from "react";
import useFetch from "./useFetch";

export default function useInfiniteScroll(pageNumber, setPageNumber) {
  const { isFetching } = useFetch();

  const reference = useRef(null);
  const lastItemRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (reference.current !== null) reference.current.disconnect();
      reference.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && pageNumber < 2) {
          setPageNumber((pageNum) => pageNum + 1);
        }
      });
      if (node) reference.current.observe(node);
    },
    [isFetching, pageNumber]
  );

  return { lastItemRef };
}

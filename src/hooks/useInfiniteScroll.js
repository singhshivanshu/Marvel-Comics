import { useCallback, useEffect, useRef, useState } from "react";

const useInfiniteScroll = ({ currentPage = 1 }) => {
  const ref = useRef();
  const [page, setPage] = useState(currentPage);

  const handleScroll = useCallback(
    (e) => {
      if (
        e.target.scrollWidth - e.target.scrollLeft - e.target.clientWidth <
        200
      ) {
        setPage(currentPage + 1);
      }
    },
    [currentPage]
  );

  useEffect(() => {
    let targetElement;
    console.log("Effect");
    if (ref && ref.current) {
      targetElement = ref.current;
      targetElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (targetElement) {
        targetElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [ref, handleScroll]);

  return [ref, page];
};

export default useInfiniteScroll;

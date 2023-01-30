import { useEffect, useRef, useState } from "react";

const useInfiniteScroll = ({ currentPage = 1 }) => {
  const ref = useRef();
  const [page, setPage] = useState(currentPage);

  const handleScroll = (e) => {
    if (
      e.target.scrollWidth - e.target.scrollLeft - e.target.clientWidth <
      200
    ) {
      setPage(currentPage + 1);
    }
  };

  useEffect(() => {
    let targetElement;
    if (ref && ref.current) {
      targetElement = ref.current;
      targetElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (targetElement) {
        targetElement.removeEventListener("scroll", handleScroll);
      }
    };
  });

  return [ref, page];
};

export default useInfiniteScroll;

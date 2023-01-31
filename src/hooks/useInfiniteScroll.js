import { useEffect, useRef, useState } from "react";

const useInfiniteScroll = () => {
  const ref = useRef();
  const [page, setPage] = useState(1);

  const handleScroll = (e) => {
    if (
      e.target.scrollWidth - e.target.scrollLeft - e.target.clientWidth === 0
    ) {
      setPage((prev) => {
        return prev + 1;
      });
    }
  };

  useEffect(() => {
    let targetElement;
    if (ref && ref.current) {
      targetElement = ref.current;
      targetElement.addEventListener("scroll", function (e) {
        handleScroll(e);
      });
    }
  }, [ref.current]);

  return { ref, page };
};

export default useInfiniteScroll;

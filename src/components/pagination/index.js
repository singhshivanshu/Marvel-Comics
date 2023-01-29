import React from "react";
import { usePagination, DOTS } from "../../hooks/usePagination";
import styles from "./pagination.module.scss";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 2,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange && paginationRange[paginationRange.length - 1];
  return (
    <ul className={`${styles.paginationContainer} ${className}`}>
      <li
        className={`${styles.paginationItem} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        onClick={onPrevious}
      >
        <div className={`${styles.arrow} ${styles.left}`} />
      </li>
      {paginationRange &&
        paginationRange.map((pageNumber, i) => {
          if (pageNumber === DOTS) {
            return (
              <li
                key={pageNumber + i}
                className={`${styles.paginationItem} ${styles.dots}`}
              >
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={pageNumber + i}
              className={`${styles.paginationItem} ${
                pageNumber === currentPage ? styles.selected : ""
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
      <li
        className={`${styles.paginationItem} ${
          currentPage === lastPage ? styles.disabled : ""
        }`}
        onClick={onNext}
      >
        <div className={`${styles.arrow} ${styles.right}`} />
      </li>
    </ul>
  );
};

export default Pagination;

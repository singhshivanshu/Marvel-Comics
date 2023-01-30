import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { QueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import useKeyToMD5 from "../../hooks/useKeyToMD5";
import Header from "../../components/header";
import ComicCard from "../../components/comic-card";
import Pagination from "../../components/pagination";
import fetchComics from "../../actions/fetchComics";
import styles from "./search-page.module.scss";
import CollectionLoader from "../../components/loader/collection-loader";
import ErrorMessage from "../../components/error-handle";

const Search = () => {
  const [timeStamp, hash, publicKey] = useKeyToMD5();
  const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 20;
  const queryClient = new QueryClient();
  const location = useLocation();

  const parsedQuery = useMemo(
    () => queryString.parse(location.search),
    [location]
  );

  const { isLoading, data, error } = useQuery({
    queryKey: ["search", currentPage, parsedQuery.keywords],
    queryFn: () =>
      fetchComics(
        pageLimit,
        currentPage,
        timeStamp,
        hash,
        publicKey,
        "",
        parsedQuery.keywords
      ),
  });

  useEffect(() => {
    if (parsedQuery.keywords) {
      queryClient.prefetchQuery({
        queryKey: ["search", currentPage, parsedQuery.keywords],
        queryFn: () =>
          fetchComics(
            pageLimit,
            currentPage,
            timeStamp,
            hash,
            publicKey,
            "",
            parsedQuery.keywords
          ),
      });
    }
  }, [currentPage, parsedQuery.keywords, hash, queryClient]);

  if (error)
    return (
      <div className="myComponent">
        <Header />
        <div className={styles.container}>
            <ErrorMessage />
        </div>
      </div>
    );

  return (
    <div className="myComponent">
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h2 className={styles.searchHeading}>
            Search - <span>"{parsedQuery.keywords}"</span>{" "}
          </h2>
          <div className={styles.collectionContainer}>
            {isLoading && <CollectionLoader />}
            {data &&
              data.data &&
              data.data.results.map((card) => {
                return (
                  <ComicCard
                    key={card.id}
                    imgSrc={card.thumbnail.path + "/portrait_incredible.jpg"}
                    title={card.title}
                  />
                );
              })}
          </div>
          {!isLoading && (
            <Pagination
              currentPage={currentPage}
              totalCount={data && data.data && data.data.total}
              pageSize={pageLimit}
              onPageChange={(page) => setCurrentPage(page)}
              className={styles.paginationBar}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;

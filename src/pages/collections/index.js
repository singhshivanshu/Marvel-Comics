import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { QueryClient } from "react-query";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import useKeyToMD5 from "../../hooks/useKeyToMD5";
import Header from "../../components/header";
import ComicCard from "../../components/comic-card";
import Pagination from "../../components/pagination";
import fetchComics from "../../actions/fetchComics";
import styles from "./collections.module.scss";
import CharacterCarousel from "../../components/character-carousel";
import CollectionLoader from "../../components/loader/collection-loader";
import ErrorMessage from "../../components/error-handle";

const Collection = () => {
  const [timeStamp, hash, publicKey] = useKeyToMD5();
  const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 20;
  const queryClient = new QueryClient();
  const location = useLocation();
  const navigate = useNavigate();

  const parsedQuery = useMemo(
    () => queryString.parse(location.search),
    [location]
  );

  let filtersArray =
    (parsedQuery.characters &&
      parsedQuery.characters.length > 0 &&
      parsedQuery.characters.split("-")) ||
    [];
  const characterIds = filtersArray.length > 0 && filtersArray.join(",");

  const { isLoading, data, error, isPreviousData } = useQuery({
    queryKey: ["comics", currentPage, characterIds],
    queryFn: () =>
      fetchComics(
        pageLimit,
        currentPage,
        timeStamp,
        hash,
        publicKey,
        characterIds
      ),
  });

  useEffect(() => {
    if (!isPreviousData) {
      queryClient.prefetchQuery({
        queryKey: ["comics", currentPage],
        queryFn: () =>
          fetchComics(
            pageLimit,
            currentPage,
            timeStamp,
            hash,
            publicKey,
            characterIds
          ),
      });
    }
  }, [currentPage, characterIds]);

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
        <CharacterCarousel
          timeStamp={timeStamp}
          hash={hash}
          publicKey={publicKey}
        />
        <div className={styles.container}>
          {filtersArray && filtersArray.length > 0 && (
            <button
              className={styles.clearFilterBtn}
              onClick={() => navigate("/")}
            >
              Clear Filters: ({filtersArray.length})
            </button>
          )}
          <div className={styles.collectionContainer}>
            {isLoading &&  <CollectionLoader />}
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

export default Collection;

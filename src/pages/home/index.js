import React, { useEffect, useState } from "react";
import { useQuery,QueryClient  } from "@tanstack/react-query";
import useKeyToMD5 from "../../hooks/useKeyToMD5";
import Header from "../../components/header";
import ComicCard from "../../components/comic-card";
import Pagination from "../../components/pagination";
import fetchComics from "../../actions/fetchComics";
import styles from "./home-page.module.scss";
import CharacterCarousel from "../../components/character-carousel";
import CollectionLoader from "../../components/loader/collection-loader";
import ErrorMessage from "../../components/error-handle";

const Home = () => {
  const [timeStamp, hash, publicKey] = useKeyToMD5();
  const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 20;
  const queryClient = new QueryClient();

  const { isLoading, data, error, isPreviousData } = useQuery({
    queryKey: ["comics", currentPage],
    queryFn: () =>
      fetchComics(pageLimit, currentPage, timeStamp, hash, publicKey),
  });

  useEffect(() => {
    if (!isPreviousData) {
      queryClient.prefetchQuery({
        queryKey: ["comics", currentPage],
        queryFn: () =>
          fetchComics(pageLimit, currentPage, timeStamp, hash, publicKey),
      });
    }
  }, [currentPage]);

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

export default Home;

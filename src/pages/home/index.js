import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useKeyToMD5 from "../../hooks/useKeyToMD5";
import Header from "../../components/header";
import styles from "./homePage.module.scss";
import ComicCard from "../../components/comicCard";
import Pagination from "../../components/pagination";
import { QueryClient } from "react-query";

const Home = () => {
  const [timeStamp, hash, publicKey] = useKeyToMD5();
  const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 20;
  const queryClient = new QueryClient();

  const { isLoading, data, error, isPreviousData } = useQuery({
    queryKey: ["comics", currentPage],
    queryFn: () =>
      axios
        .get(
          `https://gateway.marvel.com:443/v1/public/comics?limit=${pageLimit}&offset=${
            (currentPage - 1) * 20
          }&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
        )
        .then((res) => res.data)
        .catch((error) => console.log(error)),
  });

  useEffect(() => {
    if (!isPreviousData) {
      queryClient.prefetchQuery({
        queryKey: ["comics", currentPage],
        queryFn: () =>
          axios
            .get(
              `https://gateway.marvel.com:443/v1/public/comics?limit=${pageLimit}&offset=${
                (currentPage - 1) * 20
              }&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
            )
            .then((res) => res.data)
            .catch((error) => console.log(error)),
      });
    }
  }, [data, isPreviousData, currentPage, queryClient]);

  console.log(data);
  console.log(isLoading);
  return (
    <div style={{ background: "rgb(71 70 70)" }}>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.collectionContainer}>
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

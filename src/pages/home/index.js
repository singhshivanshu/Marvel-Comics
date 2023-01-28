import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useKeyToMD5 from "../../hooks/useKeyToMD5";
import Header from "../../components/header";
import styles from "./homePage.module.css";
import ComicCard from "../../components/comicCard";

const Home = () => {
  const [timeStamp, hash, publicKey] = useKeyToMD5();

  const { isLoading, data, error } = useQuery({
    queryKey: ["comics"],
    queryFn: () =>
      axios
        .get(
          `https://gateway.marvel.com:443/v1/public/comics?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
        )
        .then((res) => res.data)
        .catch((error) => console.log(error)),
  });
  console.log(data);
  console.log(isLoading);
  return (
    <div style={{background: "rgb(71 70 70)"}}>
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
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useMemo } from "react";
import { QueryClient, useQuery } from "@tanstack/react-query";
import styles from "./carousel.module.scss";
import fetchCharacters from "../../actions/fetchCharacter";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const CharacterCarousel = ({ timeStamp, hash, publicKey }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  const [ref, page] = useInfiniteScroll(1);
  const limit = 20;

  const { isLoading, data, error, isPreviousData } = useQuery({
    queryKey: ["characters", page],
    queryFn: () => fetchCharacters(limit, timeStamp, hash, publicKey, page),
  });

  const parsedQuery = useMemo(
    () => queryString.parse(location.search),
    [location]
  );

  let filtersArray =
    (parsedQuery.characters &&
      parsedQuery.characters.length > 0 &&
      parsedQuery.characters.split("-")) ||
    [];

  const handleSelectFilter = (item) => {
    const isItemInArray = filtersArray.includes(item);
    if (isItemInArray) {
      filtersArray = filtersArray.filter((ele) => ele !== item);
    } else {
      filtersArray.push(item);
    }
    if (location) {
      if (filtersArray.length > 0) {
        const ids = filtersArray.join("-");
        navigate(`/collection?characters=${ids}`);
      } else navigate("/");
    }
  };
  console.log(data);
  console.log(page);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container} ref={ref}>
        <ul className={styles.characterList}>
          {data &&
            data.data &&
            data.data.results.map((char, i) => {
              return (
                <li
                  key={char.id + i}
                  className={styles.character}
                  onClick={() => handleSelectFilter(char.id + "")}
                >
                  <input
                    type="checkbox"
                    value={char.id}
                    checked={!!filtersArray.includes(char.id + "")}
                    onChange={() => handleSelectFilter(char.id + "")}
                  />
                  <span className={styles.imgContainer}>
                    <img
                      className={`${styles.img} ${
                        !!filtersArray.includes(char.id + "")
                          ? styles.imgChecked
                          : ""
                      }`}
                      src={char.thumbnail.path + "/portrait_medium.jpg"}
                      alt=""
                    />
                    <span
                      className={`
                        ${
                          !!filtersArray.includes(char.id + "")
                            ? styles.checkMark
                            : ""
                        }`}
                    ></span>
                  </span>
                  <label className={styles.name}>{char.name}</label>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default CharacterCarousel;

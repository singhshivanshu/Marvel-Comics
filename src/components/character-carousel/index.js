import React, { useEffect, useMemo, useState } from "react";
import { QueryClient, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import styles from "./carousel.module.scss";
import fetchCharacters from "../../actions/fetchCharacter";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useInView } from "react-intersection-observer";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import CharacterLoader from "../loader/character-loader";
import axios from "axios";

const CharacterCarousel = ({ timeStamp, hash, publicKey }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  const [ref, page] = useInfiniteScroll(1);
  const [pg, setPg] = useState(1)
  const limit = 20;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCharacters = async (
    pageLimit,
    timeStamp,
    hash,
    publicKey,
    offset = 0
  ) => {
    setIsLoading(true);
    await axios
      .get(
        `https://gateway.marvel.com:443/v1/public/characters?orderBy=name&limit=${pageLimit}&offset=${
          offset * 20
        }&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
      )
      .then((res) => {
        console.log(res);
        setData([...data, ...res.data.data.results]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchCharacters(limit, timeStamp, hash, publicKey, page);
  }, [page]);

  // const { isLoading, data, error, isPreviousData } = useQuery({
  //   queryKey: ["characters"],
  //   queryFn: () => fetchCharacters(limit, timeStamp, hash, publicKey),
  // });

  // useEffect(() => {
  //   if (!isPreviousData) {
  //     queryClient.prefetchQuery({
  //       queryKey: ["comics", page],
  //       queryFn: () => fetchCharacters(limit, timeStamp, hash, publicKey, page),
  //     });
  //   }
  // }, [page]);

  // const {
  //   status,
  //   isLoading,
  //   data,
  //   error,
  //   isFetching,
  //   isFetchingNextPage,
  //   isFetchingPreviousPage,
  //   fetchNextPage,
  //   fetchPreviousPage,
  //   hasNextPage,
  //   hasPreviousPage,
  // } = useInfiniteQuery(
  //   ["projects"],
  //   async ({ pageParam = 1 }) => {
  //     console.log(pageParam);
  //     return await fetchCharacters(
  //       limit,
  //       timeStamp,
  //       hash,
  //       publicKey,
  //       pageParam
  //     );
  //   },
  //   {
  //     getNextPageParam: (lastPage) => {
  //       console.log(lastPage);
  //       return lastPage;
  //     },
  //   }
  // );

  // useEffect(() => {
  //   if (inView) {
  //     console.log("Page changed:");
  //     fetchNextPage();
  //   }
  // }, [inView]);

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

  // console.log(data);
  // console.log(page);

  const onScrollHandler = (e) => {
    if (
      e.target.scrollWidth - e.target.scrollLeft - e.target.clientWidth === 0
    ) {
      setPg(pg + 1)
    }
  }

  console.log(pg);

  if (isLoading && data.length === 0) return <CharacterLoader />;
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ul className={styles.characterList} ref={ref}>
          {data && data.length > 0 &&
            data.map((char, i) => {
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

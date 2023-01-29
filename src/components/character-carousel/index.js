import React from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./carousel.module.scss";
import fetchCharacters from "../../actions/fetchCharacter";
import useKeyToMD5 from "../../hooks/useKeyToMD5";

const CharacterCarousel = () => {
  const [timeStamp, hash, publicKey] = useKeyToMD5();
  const { isLoading, data, error } = useQuery({
    queryKey: ["characters"],
    queryFn: () => fetchCharacters(20, timeStamp, hash, publicKey),
  });

  return (
    <div>
      <div>
        
      </div>
    </div>
  );
};

export default CharacterCarousel;

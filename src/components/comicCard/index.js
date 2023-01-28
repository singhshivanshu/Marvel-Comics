import React from "react";
import styles from "./comicCard.module.scss";

const ComicCard = ({ title, imgSrc }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img className={styles.image} src={imgSrc} alt={title} />
      </div>
      <div className={styles.titleContainer}>
        <span>{title}</span>
      </div>
    </div>
  );
};
export default ComicCard;

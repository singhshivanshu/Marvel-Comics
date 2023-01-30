import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import styles from "./loader.module.scss";

const CharacterLoader = () => {
  return (
    <div>
      <SkeletonTheme baseColor="#787777" highlightColor="#fff">
        <div className={styles.characterLoaderContainer}>
          <Skeleton duration={2} height={100} />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default CharacterLoader;

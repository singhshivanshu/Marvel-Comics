import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import styles from "./loader.module.scss";

const CollectionLoader = () => {
  const arr = Array.apply(null, Array(10)).map(function (x, i) {
    return i;
  });
  return (
    <div>
      <SkeletonTheme baseColor="#787777" highlightColor="#fff">
        <div className={styles.collectionLoaderContainer}>
          {arr.map((_, i) => {
            return <Skeleton className={styles.cardLoader} key={i} duration={2} height={351} />;
          })}
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default CollectionLoader;

import KeyToMD5 from "../../hooks/useKeyToMD5";

const Collection = () => {
  const [timeStamp, hash] = KeyToMD5();
  console.log(timeStamp);
  console.log(hash);

  return (
    <div>
      <h1>Collections</h1>
    </div>
  );
};

export default Collection;

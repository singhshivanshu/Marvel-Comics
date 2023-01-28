import md5 from "md5";

const useKeyToMD5 = () => {
  const timeStamp = new Date();
  const uniqueTimeStamp = timeStamp.toISOString();
  const publicKey = "7a14de2f55194ae328e43195789a7842";
  const privateKey = "3310a7ab721161cf651e4a89429fab96f9fb129c";
  const hash = md5(uniqueTimeStamp + privateKey + publicKey);
  return [uniqueTimeStamp, hash, publicKey];
};

export default useKeyToMD5;

import axios from "axios";
import { useState } from "react";
import useKeyToMD5 from "../hooks/useKeyToMD5";

async function useHomePageDataLoader() {
  const [data, setData] = useState();
  const [timeStamp, hash, publicKey] = useKeyToMD5();
  axios
    .get(
      `https://gateway.marvel.com:443/v1/public/comics?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
    )
    .then((res) => setData(res.data))
    .catch((error) => console.log(error));

    return data
}

export default useHomePageDataLoader;

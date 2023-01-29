import axios from "axios";

const fetchComics = async (
  pageLimit,
  currentPage,
  timeStamp,
  hash,
  publicKey,
  characters = "",
  searchQuery = ""
) => {
  if (characters)
    return await axios
      .get(
        `https://gateway.marvel.com:443/v1/public/comics?characters=${characters}&limit=${pageLimit}&offset=${
          (currentPage - 1) * 20
        }&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
      )
      .then((res) => res.data)
      .catch((error) => console.log(error));
  else if (searchQuery)
    return await axios
      .get(
        `https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=${searchQuery}&limit=${pageLimit}&offset=${
          (currentPage - 1) * 20
        }&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
      )
      .then((res) => res.data)
      .catch((error) => console.log(error));
  else if (searchQuery && characters)
    return await axios
      .get(
        `https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=${searchQuery}&characters=${characters}&limit=${pageLimit}&offset=${
          (currentPage - 1) * 20
        }&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
      )
      .then((res) => res.data)
      .catch((error) => console.log(error));
  else
    return await axios
      .get(
        `https://gateway.marvel.com:443/v1/public/comics?limit=${pageLimit}&offset=${
          (currentPage - 1) * 20
        }&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
      )
      .then((res) => res.data)
      .catch((error) => console.log(error));
};

export default fetchComics;

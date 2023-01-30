import axios from "axios";

const fetchCharacters = async (pageLimit, timeStamp, hash, publicKey, offset=0) => {
    return await axios
    .get(
      `https://gateway.marvel.com:443/v1/public/characters?orderBy=name&limit=${pageLimit}&offset=${offset*20}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
    )
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

export default fetchCharacters;
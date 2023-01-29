import axios from "axios";

const fetchCharacters = async (pageLimit, timeStamp, hash, publicKey) => {
    return await axios
    .get(
      `https://gateway.marvel.com:443/v1/public/characters?orderBy=name&limit=${pageLimit}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
    )
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

export default fetchCharacters;
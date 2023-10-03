import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "bbd611fd77048d4fc541004a1f3ee850",
    language: "ko-KR",
  },
});

export default instance;

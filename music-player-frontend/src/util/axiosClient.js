import axios from "axios";
import { AXIOS_CLIENT } from "../constants/constants";
const apiURL = "https://music-player-backend-6nnw.onrender.com";
const axiosClient = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": AXIOS_CLIENT.CONTENT_TYPE,
  },
});
export default axiosClient;

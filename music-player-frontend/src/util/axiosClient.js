import axios from "axios";
import { AXIOS_CLIENT } from "../constants/constants";
const apiURL = "http://localhost:3000";
const axiosClient = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": AXIOS_CLIENT.CONTENT_TYPE,
  },
});
export default axiosClient;

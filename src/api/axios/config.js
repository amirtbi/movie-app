import axios from "axios";
const axiosClient = axios.create();

axiosClient.defaults.baseURL = "https://api.themoviedb.org/3";

export default axiosClient;

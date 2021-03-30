import axios from "axios";

const api = axios.create({
  baseURL: "https://elearning0706.cybersoft.edu.vn/api/",
});

export default api;

export const groupId = "GP16";
export const apiString = "https://elearning0706.cybersoft.edu.vn";

import axios from "axios";

const perks = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default perks;

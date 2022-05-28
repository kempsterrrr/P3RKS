import axios from "axios";

const perks = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND,
});

export default perks;

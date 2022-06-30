import axios from "axios";

const airtable = axios.create({
  baseURL: "https://api.airtable.com/v0/app9RFFTGwB7lUyRX",
});

airtable.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${process.env.AIRTABLE_API_KEY}`;

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default airtable;

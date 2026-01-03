import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const getAllMovies = () => API.get("/movies");
export const searchMovies = (query) =>
  API.get(`/movies/search?q=${query}`);
export const sortMovies = (by, order) =>
  API.get(`/movies/sort?by=${by}&order=${order}`);

export default API;

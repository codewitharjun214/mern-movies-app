import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-movies-app-x7wa.onrender.com/api"

});

export const getAllMovies = () => API.get("/movies");
export const searchMovies = (query) =>
  API.get(`/movies/search?q=${query}`);
export const sortMovies = (by, order) =>
  API.get(`/movies/sort?by=${by}&order=${order}`);

export default API;

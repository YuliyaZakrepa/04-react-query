import type { Movie } from "../types/movie";
import axios from "axios";

const token = import.meta.env.VITE_TMDB_TOKEN;


export async function fetchMovies(query: string, page: number): Promise<{results: Movie[],
  total_pages: number}> {
  const { data } = await axios.get<{results: Movie[];
  total_pages: number}>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: { query: query, page},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
 console.log(data);
 
  return data;
}

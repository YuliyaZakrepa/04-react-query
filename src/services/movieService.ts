import type { Movie } from "../types/movie";
import axios from "axios";

const token = import.meta.env.VITE_TMDB_TOKEN;
interface FetchMoviesProps{
  results: Movie[];
  total_pages: number
}

export async function fetchMovies(query: string, page: number): Promise<FetchMoviesProps> {
  const { data } = await axios.get<FetchMoviesProps>(
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

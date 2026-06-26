import type { Movie } from "../types/movie";
import axios from "axios";
const token = import.meta.env.VITE_TMDB_TOKEN;
interface fetchMoviesProps {
  query: string;
}

export async function fetchMovies({
  query,
}: fetchMoviesProps): Promise<Movie[]> {
  const { data } = await axios.get<{ results: Movie[] }>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: { query: query },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data.results;
}

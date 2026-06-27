import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { keepPreviousData } from "@tanstack/react-query";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import toast from "react-hot-toast";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";
type ModuleWithDefault<T> = { default: T };
const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;


export default function App() {
 
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const[query, setQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
   

const {data, isError, isFetching, isSuccess} = useQuery({
   queryKey:['movies',query, currentPage],
   queryFn:() => fetchMovies(query, currentPage),
   enabled:  query.trim() !== "",
  placeholderData: keepPreviousData,
})
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
    
  };
 const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie);
    
  };
  const handleCloseModal = () => {
    setSelectedMovie(null);
  };
  const totalPages = data?.total_pages || 0;
  const movies= data?.results ||[];

   useEffect(()=>{
    if(isSuccess && movies.length===0 && !isFetching)
      { toast.error("No movies found for your request.");}},[isSuccess, movies, isFetching]);

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {isSuccess && totalPages > 1 && (<ReactPaginate 
      pageCount={totalPages} 
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}     
          forcePage={currentPage - 1}  
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"  />)}
      {isFetching && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && movies.length > 0 && (
        <MovieGrid onSelect={handleOpenModal} movies={movies} />
      )}
      
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}

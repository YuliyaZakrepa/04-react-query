import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";
interface SearchBarProps {
  onSubmit: (query: string) => void;
}
export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    const query = (formData.get("query") as string).trim();
    if (query === "") {
      toast.error("Please enter your search query.");
      return;
    }
    onSubmit(query);
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={css.form} action={handleSubmit}>
          <Toaster />
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

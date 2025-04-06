import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Hero from '../components/Hero'
import SearchSuggestion from "./SearchSuggestion";
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('')

  const [movieTitle,setMovieTitle] = useState([])
  const [filteredSearch,setFilteredSearch] = useState([])
  const [showSearchSuggestion,setShowSearchSuggestion] = useState(false)

  const API_KEY = "5c586c1a17d4aff0f81aad484a29faea";
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMovies(data.results);
        setMovieTitle(data.results.map(item => item.title))
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, []);

 const handleSearchChange = (e) => {
    setQuery(e.target.value)
    const inputValue = e.target.value.toLowerCase()
    setFilteredSearch(movieTitle.filter(title => title.toLowerCase().startsWith(inputValue)))
    setShowSearchSuggestion(true)
 }

 const handleClick = (e) => {
   setQuery(e.target.innerText)
   setShowSearchSuggestion(false)
   
 }


 const searchMovies = async() => {
    if(query){
      const searchedMovied = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)
      const data = await searchedMovied.json()
      setMovies(data.results)
    }
 }
  return (
    <>
      <Hero />
      <div className="relative">
        <div className=" max-w-4xl flex items-center justify-between m-auto mb-7 mt-9 px-2.5">
          <input onChange={handleSearchChange}
            className="bg-transparent outline-0 border border-gray-400 flex-1/2 px-2 py-2.5 placeholder-gray text-sm text-gray-100 placeholder:text-sm rounded-l-sm mr-0.5"
            type="text"
            placeholder="Search Movie.."
            value={query}
          />
          <button onClick={searchMovies} className="search-btn bg-red-700 border-0 rounded-r-sm text-white text-sm cursor-pointer">
            Search
          </button>
        </div>
       {
          showSearchSuggestion ?  <SearchSuggestion data={filteredSearch} handleClick={handleClick} /> : null
        }
      </div>


      <div>
        <div>
          {
            movies && movies.length ? 
                <div className="movie-card-wrapper grid gap-2 px-2.5 max-w-6xl m-auto">
                {
                  movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))
                }
              </div>
             :  
              <div className="text-red-800  font-bold  h-[10vh] flex items-center justify-center">No movies</div>
          }
        </div>

      </div>
    </>
  );
};

export default Home;

import React from 'react'
import { Link } from 'react-router-dom'
import { useMovieContext } from './FavoriteContext'


const MovieCard = ({movie}) => {

  const { favorites, isFavorite,addToFavorites,removeFromFavorites } = useMovieContext()

  const handleClickFavorites = (e) => {
    e.preventDefault()
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id)
    }else{
      addToFavorites(movie)
    }
       
  }

  return (
      <div className='movie-card'>
         <Link to={`/Details/${movie.id}`}>
            <div className='relative'>
              <img className='w-full h-72 object-cover rounded-t-md'  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
              <div className='absolute top-0 left-0 w-full h-full hover:bg-[rgba(0,0,0,0.3)] duration-150 flex items-start justify-end pointer-events-auto'>
      
              </div>
            </div>
         </Link>
        <div className='px-2 py-2 '>
            <div className='font-bold text-md'>{movie.title}</div>
            <div className='text-gray-400 text-sm'>{movie.release_date && (movie.release_date).split("-")[0]}</div>
        </div>
        <button onClick={handleClickFavorites} className='absolute top-0 right-0 bg-[rgba(0,0,0,0.4)] h-7 w-7 rounded-full flex items-center justify-center text-sm mx-2 my-2 cursor-pointer'>
           {isFavorite(movie.id) ? '❤️' : '🤍'}
        </button>
    </div>
  )
}

export default MovieCard
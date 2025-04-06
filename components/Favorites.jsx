import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { useMovieContext } from './FavoriteContext'
import MovieCard from './MovieCard'
const Favorites = () => {

  const {favorites} = useMovieContext()
  

  return (
      <div className=''>
         {
          favorites && favorites.length ? 
            <div className='movie-card-wrapper grid gap-2 px-2.5 max-w-6xl m-auto'>
              {
                favorites.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))
              }
           </div>
           : <div className='flex items-center justify-center flex-col h-[100vh]'>
                <p className='text-white text-4xl text-center mb-3'>No Favorites</p>
                <Link to="/" className='px-3 py-1.5 rounded-sm bg-red-500 text-sm text-white'>Add Favorite</Link>
             </div>
         }
      </div>
  )
}

export default Favorites
import React, {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import MovieCard from './MovieCard'
const Details = () => {

    const [movie,setMovie] = useState(null)
    const [relatedMovies,setRelatedMovies] = useState([])
    

    const [loading,setLoading] = useState(true)
    const {id} = useParams()
    const KEY = "5c586c1a17d4aff0f81aad484a29faea";
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}`

    useEffect(() => {
        const fetchMovies = async () => {
            try {
              const response = await fetch(url);
              const data = await response.json();
              setMovie(data)


              /* FETCH RELATED MOVIES */
              const relatedMovieResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${KEY}`)
              const relatedMovieData = await relatedMovieResponse.json()
              setRelatedMovies(relatedMovieData.results.slice(0,10))
              
              setLoading(false)
              
                // Scroll to the top of the page when the component loads
              window.scrollTo(0, 0);
            } catch (error) {
              console.log(error);
            }finally{
                setLoading(false)
            }
          };
          fetchMovies()
    },[id])

  

    if(loading) return <div className='text-gray-300 text-2xl text-center h-[90vh] flex items-center justify-center'>
      <div className='h-14 w-14 rounded-full border-t-4 animate-spin border-white'></div>
    </div>

  return (
    <div className='px-4'>
        {
            movie ?
              <div className='flex flex-col sm:flex-row  gap-3.5 max-w-6xl  m-auto mt-9 mb-11 '>
                <div className='w-full sm:w-1/2'>
                   <img className='w-full h-[80vh] object-cover rounded-sm'  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
                </div>
    
                 <div className='w-full sm:w-1/2'>
                    <div className=''>
                        <p className='text-white text-2xl font-bold mb-3'>{movie.title}</p>
                        <p className='overview text-gray-200 text-sm mb-3'>{movie.overview}</p>
                        <p>
                            {
                                movie.genres && movie.genres.length ? 
                                movie.genres.map((genres) => (
                                    <span key={genres.id} className='genres text-white border border-red-600 px-3 py-1.5 mr-2 rounded-2xl'> {genres.name}</span>
                                ))
                                : null
                            }
                        </p>
                        <p className='text-gray-300 mt-4 text-sm'>Released date: <span className='font-bold'>{movie.release_date}</span></p>
                        <p className='text-gray-300 mt-2 text-sm'>Status: <span className='font-bold'>{movie.status}</span> </p>
                        <p className='text-gray-300 mt-2 text-sm'>Time: <span className='font-bold'>{movie.runtime}min</span> </p>

                        <div>
                          <p className='text-white mb-2 mt-3'>Languages :</p>
                          {
                            movie.spoken_languages && movie.spoken_languages.length ?
                             movie.spoken_languages.map((lang,index) => (
                              lang.english_name ?
                               <span key={index} className='text-gray-200 text-sm border px-2 py-1 mr-2'>{lang.english_name}</span>
                               : null
                             ))
                             : null

                          }
                        </div>
                    </div>
                 </div>
              </div>
             : null
        }

        
        <div className='max-w-6xl m-auto'>
          <h1 className='text-white font-bold text-2xl mb-5'>Related Movies</h1>
          <div className=''>
            {
              relatedMovies && relatedMovies.length ?
                <div className='grid gap-2 px-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                  {
                    relatedMovies.map((movie) => (
                     movie.poster_path ?
                      <MovieCard movie={movie} />
                     : null
                    ))
                  }
                </div>
                : null
            }
          </div>
        </div>
   
    </div>

  )
}

export default Details
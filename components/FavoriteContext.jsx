import React, { Children } from 'react'
import { createContext,useEffect,useState,useContext } from 'react'

const myContext = createContext()

export const useMovieContext = () => useContext(myContext)

export const MovieProvider = ({children}) => {

    const [favorites,setFavorites] = useState([])

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || []
        
       if (storedFavorites) {
         setFavorites(storedFavorites)
       }
    },[])

    useEffect(() => {
      if (favorites.length > 0) {
        localStorage.setItem("favorites",JSON.stringify(favorites))
      }
    },[favorites])

    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev,movie])
    }
    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(fav => fav.id !== movieId))
    }

    const isFavorite = (movieId) => {
        return favorites.some(fav => fav.id === movieId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }
  return (
    <myContext.Provider value={value}>
        {children}
    </myContext.Provider>
  )
}

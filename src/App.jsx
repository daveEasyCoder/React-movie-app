
import './App.css'
import Navbar from '../components/Navbar'
import Home from '../components/Home'
import Details from '../components/Details'
import Favorites from '../components/Favorites'
import Footer from '../components/Footer'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { MovieProvider } from '../components/FavoriteContext'
function App() {


  return (
    <>
       <Router basename='/React-movie-app/'>
         <MovieProvider>
         <Navbar />
            <Routes>
               <Route path='/' element={<Home />}></Route>
               <Route path='/Favorites' element={<Favorites />}></Route>
               <Route path='/Details/:id' element={<Details />}></Route>
            </Routes>
            <Footer />
          </MovieProvider>
       </Router>
    </>
  )
}

export default App

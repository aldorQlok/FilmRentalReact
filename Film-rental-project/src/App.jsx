import './App.css'
import MovieList from './Components/MovieList'
import MovieCreate from './Components/MovieCreate.jsx'

export default function App() {

  function handlePageRefresh(){
    window.location.reload()
  }

  return (
    <>
      <MovieList />
      <MovieCreate refresh={handlePageRefresh} />
    </>
  )
}
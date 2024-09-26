import axios from 'axios'

import {getMovies, deleteMovie} from '../Services/MoviesService'

import {useState, useEffect} from 'react'
import MovieEdit from './MovieEdit'

export default function MovieList(){
    const [movies, setMovies] = useState([]);
    const [movieToEdit, setMovieToEdit] = useState(null)

    async function getMovieList(){
        let moviesResponse = await getMovies();
        setMovies(moviesResponse)
    }

    async function handleDelete(id){
        await deleteMovie(id);
        setMovies(movies.filter(m => m.id !== id))
    }
    
    function cancelEdit(){
        setMovieToEdit(null);
    }

    function renderMovieEdit(){
        if(movieToEdit !== null){
            return <MovieEdit movie={movieToEdit} closeEdit={cancelEdit} refreshList={getMovieList}/>
        }
    }

    useEffect(() => {
        getMovieList();
    }, [])

    return (
        <>
            <h1>List of Movies</h1>
            <ul>
                {movies.map(movie => (
                        <div key={movie.id}>
                            <li>
                                <b>Movie Title:</b> {movie.title} <b>Released:</b> {movie.releaseYear}
                            </li>
                            <button onClick={() => handleDelete(movie.id)}>Delete</button>
                            <button onClick={() => setMovieToEdit(movie)}>Edit Movie</button>
                        </div>
                    ))}
            </ul>

            {renderMovieEdit()}
        </>
    )
}
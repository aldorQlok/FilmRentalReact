import axios from 'axios'
import {useState, useEffect} from 'react'
import MovieEdit from './MovieEdit'

export default function MovieList(){
    const [movies, setMovies] = useState([]);
    const [movieToEdit, setMovieToEdit] = useState(null)

    async function getMovieList(){
        try{
            const response = await axios.get('https://localhost:7127/api/Movies')
            setMovies(response.data)
            console.log(response.data)
        } catch(error){
            console.log("Error fetching Movies: ", error)
        }
    }

    async function handleDelete(id){
        try{

            await axios.delete(`https://localhost:7127/api/Movies/deleteMovie/${id}`);
            setMovies(movies.filter(m => m.id !== id))
        } catch(error){
            console.log(error);
        }
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
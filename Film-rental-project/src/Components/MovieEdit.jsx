import {useState} from 'react'
import axios from 'axios'

export default function MovieEdit({movie, closeEdit, refreshList}){

    const [title, setTitle] = useState(movie.title);
    const [releaseYear, setReleaseYear] = useState(movie.releaseYear);

    async function handleSubmit(e){
        e.preventDefault();

        try{
            const updatedMovie = {id: movie.id, title, releaseYear: parseInt(releaseYear)}
            await axios.put(`https://localhost:7127/api/Movies/updateMovie/${movie.id}`, updatedMovie)

            refreshList();
            closeEdit();
        } catch(error){
            console.log('error occured', error)
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label>Movie Title</label>
                <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                required
                />

                <label>Release Date</label>
                <input 
                value={releaseYear}
                onChange={(e) => setReleaseYear(e.target.value)}
                type='number'
                required
                />

                <button type='submit'>Save</button>
                <button type='button' onClick={closeEdit}>Cancel</button>
            </form>
        </>
    )
}
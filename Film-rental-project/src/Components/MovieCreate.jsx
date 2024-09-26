import {useState} from 'react'
import axios from 'axios'

export default function MovieCreate({refresh}){

    const [title, setTitle] = useState('');
    const [releaseYear, setReleaseYear] = useState('')

    async function handleSubmit(e){
        e.preventDefault();
        
        try{
            const movie = {title, releaseYear: parseInt(releaseYear)}

            await axios.post('https://localhost:7127/api/Movies/addMovie', movie)

        } catch(error){
            console.log(movie)
            console.log(error)
        }

        refresh();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Movie Title:</label>
                <input 
                id='title'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required 
                />

                <label htmlFor='releaseDate'>Release Date:</label>
                <input 
                id='releaseDate'
                type='number'
                value={releaseYear}
                onChange={(e) => setReleaseYear(e.target.value) }
                required
                />

                <button type='submit'>Create Movie</button>
            </form>
        </>
    )
}
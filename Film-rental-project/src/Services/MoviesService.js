import axios from 'axios'

const API_URI = 'https://localhost:7127/api/Movies';

export async function getMovies(){
    try{
        const response = await axios.get(API_URI)
        return response.data;
    } catch(error){
        console.log("Error fetching Movies: ", error)
    }
}


export async function deleteMovie(id){
    try{

        await axios.delete(`${API_URI}${id}`);
        
    } catch(error){
        console.log(error);
    }
}
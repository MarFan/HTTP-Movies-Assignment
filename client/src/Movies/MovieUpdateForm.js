import React, { useState, useEffect } from 'react'
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateForm = (props) => {
    const [movie, setMovie] = useState(initialMovie)

    useEffect(() => {
        const movieToEdit = props.movieList.find(
            m => `${m.id}` === props.match.params.id
        )
        if (movieToEdit) setMovie(movieToEdit);
    }, [props.movieList, props.match.params.id])

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        if (ev.target.name === 'metascore'){
            value = parseInt(value, 10);
        }

        setMovie({
            ...movie,
            [ev.target.name]: value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        axios.put(`//localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                // update state values
                props.updateMovies(movie);
                props.history.push('/');
            })
            .catch(err => console.log(err.response))
    }

    return (
        <div>
            <h3>Update Movie</h3>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" value={movie.title} onChange={changeHandler} />
                    <input type="text" name="director" value={movie.director} onChange={changeHandler} />
                    <input type="number" name="metascore" value={movie.metascore} onChange={changeHandler} />
                    <input type="text" name="stars" value={movie.stars} onChange={changeHandler} />
                    <button>Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateForm;
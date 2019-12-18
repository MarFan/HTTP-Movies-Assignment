import React, { useState } from 'react';
import axios from 'axios'

const MovieAddForm = (props) => {
    const [formValues, setFormValues] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: []
    })

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;

        if (ev.target.name === 'metascore'){
            value = parseInt(value, 10);
        }

        setFormValues({
            ...formValues,
            [ev.target.name]: value
        });
    }

    const starsHandler = e => {
        // turn the string into an array... ?
    }

    const handleSubmit = e => {
        e.preventDefault();

        // atempt to convert stars comma list to an array
        // console.log(formValues.stars.split(','))
        // const starsToArray =  formValues.stars.split(','); // this works, stars are now in an array

        // setFormValues({
        //     ...formValues,
        //     stars: starsToArray // this doesn't seem to update stars
        // });
 
        //console.log(formValues)
       
        axios.post('//localhost:5000/api/movies', formValues)
            .then(res => {
                props.addMovie(res.data);
                props.history.push('/');
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Movie Title" value={formValues.title} onChange={changeHandler} />
                <input type="text" name="director" placeholder="Director" value={formValues.director} onChange={changeHandler} />
                <input type="number" name="metascore" placeholder="Metascore" value={formValues.metascore} onChange={changeHandler} />
                <input type="text" name="stars" placeholder="Stars" value={formValues.stars} onChange={changeHandler} />
                <button>Add</button>
            </form>
        </>
    )
}

export default MovieAddForm;
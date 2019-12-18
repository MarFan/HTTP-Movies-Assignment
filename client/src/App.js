import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/MovieUpdateForm';
import axios from 'axios'

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
      axios
        .get("http://localhost:5000/api/movies")
        .then(res => setMovies(res.data))
        .catch(err => console.log(err.response));    
  },[])

  const updateMovies = movie => {
    setMovies(
      movies.map(m => {
        if(m.id === movie.id) {
          return {
            ...movie
          }
        }else{
          return m
        }
      })
    )
  }

  const deleteMovie = movie => {
    setMovies(movies.filter(m => m.id !== movie.data))
  }

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" render={props => {return <MovieList movies={movies}  />}} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} deleteMovie={deleteMovie} />;
        }}
      />
      <Route path="/update-movie/:id"
        render={props => {
          return <UpdateMovie {...props} movieList={movies} updateMovies={updateMovies} />}
        }
      />
    </>
  );
};

export default App;

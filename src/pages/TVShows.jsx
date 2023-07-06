import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";
import axios from "axios";

function TVShows() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "tv" }));
    }
  }, [genresLoaded]);

  const addToLikedMovies = async (email, data) => {
    try {
      await axios.post("http://localhost:5001/api/user/add", {
        email,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromLikedMovies = async (email, movieId) => {
    try {
      await axios.put("http://localhost:5001/api/user/remove", {
        email,
        movieId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToLikedMovies = (email, data) => {
    addToLikedMovies(email, data);
  };

  const handleRemoveFromLikedMovies = (email, movieId) => {
    removeFromLikedMovies(email, movieId);
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar
        isScrolled={isScrolled}
        handleLoginRedirect={handleLoginRedirect}
      />
      <div className="data">
        <SelectGenre genres={genres} type="tv" />
        {movies.length ? (
          <Slider
            movies={movies}
            handleAddToLikedMovies={handleAddToLikedMovies}
            handleRemoveFromLikedMovies={handleRemoveFromLikedMovies}
          />
        ) : (
          <h1 className="not-available">
            No TV Shows available for the selected genre. Please select a
            different genre.
          </h1>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      margin-top: 4rem;
    }
  }
`;

export default TVShows;

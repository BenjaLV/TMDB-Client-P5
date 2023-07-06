import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { getUsersLikedMovies } from "../store";
import Card from "../components/Card";

export default function UserListedMovies() {
  const movies = useSelector((state) => state.netflix.likedMovies);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!token) return;

    dispatch(getUsersLikedMovies(token.email));
  }, [token]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
          {movies.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                isLiked={true}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;

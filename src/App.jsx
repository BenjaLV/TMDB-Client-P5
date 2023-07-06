import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MoviePage from "./pages/Movies";
import Netflix from "./pages/Netflix";
import Player from "./pages/Player";
import Register from "./pages/Register";
import TVShows from "./pages/TVShows";
import UserListedMovies from "./pages/UserListedMovies";
import { useDispatch, useSelector } from "react-redux";
import { getUsersLikedMovies } from "./store";
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  React.useEffect(() => {
    if (!token) return;
    dispatch(getUsersLikedMovies(token.email));
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route exact path="/player" element={<Player />} />
          <Route exact path="/tv" element={<TVShows />} />
          <Route exact path="/movies" element={<MoviePage />} />
          <Route exact path="/new" element={<Player />} />
          <Route exact path="/mylist" element={<UserListedMovies />} />
          <Route exact path="/" element={<Netflix />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

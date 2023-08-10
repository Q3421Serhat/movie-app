import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";

const Main = () => {
  const { movies } = useContext(MovieContext)
  return <div>Main</div>;
  console.log(movies);
};

export default Main;

import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => (
  <>
    <header>Welcome Home</header>
    <Link to="/boards">Log in</Link>
  </>
);
export default Home;

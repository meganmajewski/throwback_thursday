import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "../styles/header.scss";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="throwback thursday logo"></img>
      </Link>
      <ul>
        <li>
          <Link to="/gallery">Gallery</Link>
        </li>
        <li>Vote</li>
        <li>
          <Link to="/upload">Upload</Link>
        </li>
      </ul>
    </header>
  );
}

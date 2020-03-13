import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import "../styles/header.scss";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <img id="logo" src={logo} alt="throwback thursday logo"></img>
      </Link>
      <ul>
        <li>
          <NavLink activeClassName="active" className="nav-link" to="/gallery">
            Gallery
          </NavLink>
        </li>
        <li>Vote</li>
        <li>
          <NavLink activeClassName="active" className="nav-link" to="/upload">
            Upload
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

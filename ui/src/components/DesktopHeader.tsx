import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "../styles/header.scss";
import HeaderLinks from "./HeaderLinks";

export default function DesktopHeader() {
  return (
    <header>
      <Link to="/">
        <img id="logo" src={logo} alt="throwback thursday logo"></img>
      </Link>
      <HeaderLinks />
    </header>
  );
}

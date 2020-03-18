import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import "../styles/header.scss";
import { UploadModal } from "./UploadModal";

export default function Header() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <header>
      <Link to="/">
        <img id="logo" src={logo} alt="throwback thursday logo"></img>
      </Link>
      <ul className="nav-list">
        <li>
          <NavLink activeClassName="active" className="nav-link" exact to="/">
            vote
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" className="nav-link" to="/gallery">
            Gallery
          </NavLink>
        </li>

        <li className="upload-link">
          <button onClick={openModal} className="button">
            Upload
          </button>
          <UploadModal openModal={modalIsOpen} closeModal={closeModal} />
        </li>
      </ul>
    </header>
  );
}

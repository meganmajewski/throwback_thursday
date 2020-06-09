import React from "react";
import { NavLink } from "react-router-dom";
import { UploadModal } from "./UploadModal";
export default function HeaderLinks() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
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
  );
}

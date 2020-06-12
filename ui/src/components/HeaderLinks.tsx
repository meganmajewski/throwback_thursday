import React from "react";
import { NavLink } from "react-router-dom";
import { UploadModal } from "./UploadModal";
export default function HeaderLinks(props: {
  toggleDrawer?: (
    open: boolean
  ) => (
    event: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>
  ) => void;
}) {
  const [modalIsOpen, setIsOpen] = React.useState<Boolean>();

  function closeHamburgerMenu(e: React.MouseEvent<Element>) {
    if (props.toggleDrawer) {
      props.toggleDrawer(false)(e);
    }
  }

  function openModal(e: React.MouseEvent<Element>) {
    setIsOpen(true);
    closeHamburgerMenu(e);
  }

  function closeModal(e: React.MouseEvent<Element>) {
    closeHamburgerMenu(e);
    setIsOpen(false);
  }
  return (
    <ul className="nav-list">
      <li>
        <NavLink
          activeClassName="active"
          className="nav-link"
          exact
          to="/"
          onClick={(e) => {
            closeHamburgerMenu(e);
          }}
        >
          vote
        </NavLink>
      </li>
      <li>
        <NavLink
          activeClassName="active"
          className="nav-link"
          to="/gallery"
          onClick={closeHamburgerMenu}
        >
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

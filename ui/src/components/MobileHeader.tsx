import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "../styles/header.scss";
import { Drawer, Button } from "@material-ui/core";
import hamburger from "../images/hamburger.png";
import HeaderLinks from "./HeaderLinks";

export default function MobileHeader() {
  const [open, setOpenState] = React.useState<boolean>();
  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setOpenState(open);
  };

  return (
    <header>
      <Link to="/">
        <img id="logo" src={logo} alt="throwback thursday logo"></img>
      </Link>
      <React.Fragment key={"right"}>
        <Button onClick={toggleDrawer(true)}>
          <img
            className="hamburger-icon"
            src={hamburger}
            alt="hamburger icon"
          />
        </Button>
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          <HeaderLinks />
        </Drawer>
      </React.Fragment>
    </header>
  );
}

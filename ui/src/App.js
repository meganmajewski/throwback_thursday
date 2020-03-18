import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Gallery from "./pages/Gallery";
import Vote from "./pages/Vote";
import Modal from "react-modal";
import Upload from "./pages/Upload";
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");
function App() {
  return (
    <Router>
      <Header />
      <div id="main">
        <div className="content-container">
          <Switch>
            <Route path="/gallery">
              <Gallery />
            </Route>
            <Route path="/upload">
              <Upload />
            </Route>
            <Route path="/">
              <Vote />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

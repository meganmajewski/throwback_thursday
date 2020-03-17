import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Gallery from "./pages/Gallery";
import Vote from "./pages/Vote";
import Upload from "./pages/Upload";

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

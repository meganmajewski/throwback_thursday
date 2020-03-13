import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Gallery from "./pages/Gallery";
import Upload from "./pages/Upload";

function App() {
  return (
    <Router>
      <div id="main">
        <Header />
        <div className="content-container">
          <Switch>
            <Route path="/gallery">
              <Gallery />
            </Route>
            <Route path="/upload">
              <Upload />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

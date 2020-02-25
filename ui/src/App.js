import React from 'react';
import logo from './images/logo.png';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Gallery from './pages/Gallery';
import Upload from './pages/Upload';

function App() {
  return (
    <Router>
          <Header/>
            <Switch>
                <Route path="/gallery">
                    <Gallery/>
                </Route>
                <Route path="/upload">
                    <Upload/>
                </Route>
            </Switch>
        </Router>
  );
}

export default App;

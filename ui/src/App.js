import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import MobileGallery from "./pages/MobileGallery";
import Vote from "./pages/Vote";
import Modal from "react-modal";
import Upload from "./pages/Upload";
import DesktopGallery from "./pages/DesktopGallery";
Modal.setAppElement("#root");
function App() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 780;

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  return (
    <Router>
      <Header />
      <div id="main">
        <div className="content-container">
          <Switch>
            <Route path="/gallery">
              {width < breakpoint ? <MobileGallery /> : <DesktopGallery />}
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

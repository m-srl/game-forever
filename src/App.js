import React from "react";
// styles
import GlobalStyles from "./components/GlobalStyles";
// components and pages
import Home from "./pages/Home";
import Nav from "./components/Nav";
// React route
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Nav />
      <Route path={["/game/:id", "/"]}>
        <Home />
      </Route>
    </div>
  );
}

export default App;

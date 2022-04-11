import React from "react";
import { useState } from "react";
import "./App.css";
import MetamaskAuth from "./MetamaskAuth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Profile from "./Profile";
import Home from "./Home";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isAuthenticated) {
    // window.location.href = "http://127.0.0.1:3000/profile/u5465";
    return <Profile isAuthenticated={isAuthenticated} />;
  }

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} />
      <Routes>
        <Route
          path="/profile/:id"
          element={<Profile isAuthenticated={isAuthenticated} />}
        />
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/login"
          element={
            <MetamaskAuth
              // setAuthenticated={setIsAuthenticated}
              onAddressChanged={(userAddress) => {
                // if (userAddress) {
                //   setIsAuthenticated(true);
                // } else {
                //   setIsAuthenticated(false);
                // }
                setIsAuthenticated(true);
                console.log("iuhiuh iuhkugkuyg uyhgf ukg ukfv");
                // window.location.href =
                //   "http://127.0.0.1:3000/profile/" + userAddress;
              }}
            />
          }
        />
        <Route path="*" element={<Home />} />
        {/* <Route exact path="/profile/:id" />
      <Route exact path="/profile/:id" /> */}
      </Routes>
    </Router>
  );
};

export default App;

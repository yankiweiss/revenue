import React from "react";
import Header from "./Header";
import Navbar from './Navbar';
import SignIn from './SignIn';
import { useState } from "react";


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <>
      <Header />

      {isAuthenticated && <Navbar />}

      {!isAuthenticated && <SignIn onLoginSuccess={() => setIsAuthenticated(true)} />}
    </>
  );
}

export default App;

import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import SignIn from "./SignIn";
import { useState } from "react";
import SignUp from "./SignUp";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isSignUpPressed, setIsSignUpPressed] = useState(false);

  if(isAuthenticated){

  return (
    <>


      <Header />

    <Navbar />
    </>
  );

}

return (
  <>
  <Header />

  {!isSignUpPressed ? (
    <SignIn 
     onLoginSuccess={() => setIsAuthenticated(true)}
          onSignUpPressed={() => setIsSignUpPressed(true)} />
  ) : (
    <SignUp onBackToSignIn={() => setIsSignUpPressed(false)} />
  )}
  </>
)
}

export default App;

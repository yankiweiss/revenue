import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";

import {Route, Routes } from 'react-router-dom'
import UploadExcel from "./UploadExcel";
import Table from "./Table";
import ProfileDetail from "./ProfileDetal";



function App() {
//  const [isAuthenticated, setIsAuthenticated] = useState(false);
//  const [isSignUpPressed, setIsSignUpPressed] = useState(false);
//  if(isAuthenticated){
//
  return (
    <>
    <Header />
  <Navbar />

  <Routes >
    <Route exact path="/UploadExcel" element={<UploadExcel/>}/>
    <Route exact path="/Table" element={<Table/>}/>
     <Route  exact path="/profile/:id" element={<ProfileDetail/>} />

   
  </Routes>

  
  </>


//  <>
//  <Header />
//
//  {!isSignUpPressed ? */
//    <SignIn 
//     onLoginSuccess={() => setIsAuthenticated(true)}
//          onSignUpPressed={() => setIsSignUpPressed(true)} />
//  ) : (
//    <SignUp onBackToSignIn={() => setIsSignUpPressed(false)} />
//  )}

)
}

export default App;

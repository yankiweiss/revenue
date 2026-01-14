import React, { useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";

import { Route, Routes } from "react-router-dom";
import UploadExcel from "./UploadExcel";
import Table from "./Table";
import ProfileDetail from "./ProfileDetal";
import Messages from "./Messages";

function App() {
  const [errorData, setErrorData] = useState([]);

  fetch("https://revenue-two.vercel.app/api/patients/same")
    .then((response) => response.json())
    .then((array) => setErrorData(array));

  return (
    <>
      <Header />
      <Navbar data={errorData}/>

      <Routes>
        <Route exact path="/UploadExcel" element={<UploadExcel />} />
        <Route exact path="/Table" element={<Table />} />
        <Route exact path="/profile/:id" element={<ProfileDetail />} />
        <Route exact path="/Messages" element={<Messages data={errorData}/>} />
      </Routes>
    </>
  );
}

export default App;

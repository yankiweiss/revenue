import React from "react";
import UploadExcel from "./UploadExcel";
import Header from "./Header";
import Navbar from "./Navbar";
import Table from "./Table";
import User from "./Users";
import { SignIn } from "./SignIn";

function App() {
  return (
    <>
      <Header />
      {/*<Navbar />*/}
      {/*<Table />*/}
      {/*<UploadExcel />*/}
      <SignIn />

      {/* need to still workout the below */}
      {/*<User />*/}
    </>
  );
}

export default App;

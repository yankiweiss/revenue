import { useState } from "react";
import UploadExcel from "./UploadExcel";
import Table from "./Table";

function Navbar() {
  const [selection, setSelection] = useState("upload-excel");

  const handleOnChange = (e) => {
    setSelection(e.target.value);
  };

  return (
    <>
      <section className="nav d-flex justify-content-center" >
        <select value={selection} onChange={handleOnChange}>
          <option value="patients-records">Patients Records</option>
          <option value="upload-excel">Upload Excel</option>
        </select>
      </section>

      {selection === "upload-excel" && < UploadExcel />}
      {selection === "patients-records" && <Table />}
    </>
  );
}

export default Navbar;

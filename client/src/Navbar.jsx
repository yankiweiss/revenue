import { useState } from "react";
import UploadExcel from "./UploadExcel";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Table from "./Table";

function Navbar() {
  const [selection, setSelection] = useState("upload-excel");

  const handleOnChange = (e) => {
    setSelection(e.target.value);
  };

  return (
    <>

   <nav class="navbar navbar-expand-lg bg-body-tertiary d-flex justify-content-center gap-3">

    <section >
        <select className="form-select" value={selection} onChange={handleOnChange}>
          <option value="patients-records">Patients Records</option>
          <option value="upload-excel">Upload Excel</option>
        </select>
      </section>

      <section>
       <button type="button" class="btn btn-secondary">Messages</button>
      </section>
      
   </nav>

    {selection === "upload-excel" && < UploadExcel />}
      {selection === "patients-records" && <Table />}
      
    </>
  );
}

export default Navbar;

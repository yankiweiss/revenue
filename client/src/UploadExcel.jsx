import { useState } from "react";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"

import * as XLSX from "xlsx";

function UploadExcel() {
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    if (excelData.length === 0) {
      console.log('No Excel Data to Submit');
      return;
    }
    fetch("http://localhost:3500/patients", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: excelData })
    })
      .then((res) => res.json())
  }, [excelData])

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;

      const workbook = XLSX.read(bstr, { type: "binary" });

      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

      const data = XLSX.utils.sheet_to_json(firstSheet, {header: 1, raw: false});

      

      const filtered = data.filter((row) =>
        row.some((cell) => cell !== null && cell !== "")
      );

      const headers = filtered[0].map((h) =>
        h.toString().toLowerCase().trim().replace(" ", "_")
      );

      const rows = filtered.slice(1);

      const converted = rows.map((row) => {
        const excelObj = {};
        row.forEach((value, index) => {
          excelObj[headers[index]] = value;
        });
        return excelObj;
      });
      setExcelData(converted);
    };

    reader.readAsBinaryString(file);
  };

  // need to find a way how to get all headers attached to the value and so to be able to post it.

  return (

<div className="d-flex flex-column align-items-center mt-5">
  <h4>Upload New Patients</h4>
      <input 
       className="form-control w-25"
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFileUpload}
      />
  </div>
  );
}

export default UploadExcel;

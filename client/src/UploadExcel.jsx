import { useState } from "react";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import * as XLSX from "xlsx";

function UploadExcel() {
  const [excelData, setExcelData] = useState([]);
  const [res, setRes] = useState("");
  const [resRowsInserted, setResRowsInserted] = useState('')
  const [resRowsSkipped, setRowsSkipped] = useState('')

  useEffect(() => {
    if (excelData.length === 0)
   return;

    const UploadingExcel = async () => {
      try {
        const response = await fetch(
          "https://revenue-two.vercel.app/api/patients",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: excelData }),
          }
        );

        const result = await response.json();
        setRes(result.message);
        setResRowsInserted(result.rowsInserted);
        setRowsSkipped(result.rowsSkipped)
       
      } catch (error) {
        setRes("Upload failed");
      }
    };

    UploadingExcel();
  }, [excelData]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;

      const workbook = XLSX.read(bstr, { type: "binary" });

      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

      const data = XLSX.utils.sheet_to_json(firstSheet, {
        header: 1,
        raw: false,
      });

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
    <>
      <div className="d-flex flex-column align-items-center mt-5">
        <h4 className="mt-5">Upload New Patients</h4>
        <input
          className="form-control w-25"
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileUpload}
        />
      </div>

      {res && <h4 className="mt-5" style={{ color: "navy", textAlign: "center" }}>{res}</h4>}
      {resRowsInserted && <h4 className="mt-5" style={{ color: "navy", textAlign: "center" }}>{`rows inserted in DB ${resRowsInserted}`}</h4>}
      {resRowsSkipped && <h4 className="mt-5" style={{ color: "navy", textAlign: "center" }}>{`Rows Skipped ${resRowsSkipped}`}</h4>}

<div className="text-center ">
<h1 className="badge  rounded-pill text-bg-danger display-4" style={{marginTop: '150px', fontSize: '20px'}}>Please have the Headings as below:</h1>
</div>

     <table class="table w-50 mx-auto mt-5" >
  <thead>
    <tr>
      <th scope="col">Client</th>
      <th scope="col">Insurance</th>
      <th scope="col">Status</th>
      <th scope="col">Company Name</th>
      <th scope="col">Member ID</th>
      <th scope="col">Worked Date</th>
      <th scope="col">Date Of Birth	</th>
    </tr>
  </thead>
  
</table>

    </>
  );
}

export default UploadExcel;

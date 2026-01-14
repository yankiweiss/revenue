import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as XLSX from "xlsx";

function UploadExcel() {
  const [excelData, setExcelData] = useState([]);
  const [res, setRes] = useState("");
  const [resRowsInserted, setResRowsInserted] = useState("");
  const [resRowsSkipped, setRowsSkipped] = useState("");

  useEffect(() => {
    if (excelData.length === 0) return;

    const UploadingExcel = async () => {
      try {
        const response = await fetch(
          "https://revenue-two.vercel.app/api/patients",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: excelData }),
          }
        );

        const result = await response.json();
        setRes(result.message);
        setResRowsInserted(result.rowsInserted);
        setRowsSkipped(result.rowsSkipped);
      } catch {
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
      const workbook = XLSX.read(evt.target.result, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const data = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false });
      const filtered = data.filter((row) =>
        row.some((cell) => cell !== null && cell !== "")
      );

      const headers = filtered[0].map((h) =>
        h.toLowerCase().trim().replace(" ", "_")
      );

      const rows = filtered.slice(1);

      const converted = rows.map((row) => {
        const obj = {};
        row.forEach((value, index) => {
          obj[headers[index]] = value;
        });
        return obj;
      });

      setExcelData(converted);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="container my-5">
      {/* ================= Upload Card ================= */}
      <div className="card shadow-sm mx-auto mb-4" style={{ maxWidth: "500px" }}>
        <div className="card-header bg-light fw-bold text-center">
          Upload Patient Excel File
        </div>

        <div className="card-body text-center">
          <p className="text-muted mb-3">
            Upload an Excel or CSV file to bulk insert patients.
          </p>

          <input
            type="file"
            className="form-control"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      {/* ================= Results ================= */}
      {(res || resRowsInserted || resRowsSkipped) && (
        <div className="row text-center mb-4">
          {res && (
            <div className="col-md-4 mx-auto">
              <div className="alert alert-info">{res}</div>
            </div>
          )}

          {resRowsInserted && (
            <div className="col-md-4 mx-auto">
              <div className="alert alert-success">
                Rows Inserted: <strong>{resRowsInserted}</strong>
              </div>
            </div>
          )}

          {resRowsSkipped && (
            <div className="col-md-4 mx-auto">
              <div className="alert alert-warning">
                Rows Skipped: <strong>{resRowsSkipped}</strong>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= Required Headers ================= */}
      <div className="card shadow-sm mx-auto" style={{ maxWidth: "700px" }}>
        <div className="card-header bg-danger text-white fw-bold text-center">
          Required Excel Headers
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-striped mb-0 text-center">
            <thead className="table-light">
              <tr>
                <th>Client</th>
                <th>Insurance</th>
                <th>Status</th>
                <th>Company Name</th>
                <th>Member ID</th>
                <th>Worked Date</th>
                <th>Date Of Birth</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UploadExcel;
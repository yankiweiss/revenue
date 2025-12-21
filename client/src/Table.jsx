import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

function Table() {
  const [patientsData, setPatientsData] = useState([]);

  useEffect(() => {
    fetch("api/patients")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPatientsData(data.data);
      });
  }, []);

  return (
    <>
    <div className="d-flex justify-content-center" >
      <table style={{marginTop: "75px"}} className="table table-striped table-bordered w-75 rounded">
        <thead>
          <tr>
            <th scope="col">Client</th>
            <th scope="col">Insurance</th>
            <th scope="col">Status</th>
            <th scope="col">Company Name</th>
            <th scope="col">Member ID</th>
            <th scope="col">Worked Date</th>
            <th scope="col">Date Of Birth</th>
          </tr>
        </thead>
        <tbody>
          {patientsData.map((row) => {
            return (
              <tr key={row.id}>
                <td>{row.client}</td>
                <td>{row.insurance}</td>
                <td>{row.status}</td>
                <td>{row.company_name}</td>
                <td>{row.member_id}</td>
                <td>{row.worked_date}</td>
                <td>{row.dob}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </>
  );
}

export default Table;

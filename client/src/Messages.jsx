import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function Messages({data}) {
 

  return (
    <>
      <table className="table w-75 mx-auto mt-5">
        <thead>
          <tr>
            <th>DOB</th>
            <th>Patient Name</th>
            <th>Insurance</th>
            <th>Error</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.dob}</td>
              <td>{row.client}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Messages;

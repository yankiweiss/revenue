import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Table() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://revenue-two.vercel.app/api/patients")
      .then((res) => {
        return res.json();
      })
      .then((data) => setData(data.data));
  }, []);

  return (
    <>
      <input
        placeholder="Client search..."
        className="form-control w-25 mx-auto mt-5"
      />
      <div className="table-responsive w-75 mx-auto mt-2 rounded overflow-hidden border border-3 border-light-subtle">
        <table className="table table-striped table-bordered mb-0">
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
            {[...data].sort((a, b) => a.client.localeCompare(b.client, undefined, { sensitivity: "base" }))
            
            .map((row) => (
              <tr key={row.id}>
                <td>
                  <input
                    className="form-control border-0 bg-transparent"
                    value={row.client}
                  />
                </td>
                <td>
                  <input
                    className="form-control border-0 bg-transparent"
                    value={row.insurance}
                  />
                </td>
                <td>
                  <input
                    className="form-control border-0 bg-transparent"
                    value={row.status}
                  />
                </td>
                <td>
                  <input
                    className="form-control border-0 bg-transparent"
                    value={row.company_name}
                  />
                </td>
                <td>
                  <input
                    className="form-control border-0 bg-transparent"
                    value={row.member_id}
                  />
                </td>
                <td>
                  <input
                    className="form-control border-0 bg-transparent"
                    value={row.worked_date}
                  />
                </td>
                <td>
                  <input
                    className="form-control border-0 bg-transparent"
                    value={row.dob}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;

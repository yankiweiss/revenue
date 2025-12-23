import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

function Table() {
  const [patientsData, setPatientsData] = useState([]);

  const [search, setSearch] = useState("");

  const addItem = (id, field, newValue) => {
    fetch("https://revenue-two.vercel.app/api/patients/updateField", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, field, newValue }),
    });
  };

  useEffect(() => {
    fetch("https://revenue-two.vercel.app/api/patients")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPatientsData(data.data);
      });
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center">
        <input
          style={{ width: "250px", marginTop: "25px" }}
          className="form-control"
          placeholder="search client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="d-flex justify-content-center">
        <table
          style={{ marginTop: "75px", borderCollapse: "collapse" }}
          className="table table-striped table-bordered w-75 rounded"
        >
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
            {patientsData
              .filter((row) =>
                row.client.toLowerCase().includes(search.toLowerCase())
              )

              .map((row) => (
                <tr key={row.id}>
                  <td>
                    <input
                      value={row.client}
                      className="form-control form-control-sm border-0 bg-transparent"
                      onChange={(e) =>
                        setPatientsData((prev) =>
                          prev.map((r) =>
                            r.id === row.id
                              ? { ...r, client: e.target.value }
                              : r
                          )
                        )
                      }
                      onBlur={(e) => addItem(row.id, "client", e.target.value)}
                    />
                  </td>

                  <td>
                    <input
                      value={row.insurance}
                      className="form-control form-control-sm border-0 bg-transparent"
                      onChange={(e) =>
                        setPatientsData((prev) =>
                          prev.map((r) =>
                            r.id === row.id
                              ? { ...r, insurance: e.target.value }
                              : r
                          )
                        )
                      }
                      onBlur={(e) =>
                        addItem(row.id, "insurance", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      value={row.status}
                      className="form-control form-control-sm border-0 bg-transparent"
                      onChange={(e) =>
                        setPatientsData((prev) =>
                          prev.map((r) =>
                            r.id === row.id
                              ? { ...r, status: e.target.value }
                              : r
                          )
                        )
                      }
                      onBlur={(e) => addItem(row.id, "status", e.target.value)}
                    />
                  </td>

                  <td>
                    <input
                      value={row.company_name}
                      className="form-control form-control-sm border-0 bg-transparent"
                      onChange={(e) =>
                        setPatientsData((prev) =>
                          prev.map((r) =>
                            r.id === row.id
                              ? { ...r, company_name: e.target.value }
                              : r
                          )
                        )
                      }
                      onBlur={(e) =>
                        addItem(row.id, "company_name", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      value={row.member_id}
                      className="form-control form-control-sm border-0 bg-transparent"
                      onChange={(e) =>
                        setPatientsData((prev) =>
                          prev.map((r) =>
                            r.id === row.id
                              ? { ...r, member_id: e.target.value }
                              : r
                          )
                        )
                      }
                      onBlur={(e) =>
                        addItem(row.id, "member_id", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      value={row.worked_date}
                      className="form-control form-control-sm border-0 bg-transparent"
                      onChange={(e) =>
                        setPatientsData((prev) =>
                          prev.map((r) =>
                            r.id === row.id
                              ? { ...r, worked_date: e.target.value }
                              : r
                          )
                        )
                      }
                      onBlur={(e) => {
                        const value = e.target.value || null
                        addItem(row.id, "worked_date", value)
                      }}
                    />
                  </td>

                  <td>
                    <input
                      value={row.dob}
                      className="form-control form-control-sm border-0 bg-transparent"
                      onChange={(e) =>
                        setPatientsData((prev) =>
                          prev.map((r) =>
                            r.id === row.id ? { ...r, dob: e.target.value } : r
                          )
                        )
                      }
                      onBlur={(e) => {
                        const value = e.target.value || null
                        addItem(row.id, "dob", value)

                      } }
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



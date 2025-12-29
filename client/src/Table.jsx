import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Table() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const searchData = data.filter((row) =>
    row.client.trim().toLowerCase().includes(search.trim().toLowerCase())
  );

  useEffect(() => {
    fetch("https://revenue-two.vercel.app/api/patients")
      .then((res) => {
        return res.json();
      })
      .then((data) => setData(data.data));
  }, []);

  const addItem = (id, field, newValue) => {
    fetch("https://revenue-two.vercel.app/api/patients/updateField", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, field, newValue }),
    });
  };

  return (
    <>
      <input
        placeholder="Client search..."
        className="form-control w-25 mx-auto mt-5 mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
              <th style={{ width: "25%" }} scope="col">
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {[...searchData]
              .sort((a, b) =>
                a.client.localeCompare(b.client, undefined, {
                  sensitivity: "base",
                })
              )

              .map((row) => (
                <tr key={row.id}>
                  <td>
                    <input
                      className="form-control border-0 bg-transparent"
                      value={row.client}
                      onChange={(e) =>
                        setData((prev) =>
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
                      className="form-control border-0 bg-transparent"
                      value={row.insurance}
                      onChange={(e) =>
                        setData((prev) =>
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
                      className="form-control border-0 bg-transparent"
                      value={row.status}
                      onChange={(e) =>
                        setData((prev) =>
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
                      className="form-control border-0 bg-transparent"
                      value={row.company_name}
                      onChange={(e) =>
                        setData((prev) =>
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
                      className="form-control border-0 bg-transparent"
                      value={row.member_id}
                      onChange={(e) =>
                        setData((prev) =>
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
                      className="form-control border-0 bg-transparent"
                      value={row.worked_date}
                      onChange={(e) =>
                        setData((prev) =>
                          prev.map((r) =>
                            r.id === row.id
                              ? { ...r, worked_date: e.target.value }
                              : r
                          )
                        )
                      }
                      onBlur={(e) =>
                        addItem(row.id, "worked_date", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="form-control border-0 bg-transparent"
                      value={row.dob}
                      onChange={(e) =>
                        setData((prev) =>
                          prev.map((r) =>
                            r.id === row.id ? { ...r, dob: e.target.value } : r
                          )
                        )
                      }
                      onBlur={(e) => addItem(row.id, "dob", e.target.value)}
                    />
                  </td>
                  <td>
                    <textarea
                      className="form-control border-0 bg-transparent w-100"
                      value={row.notes ?? ""}
                      onChange={(e) =>
                        setData((prev) =>
                          prev.map((r) =>
                            r.id === row.id
                              ? { ...r, notes: e.target.value }
                              : r
                          )
                        )
                      }
                      onBlur={(e) => {
                        const value = e.target.value.trim() || null;

                        addItem(row.id, "notes", value);
                      }}
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

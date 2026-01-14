import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Messages({ data }) {
    const navigate = useNavigate()
    const goToProfileDetail = (id) => {
        navigate(`/profile/${id}`)
    }

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
              <td>{row.insurance}</td>
              <td className="text-end">
                <button
                  className="btn btn-outline-secondary btn-sm"
                onClick={() => goToProfileDetail(row.id)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Messages;

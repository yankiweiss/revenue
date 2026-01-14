import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({data}) {
  const navigate = useNavigate();
  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    navigate(value);
  };
  const [selected, setSelected] = useState("");

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary d-flex justify-content-center gap-3">
        <section>
          <select
            className="form-select"
            value={selected}
            onChange={handleChange}
          >
            <option value="/Table">Patient Profiles</option>
            <option value="/UploadExcel">Upload Excel:</option>
          </select>
        </section>

        <section>
          <button
            type="button"
            className="btn btn-light btn-outline-dark"
           onClick={() => navigate('/Messages')}
          >
            Messages  <span style={{color: 'red'}}>  {data.length}</span>
          </button>
        </section>
      </nav>
    </>
  );
}

export default Navbar;

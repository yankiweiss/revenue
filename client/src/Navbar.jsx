import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  const [selected, setSelected] = useState("/Table");

  useEffect(() => {
    navigate(selected);
  }, [navigate, selected]);

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
          <button type="button" className="btn btn-secondary">
            Messages
          </button>
        </section>
      </nav>
    </>
  );
}

export default Navbar;

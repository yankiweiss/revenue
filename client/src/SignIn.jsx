import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function SignIn({ onLoginSuccess, onSignUpPressed }) {
  const [res, setRes] = useState(null);

  const handleForm = async (event) => {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let formObjectData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://revenue-two.vercel.app/api/register/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObjectData),
      });

      const data = await response.json();

      if (!response.ok) {
        setRes(data.message || "Login Failed!");
        return;
      }

      setRes(data.message);

      onLoginSuccess();

      event.target.reset();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <>
    <div style={{marginTop: '100px'}}>
     <h1 style={{textAlign: 'center'}}>Welcome Back!</h1>
     <p style={{textAlign: 'center'}}>Don't have an account? <span>Click new account now,</span></p>
     </div>
    
      <form
        className="d-flex flex-column align-items-center"
        onSubmit={handleForm}
        style={{ marginTop: "50px" }}
      >
        <div className="mb-3 w-25">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            autoFocus
            name="user"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3 w-25">
          <label htmlFor="pwd" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="pwd"
          />
          <div id="passHelp" className="form-text">
            Please Remember your Password.
          </div>
        </div>

        <div className="d-flex justify-content-between w-25">
          <button type="submit" className="btn btn-primary" >
            Sign In
          </button>
         
        </div>
      </form>
      {res && <h4 style={{ color: "navy", textAlign: "center" }}>{res}</h4>}

      {/* need to set time out */}
    </>
  );
}

export default SignIn;

import { useState } from "react";
import SignIn from "./SignIn";

function SignUp() {
  const [res, setRes] = useState(null);
  const [view, setView] = useState("signup");

  const handleSignUp = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObjectData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObjectData),
      });

      const data = await response.json();

      if (!response.ok) {
        setRes(data.message || "Login Failed!");
        event.target.reset();
        return;
      }

      setRes(data.message);

      event.target.reset();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  if (view === "signin") {
    return <SignIn />;
  }

  return (
    <>
      <h1 style={{textAlign: 'center'}}>Create Account:</h1>
      <form
        className="d-flex flex-column align-items-center"
        onSubmit={handleSignUp}
        style={{ marginTop: "100px" }}
      >
        <div className="mb-3 w-20">
          <div className="d-flex justify-content-center gap-4">
            <div>
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                aria-describedby="emailHelp"
                autoFocus
                name="fullName"
              />
            </div>

            <div>
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                name="email"
              />
            </div>
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

        {res && <h4 style={{ color: "navy", textAlign: "center" }}>{res}</h4>}

        <div className="d-flex justify-content-between w-25">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>

          <button onClick={() => setView("signin")} className="btn btn-primary">
            Back To Sign In
          </button>
        </div>
      </form>
    </>
  );
}

export default SignUp;

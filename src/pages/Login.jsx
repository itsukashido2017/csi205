import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { verifyUser } from "../data/users";
import { useRef } from "react";

function Login({ setToken, setRole }) {
  const userRef = useRef();
  const passRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login-container">
        <h1 className="text-center mb-4 topic">Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control
          type="text"
          id="username"
          placeholder="user"
          ref={userRef}
        />

        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          id="password"
          placeholder="pass"
          ref={passRef}
        />
        <div className="d-flex justify-content-end mt-3">
          <button
            type="button"
            className="btn btn-danger mt-3 "
            onClick={() => {
              userRef.current.value = "";
              passRef.current.value = "";
              userRef.current.focus();
            }}
          >
            Clear
          </button>
          <Button
            type="submit"
            className="btn btn-success mt-3 ms-4"
            onClick={() => {
              const user = userRef.current.value.trim();
              const pass = passRef.current.value.trim();
              userRef.current.value = "";
              passRef.current.value = "";
              const userInfo = verifyUser(user, pass);
              if (userInfo === null) {
                alert("Wrong username or password");
                userRef.current.focus();
              } else {
                setToken(userInfo.token);
                setRole(userInfo.role);
              }
            }}
          >
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;

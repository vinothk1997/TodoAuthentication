import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
const Login = ({ login }) => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState({ email: "", password: "" });
  const [iserror, setIsError] = useState(false);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setLoggedUser({ ...loggedUser, [name]: value });
    console.log(loggedUser);
  }

  function handleLogin() {
    if (login(loggedUser)) {
      setIsError(false);
      navigate("/home");
    } else {
      setIsError(true);
      navigate("/Login");
    }
  }
  return (
    <Container>
      <h2>Login </h2>
      <Form.Label htmlFor="email"> Email</Form.Label>
      <Form.Control
        type="email"
        name="email"
        onChange={(e) => handleInputChange(e)}
      />
      <Form.Label htmlFor="password">Password</Form.Label>
      <Form.Control
        type="password"
        name="password"
        onChange={(e) => handleInputChange(e)}
      />
      <div>
        <p className="text-danger">{iserror ? "Invalid Credentials" : ""}</p>
      </div>
      <Button variant="primary" onClick={handleLogin}>
        Login
      </Button>{" "}
    </Container>
  );
};
export default Login;

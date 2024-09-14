import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Register = ({ handleAddUsers,isDublicate }) => {
  const userData = { email: "", password: "", name: "" };
  const [user, setUser] = useState(userData);
  const navigate = useNavigate();

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }
  function handleRegisterUser() {
    if(handleAddUsers(user)){
      navigate('/register');
    }
    else{
      setUser(userData);
      navigate('/login')
    }
  }
  return (
    <>
      <Container>
        <h2>Register </h2>
        <Form.Label htmlFor="email"> Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          onChange={(e) => handleInputChange(e)}
          value={user.email}
        />
        <p className="text-danger">{isDublicate?"this email is already in use":""}</p>
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          onChange={(e) => handleInputChange(e)}
          value={user.password}
        />
        <Form.Label htmlFor="name">Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          onChange={(e) => handleInputChange(e)}
          value={user.name}
        />
        <Button variant="primary" onClick={handleRegisterUser}>
          Register
        </Button>{" "}
      </Container>
    </>
  );
};

export default Register;

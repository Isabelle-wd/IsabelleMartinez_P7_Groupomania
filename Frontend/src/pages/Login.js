import React, { useState } from "react";
import {Form, Button} from "react-bootstrap";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  const login = () => {
    const data = { 
        email: email, 
        password: password 
    };

    axios.post("http://localhost:3001/auth/login", data)
        .then((response) => {
        console.log(response.data);
    });
  };

  return (
    <div className="loginContainer">     
      <Form className="ms-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" style={{ width: "600px" }} size="lg" controlId="email">
          <Form.Label>Adresse email :</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" style={{ width: "600px" }} size="lg" controlId="password">
          <Form.Label>Mot de passe :</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block type="submit" onClick={login} disabled={!validateForm()}>
          Je me connecte
        </Button>
      </Form>
    </div>
  );
}
export default Login;
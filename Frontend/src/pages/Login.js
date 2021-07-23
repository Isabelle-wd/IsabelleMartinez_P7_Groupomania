import React, { useState } from "react";
import {Form, Button} from "react-bootstrap";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const Login = () => {
    const data = { 
        username: username, 
        password: password };
    axios.post("http://localhost:3001/auth/login", data)
        .then((response) => {
        console.log(response.data);
    });
  };
  return (
    <div className="loginContainer">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> VOtre identifiant</Form.Label>
            <Form.Control 
                type="text"
                onChange={(event) => {
                setUsername(event.target.value);
              }} 
            />
          </Form.Group>         
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password" 
                onChange={(event) => {
                    setPassword(event.target.value);
                  }} />
          </Form.Group>            
          <Button variant="primary" type="submit">
            Je me connecte
          </Button>
        </Form>
    </div>
  );
}
export default Login;
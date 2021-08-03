import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Form, Button, Col} from "react-bootstrap";
import axios from "axios";
// import { useHistory } from "react-router-dom";
// import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

//  let history = useHistory();

  const login = () => {
    const data = { 
      email: email, 
      password: password 
    };

    axios.post("http://localhost:3001/auth/login", data,)
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error); 
          } else {
            localStorage.setItem("accessToken", response.data.token);
          }


         /*               
              setAuthState({
                username: response.data.username,
                id: response.data.id,
                status: true,
            });
            history.push("/");
          }   */        
        });
  };

  return (
    <div className="loginContainer">     
      <Form className="ms-3" onSubmit={handleSubmit}>
      <h3 className="my-5"><u>Connexion</u></h3>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Adresse email :</Form.Label>
            <Col sm={5}>
              <Form.Control
                autoFocus
                placeholder="@groupomania.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Mot de passe :</Form.Label>
            <Col sm={5}>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
        </Form.Group>
        <Button block type="submit" className="btn btn-dark btn-lg btn-block" onClick={login} disabled={!validateForm()}>
          Je me connecte
        </Button>
      </Form>
    </div>
  );
}
export default Login;
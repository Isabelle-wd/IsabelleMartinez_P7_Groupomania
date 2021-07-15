import React from 'react';
import './App.css';
import { Navbar, Container, Form, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <Navbar.Brand href="#">Groupomania</Navbar.Brand>
        </Container>
      </Navbar>
      <Form style={{ width: '500px' }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Adresse Mail : </Form.Label>
          <Form.Control type="email" placeholder="Entrez votre adresse mail" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mot de passe : </Form.Label>
          <Form.Control type="password" placeholder="Entrez votre mot de passe" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;

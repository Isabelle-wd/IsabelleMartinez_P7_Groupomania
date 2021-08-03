import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Navbar, Nav, Container} from "react-bootstrap";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Layout } from "./components/Layout";



function App() {
  
  return (
    <div className="App">
      <Layout>
        <Router>
          <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand href="/">Groupomania</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/">Publications</Nav.Link>
                  <Nav.Link href="/CreatePost">Créer une publication</Nav.Link>
                  <Nav.Link href="/login">Se connecter</Nav.Link>
                  <Nav.Link href="/signup">S'inscrire</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <br />
    
            <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/CreatePost" component={CreatePost}/>
            <Route path="/Post/:id" component={Post}/>
            <Route path="/Signup" component={Signup}/>
            <Route path="/Login" component={Login}/>
          </Switch> 
        </Router>
      </Layout>
      
     
      
    </div>
  );
}
export default App;


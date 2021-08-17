import "./App.css";
import React, { useState, useEffect } from "react";
import {Navbar, Nav} from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { NoMatch } from "./pages/NoMatch";
import { Layout } from "./components/Layout";
import { AuthContext } from "./helpers/AuthContext";

function App() { 
  const [authState, setAuthState] = useState({
    email:"", 
    id: 0, 
    status: false,
  });

  useEffect(() => {
    axios.get(
      "http://localhost:3001/auth/auth", {
          headers: { Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            email: response.data.email,
            id: response.data.id,
            status: true,
          });
        }
      });
      // eslint-disable-next-line
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ email: "", id: 0, status: false });
  };

  
    return (
      <div className="App">
        <AuthContext.Provider value={{ authState, setAuthState }}>          
          <Layout>
            <Router>              
              <Navbar expand="lg" bg="dark" variant="dark" fixed="top" className="mb-3">
                    <Navbar.Brand className="ms-3" href="/">
                      <img
                        alt="logo groupomania"
                        src= "/images/icon.svg"
                        width= "50"
                        height= "50"
                        className="d-inline-block align-top"
              />{' '}
                      Groupomania</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end mx-3">
                    <Nav>
                      <Nav.Link href="/CreatePost">Créer une publication</Nav.Link>
                      {!authState.status ? (
                      <>
                      <Nav.Link href="/login">Connexion</Nav.Link>
                      <Nav.Link href="/signup">Inscription</Nav.Link>
                      </>
                      ) : (
                        <button className ="btn btn-link mb-2" onClick={logout}> Déconnexion </button>
                      )}
                    <p class="text-white mt-2">{authState.email}</p>  
                    </Nav>
                  </Navbar.Collapse>
              </Navbar>
   
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/CreatePost" component={CreatePost}/>
                <Route path="/Post/:id" component={Post}/>
                <Route path="/Signup" component={Signup}/>
                <Route path="/Login" component={Login}/>
                <Route component={NoMatch}/>
              </Switch> 
            </Router>
          </Layout>  
        </AuthContext.Provider>    
      </div>
    );
  }

export default App;


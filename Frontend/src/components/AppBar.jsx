import "../App.css";
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import {Container, Navbar, Nav} from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";

import { AuthContext } from "../helpers/AuthContext";

function AppBar() { 
    const [authState, setAuthState] = useState({
      username:"", 
      id: 0, 
      status: false,
    });
   
    const location = useLocation();

    React.useEffect(() => {
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
              username: response.data.username,
              id: response.data.id,
              status: true,
            });
          }
        });
    }, [location]);

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
                username: response.data.username,
                id: response.data.id,
                status: true,
              });
            }
          });
          // eslint-disable-next-line
      }, []);

      const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({ 
          username: "", 
          id: 0, 
          status: false });
      };

      return (
        <Navbar bg="myColor" expand="md" sticky="top" >           
        <Container>
          <Navbar.Brand href="/">
            <img
              alt="logo"
              src= "/images/icon-left-font-monochrome-white.svg"                       
              width="350"
              className="icon-logo"           
            />
          </Navbar.Brand>
          <AuthContext.Provider value={{ authState, setAuthState }}>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav>
              {!authState.status ? (
                <>
                  <Nav.Link className="nav-item" href="/">Accueil</Nav.Link>
                  <Nav.Link className="nav-item" href="/login">Connexion</Nav.Link>
                  <Nav.Link className="nav-item" href="/signup">Inscription</Nav.Link>
                </>
                ) : ( 
                <>
                  <Nav.Link href="/basicinfo/:id" className="me-5 d-flex">
                    <Avatar alt="photo utilisateur" src="images/profile_pic.png" className="me-2"></Avatar>
                    <Navbar.Text className="nav-item">{authState.username}</Navbar.Text>
                  </Nav.Link>
                  <Nav.Link                     
                    className="me-3 mt-2 nav-item"
                    href="/createPost"
                  >
                    <i className="fas fa-plus-square"></i>
                  </Nav.Link>             
                </>
                )}
                {authState.status &&
                <Nav.Link 
                  href="/" 
                  onClick={logout} 
                  className="mt-2 nav-item">
                    Déconnexion
                </Nav.Link>
                }
              </Nav>
            </Navbar.Collapse>
          </AuthContext.Provider>
        </Container>        
      </Navbar>
      
    );
  }
      
      export default AppBar;
    


  

  

  

  
    




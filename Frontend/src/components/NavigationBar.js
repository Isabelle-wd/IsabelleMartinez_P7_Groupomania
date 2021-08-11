import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
    .navbar {
        background-color: #222;
    }
   
    .navbar-brand, .navbar-nav .nav-link {
        color: #bbb;

        &:hover {
            color: white;
        }
    }
`;

export const NavigationBar = () => (
    <Styles>
        <Navbar expand="lg" variant="dark" fixed="top">
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
                  <Nav.Link href="/login">Se connecter</Nav.Link>
                  <Nav.Link href="/signup">S'inscrire</Nav.Link>
                </Nav>
              </Navbar.Collapse>
          </Navbar>
    </Styles>
)
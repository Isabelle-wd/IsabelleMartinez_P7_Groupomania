import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const header = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Groupomania</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link>Accueil</Nav.Link>
                    <Nav.Link>Créer une publication</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>    
    )
}

export default header;
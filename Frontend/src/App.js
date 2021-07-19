import React from 'react';
import {Card, Container} from "react-bootstrap";
import './App.css';
//import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./pages/Header";
//import Home from "./pages/Home";
//import CreatePost from "./pages/CreatePost";

import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);
  return (
    <div className="App"> 
      {listOfPosts.map((value, key) => {
        return (
          
          <Container className="position-relative">
            <Card className="mb-3" style={{ width: '500px' }}>     
              <Card.Header className="text-center" as="h6">{value.title}</Card.Header>     
              <Card.Body>
                <Card.Img variant="top" src={value.url} />
                <Card.Text>{value.content}</Card.Text>
                <cite title="username">{value.username}</cite>
              </Card.Body>
              <Card.Footer className="text-muted">
                <Card.Link href="#">Commenter</Card.Link>
              </Card.Footer>             
            </Card>
          </Container>

          
        );


    })}
      
     
      
    </div>
  )
}
export default App;


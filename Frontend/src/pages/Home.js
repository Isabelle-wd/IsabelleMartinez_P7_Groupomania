import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {Card, Container} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"; // Facilite les requêtes API



function Home() {

    const [listOfPosts, setListOfPosts] = useState([]);
    let history = useHistory()

    useEffect(() => {
        axios.get("http://localhost:3001/posts",
        {
          headers: {
            "Authorization" : "Bearer " + localStorage.getItem("token")
          },
        })
            .then((response) => {setListOfPosts(response.data)})
            .catch(error => {
              console.error(error);
            })
    }, []);

    return (
        <div className="">
            {listOfPosts.map((value, key) => {
        return (
          
          <Container className="position-relative post" onClick={() => {history.push(`/post/${value.id}`)}}>
            <Card className="mb-3" style={{ width: '600px' }}>     
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

export default Home;
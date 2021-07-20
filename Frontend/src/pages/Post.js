import React from "react";
import {Card, Container} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Facilite les requêtes API

function Post() {
    let {id} = useParams();
    const [postObject,setPostObject] = useState({})


    useEffect(() => {
        axios.get(`http://localhost:3001/posts/getOnePost/${id}`)
            .then((response) => {
                setPostObject(response.data);
            });
    })
    return (
        <div className="postPage">
            <Container>
            <Card className="mb-3">    
              <Card.Img variant="top" src={postObject.url} /> 
              <Card.Body>
                <Card.Title as="h6">{postObject.title}</Card.Title> 
                <Card.Text>{postObject.content}</Card.Text>
                <cite title="username">{postObject.username}</cite>
              </Card.Body>
              <Card.Footer className="text-muted">
                <Card.Link href="#">Commenter</Card.Link>
              </Card.Footer>             
            </Card>
            </Container>
            <div className="Comments"> Commentaires :

        </div>
            
        </div>

        
        )    
}

export default Post;
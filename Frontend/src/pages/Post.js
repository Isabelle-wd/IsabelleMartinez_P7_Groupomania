import React from "react";
import {Card, Container, Form, Button} from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios"; // Facilite les requêtes API
//import { AuthContext } from "../helpers/AuthContext";

function Post() {
    let {id} = useParams();
    const [postObject,setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
//    const { authState } = useContext(AuthContext);

//    let history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/getOnePost/${id}`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
        })
            .then((response) => {
              setPostObject(response.data);
            });
        axios.get(`http://localhost:3001/comments/${id}`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
        })
          .then((response) => {
            setComments(response.data);
        });    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addComment = (e) => {
      e.preventDefault();
      axios.post("http://localhost:3001/comments", {
        message: newComment, 
        PostId: id
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } 
      }
      )
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
          const commentToAdd = { 
            message: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
        });
    };

    return (
      <div className="postPage">
          <Container>
            <Card className="mb-3" style={{ width: "600px" }}>    
              <Card.Img variant="top" src={postObject.url} /> 
              <Card.Body>
                <Card.Title as="h6">{postObject.title}</Card.Title> 
                <Card.Text>{postObject.content}</Card.Text>
                <cite title="username">{postObject.username}</cite>
              </Card.Body>               
            </Card>
          </Container>

          <Container>
          <div className="Comments">
            <form className="addComment">
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control 
                  as="textarea" 
                  placeholder="Votre commentaire" 
                  value= {newComment}
                  rows={2} style={{ width: "600px" }} 
                  onChange={(event) => {setNewComment(event.target.value)}}/>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={addComment}>Ajouter</Button>  
            </form>
          </div>
          </Container>

          <div className="listOfComments">
            {comments.map((comment, key) => {
              return (
                <Card className="mt-3" style={{ width: "600px" }}>
                <Card.Body>
                  <Card.Title> {comment.username} </Card.Title>
                  <Card.Text key={key} className="comment"> {comment.message}</Card.Text>  
                </Card.Body>
                </Card>
              )
            })}
          </div>      
      </div>        
    )    
}

export default Post;
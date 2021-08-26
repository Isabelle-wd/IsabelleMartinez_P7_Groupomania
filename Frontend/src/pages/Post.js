import React from "react";
import {Card, Container, Form, Button} from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios"; // Facilite les requêtes API
import { AuthContext } from "../helpers/AuthContext";
import { DeleteOutlined } from '@material-ui/icons';

function Post() {
    let {id} = useParams();
    const [postObject,setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { authState } = useContext(AuthContext);

    let history = useHistory();

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

    const deleteComment = (id) => {
      axios.delete(`http://localhost:3001/comments/${id}`, {       
          headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
        })
        .then(() => {
          setComments(
            comments.filter((val) => {
              return val.id !== id
            })
          );
        });
    };
  
    const deletePost = (id) => {
      axios.delete(`http://localhost:3001/posts/${id}`, {        
          headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
        })
        .then(() => {
          history.push("/");
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
                <footer>
                  {postObject.userId}
                  {authState.username === postObject.username && (
                  <Button 
                    variant="danger"
                    onClick={() => {
                      deletePost(postObject.id);
                    }}
                  >
                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                  </Button> 
                  )}
                </footer>
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
                  rows={2} 
                  style={{ width: "600px" }} 
                  onChange={(event) => {
                    setNewComment(event.target.value)
                  }}
                />
              </Form.Group>
              <Button 
                variant="primary" 
                type="submit" 
                onClick={addComment}
              >Ajouter
              </Button>  
            </form>
          </div>
          </Container>

          <div className="listOfComments">
            {comments.map((comment, key) => {
              return (
                <Card className="mt-3" style={{ width: "600px" }}>
                <Card.Body>
                  <Card.Title> {comment.userId} </Card.Title>
                  <Card.Text key={key} className="comment"> {comment.message}</Card.Text>  
                    {authState.username === comment.username && (
                      <button 
                        onClick={deleteComment} 
                        type="button" 
                        className="btn btn-default btn-lg">
                        <DeleteOutlined />
                      </button>
                  )}
                </Card.Body>
                </Card>
              )
            })}
          </div>      
      </div>        
    )    
}

export default Post;
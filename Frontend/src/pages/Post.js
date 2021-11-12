import React from "react";
import { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios"; // Facilite les requêtes API
import { AuthContext } from "../helpers/AuthContext";
import {Card, Container, Form, Button} from "react-bootstrap";
import { DeleteOutlined } from "@material-ui/icons";

function Post() {
    let {id} = useParams();
    const [postObject,setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [authState, setAuthState] = useContext(AuthContext);

    let history = useHistory();

    useEffect(() => {
        axios
          .get(`http://localhost:3001/posts/getOnePost/${id}`,
            {
              headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
            })
          .then((response) => {
            setPostObject(response.data);
          });

        axios
          .get(`http://localhost:3001/comments/${id}`,
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
      axios
        .post("http://localhost:3001/comments", 
          {
            message: newComment, 
            PostId: id,
          },
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } 
          }
        )
        .then((response) => {
          if (response.data.error) 
            {
              console.log(response.data.error);
            } 
          else {
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
      axios
        .delete(`http://localhost:3001/comments/${id}`, 
          {       
            headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
          })
        .then(() => {
          setComments(
            comments.filter((val) => {
              return val.id !== id;
            })
          );
        });
    };
  
    const deletePost = (id) => {
      axios
        .delete(`http://localhost:3001/posts/${id}`, 
          {        
            headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
          })
        .then(() => 
          {
            history.push("/");
          });
    };

    return (
      <div className="postPage">
          <Container>
            <Card className="mb-3" style={{ width: "500px" }}>    
              <Card.Img variant="top" src={postObject.url} /> 
              <Card.Body>
                <Card.Title as="h6">{postObject.title}</Card.Title> 
                <Card.Text>{postObject.content}</Card.Text>
                <Card.Footer>                                       
                             
               {/*  {postObject.UserId}  */}         
                  {authState.id === postObject.UserId && (
                  <button 
                    className="btn btn-default btn-lg"
                    onClick={() => {
                      deletePost(postObject.id);
                    }}
                  >
                    {" "}
                    <DeleteOutlined fontSize="small" />
                  </button> 
                  )}
                </Card.Footer>
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
                    <Card.Text 
                      key={key} 
                      className="comment"
                    > 
                      {comment.message}
                    </Card.Text>  
                      {/* {authState.id === comment.UserId && ( */}
                        <button 
                          onClick={() => {
                            deleteComment(comment.id);
                          }}
                          type="button" 
                          className="btn btn-default btn-lg">
                          <DeleteOutlined fontSize="small" />
                        </button>
                   {/*  )} */}
                  </Card.Body>
                </Card>
              )
            })}
          </div>      
      </div>        
    )    
}

export default Post;
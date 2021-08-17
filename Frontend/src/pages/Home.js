import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {Card, Container} from "react-bootstrap";
import Heart from "react-animated-heart";
import axios from "axios"; // Facilite les requêtes API


function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [isClick, setClick] = useState(false);
    //const [likedPosts, setLikedPosts] = useState([]);
    let history = useHistory()

    useEffect(() => {
      if (!localStorage.getItem("accessToken")) {
        history.push("/login");
      } else {
          axios.get(
            "http://localhost:3001/posts",{        
            headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
        })
            .then((response) => {
              setListOfPosts(response.data);            
            })
            }
            // eslint-disable-next-line
    }, []);

    const likePost = (postId) => {
      axios.post(
        "http://localhost:3001/likes", 
        { PostId: postId },
        { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
        })
        .then((response) => {
       /*    setListOfPosts(
            listOfPosts.map((post) => {
              if (post.id === postId) {
                if (response.data.liked){
                  return {...post, Likes: [...post.Likes, 0]};
                } else {
                  const likesArray = post.Likes;
                  likesArray.pop();
                  return {...post, Likes: likesArray };
                }
              } else {
                return post;
              }
            })
          )
          if (likedPosts.includes(postId)) {
            setLikedPosts(
              likedPosts.filter((id) => {
                return id != postId;
              })
            );
          } else {
            setLikedPosts([...likedPosts, postId]);
          } */
        }
      )
    };

    return (
      <div>
        {listOfPosts
          ? listOfPosts.map((value, key) => {
            return (              
              <Container key={key} className="position-relative post">
                <Card className="mb-3" style={{ width: '600px' }}>     
                  <Card.Header className="text-center" as="h6">{value.title}</Card.Header>     
                  <Card.Body onClick={() => {history.push(`/post/${value.id}`)}}>
                    <Card.Img variant="top" src={value.url} />
                    <Card.Text>{value.content}</Card.Text>
                    <cite title="username">{value.username}</cite>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    <Card.Link href="#">Commenter</Card.Link>
                    <Heart 
                      isClick={isClick} 
                      onClick={() => setClick(!isClick)} />
                    <label> {value.Likes.length} </label>
                  </Card.Footer>             
                </Card>
              </Container>
            );
          })
        : "loading..."}     
      </div>
    )
}
export default Home;
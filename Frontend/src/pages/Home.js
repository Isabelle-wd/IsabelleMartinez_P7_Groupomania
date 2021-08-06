import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {Card, Container} from "react-bootstrap";
import axios from "axios"; // Facilite les requêtes API



function Home() {

    const [listOfPosts, setListOfPosts] = useState([]);
    let history = useHistory()

    useEffect(() => {
      if (!localStorage.getItem("accessToken")) {
        history.push("/login");
      } else {
          axios.get("http://localhost:3001/posts",{        
            headers: { accessToken: localStorage.getItem("accessToken") },
        })
            .then((response) => {
              setListOfPosts(response.data.listOfPosts);            
            })
            }
            // eslint-disable-next-line
    }, []);

    return (
      <div>
        {listOfPosts && listOfPosts.length > 0
          ? listOfPosts.map((value, key) => {
            return (              
              <Container key={key} className="position-relative post" 
                onClick={() => {history.push(`/post/${value.id}`)}}>
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
          })
        : "loading..."}     
      </div>
    )
}
export default Home;
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {Image, Card, Button} from "react-bootstrap";

function Profile() {
  
  let history = useHistory();
  const [user, setUser] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/auth/basicinfo`, {        
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    
    // eslint-disable-next-line
  }, []);

  const deleteProfile = (id) => {
    axios
      .delete(`http://localhost:3001/auth/basicinfo/${id}`, 
        {        
          headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
        })
      .then(() => 
        {
          history.push("/");
        });
  };



   return (
    <div className="profilePageContainer mt-3 ml-2 d-flex justify-content-center">
      <Card className="text-center pt-2" border="danger" style={{ width: "25rem" }}>
        <div className="basicInfo">
          {" "}
          <Image src={user && user.image} alt="Photo de profil" width="150" height="150" rounded />
          <Card.Title className="mt-2"> {user && user.fullName} </Card.Title>
          <Card.Body>
            <Card.Text> {user && user.username} </Card.Text>
            <Card.Text> {user && user.email} </Card.Text>
            <Card.Text> {user && user.bio} </Card.Text>            
              <Button 
                onClick={() => {
                  deleteProfile(user.id);
                }}
                variant="danger" 
                size="sm" 
              >Supprimer
              </Button>            
          </Card.Body>
        </div>
      </Card>
    </div>
  );
}

export default Profile;

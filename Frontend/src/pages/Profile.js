import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import {Image} from "react-bootstrap";

function Profile() {
  let { id } = useParams();
  let history = useHistory();
  const [user, setUser] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);

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

    axios.get(`http://localhost:3001/posts/getUserPosts/${id}`, {        
      headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
    })
      .then((response) => {
        setListOfPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line
  }, []);

   return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        {" "}
        <Image src={user && user.image} rounded />
        <h1> Pseudo: {user && user.username} </h1>
        <h1> Email: {user && user.email} </h1>
        <h1> Nom: {user && user.fullName} </h1>
        <h1> Bio: {user && user.bio}</h1>
      </div>

      <div className="listOfPosts">
        {listOfPosts.map((value, key) => {
          return (
            <div key={key} className="post">
              <div className="title"> {value.title} </div>
              <div
                className="body"
                onClick={() => {
                  history.push(`/post/${value.id}`);
                }}
              >
                {value.postText}
              </div>
              <div className="footer">
                <div className="username">{value.username}</div>
                <div className="buttons">
                  <label> {value.Likes.length}</label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;

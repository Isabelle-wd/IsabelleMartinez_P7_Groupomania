import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

function Profile() {
  let { id } = useParams();
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/auth/basicinfo/${id}`
  )
      .then((response) => {
        setUsername(response.data);
        setFullName(response.data);
        setBio(response.data);
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
        <h1> Username: {username} </h1>
        <h2> Full Name: {fullName} </h2>
        <div> Bio: {bio} </div>
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

export default Profile

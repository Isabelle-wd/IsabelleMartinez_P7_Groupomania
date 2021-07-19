import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";


function Home() {

    const [listOfPosts, setListOfPosts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/posts")
            .then((response) => {setListOfPosts(response.data)
            /* .catch((error) => ("erreur")) */;
        });
    }, []);

    return (
        <div className="">
            {listOfPosts.map((value, key) => { 
                return (
                   <div className="post">
                   <div className="title"> {value.postTitle} </div>
                   <div className="content"> {value.postContent} </div>
                   <div className="url"> {value.postURL} </div>
                   <div className="username"> {value.username} </div>
                  </div> 
                );
            })}
        </div>
    )
}

export default Home;
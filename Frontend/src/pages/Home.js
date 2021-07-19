import React from "react";
import axios from "axios"; // Facilite les requêtes API
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
                   <div className="title"> {value.title} </div>
                   <div className="content"> {value.content} </div>
                   <div className="url"> {value.url} </div>
                   <div className="username"> {value.username} </div>
                  </div> 
                );
            })}
        </div>
    )
}

export default Home;
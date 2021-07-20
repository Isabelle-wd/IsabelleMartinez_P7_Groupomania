import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Facilite les requêtes API

function Post() {
    let {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/getOnePost/${id}`)
            .then((response) => {});
    })
    return 
        <div>{id}</div>

        
    
}

export default Post;
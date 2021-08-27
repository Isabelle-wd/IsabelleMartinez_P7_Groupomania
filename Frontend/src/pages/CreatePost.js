import React, { useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Button, TextField, makeStyles, Container, IconButton, Typography} from '@material-ui/core';
import { PhotoCamera } from "@material-ui/icons";
import SendIcon from '@material-ui/icons/Send';


const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
    backgroundColor: "white",
    minWidth: 345,
  }
});

function  CreatePost() {
  const classes = useStyles();
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [url, setUrl] = useState("")
  const [titleError, setTitleError] = useState(false)
  const [contentError, setContentError] = useState(false)

  const handleSubmit = (e) => {
    console.log("info")
    e.preventDefault()
    setTitleError(false)
    setContentError(false)

    if (title === "") {
      setTitleError(true)
    }

    if (content === "") {
      setContentError(true)
    }

    if (title && content) {
      axios.post("http://localhost:3001/posts",{
        title: title,
        content: content,
        url: url,
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } 
      }
      )
      .then(() => {
        history.push("/");
})
    }
  }
  
  let history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    }
        // eslint-disable-next-line
  }, []);

 
        
/* 
    const onSubmit: (data) => {
            axios.post("http://localhost:3001/posts", data,
		)
            .then(() => {
                history.push("/");
        })},
    }); */

  return (
     <Container> 
          <Typography 
            className={classes.title}
            variant="h6"
            component="h2"
            gutterBottom>
              Publication :
          </Typography>

          <form noValidate onSubmit={(e) =>{handleSubmit(e)}}>
              <TextField 
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                className={classes.field} 
                label="Titre" 
                variant="outlined" 
                fullWidth
                required
                error={titleError}

              />
              <TextField
                onChange={(e) => setContent(e.target.value)} 
                id="content"
                className={classes.field}
                label="Quoi de neuf?"
                variant="outlined" 
                multiline  
                rows={5}            
                fullWidth
                required                          
                error={contentError}             
              />
              <div>
                <input
                  accept="image/*"
                  style={{ display: "none", }}
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <IconButton  
                    color="secondary" 
                    aria-label="upload picture" 
                    component="span">
                    <PhotoCamera fontSize="large" />
                  </IconButton>
                </label>
              </div>
              <Button 
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                endIcon={ <SendIcon />}                                               
                >Publier                
              </Button>
          </form>
    </Container>
  );
}

export default CreatePost;
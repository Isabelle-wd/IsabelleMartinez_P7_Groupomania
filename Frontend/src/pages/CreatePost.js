import React, { useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik"; 
import * as Yup from "yup"; // Validation des formulaires
import axios from "axios";
import { Button, CssBaseline, TextField, makeStyles, Container, IconButton, Icon, Typography} from '@material-ui/core';
import { PhotoCamera } from "@material-ui/icons";
import SendIcon from '@material-ui/icons/Send';
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
     
      form: {
        width: "100%", 
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
      root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
      input: {
        display: 'none',
      },
      button: {
        margin: theme.spacing(1),
      },
    }));

function  CreatePost() {
   const classes = useStyles();
   let history = useHistory();

   useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
          history.push("/login");
        }
        // eslint-disable-next-line
      }, []);

   const validationSchema = Yup.object().shape({
        title: Yup.string().required("N'oubliez pas de mettre un titre à votre publication!!"),
        content: Yup.string().required(),
        url: Yup.mixed(),
    });

    const formik = useFormik({
        initialValues: {
            title:"",
            content:"",
            url: null, 
        },  
        
        validationSchema: validationSchema,
        onSubmit: (data) => {
            axios.post("http://localhost:3001/auth", data,
		)
            .then(() => {
                history.push("/");
        })},
    });

return (
   <Container component="main" maxWidth="xs">
        <CssBaseline />
    <div className={classes.paper} onSubmit={formik.handleSubmit}>
    <form className={classes.form} noValidate>
        <Typography gutterBottom component="h1" variant="h5">
            Quoi de neuf?
        </Typography>
          
        <Grid container spacing={2}>            
          <Grid item xs={12}>
            <TextField 
               id="outlined-basic" 
               label="Titre" 
               variant="outlined" 
               size="small"
               fullWidth
               onChange={formik.handleChange}
               />
          </Grid>
          <Grid item xs={12}>
            <TextField
               id="outlined-textarea"
               label="Votre message"
               multiline              
               fullWidth
               variant="outlined"
               onChange={formik.handleChange}               
             />
          </Grid>
        </Grid>       
        <div className={classes.root}>
        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton size="large" color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        SendIcon={<Icon></Icon>}
      >Envoyer
        <SendIcon />
      </Button>
      </label>
      
    </div>
    </form>
  </div>
</Container>
    );
}

export default CreatePost;
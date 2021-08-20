import React, { useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik"; 
import * as Yup from "yup"; // Validation des formulaires
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { PhotoCamera } from "@material-ui/icons";
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
        <Fragment>
          <input
            color="primary"
            accept="image/*"
            type="file"
            id="icon-button-file"
            style={{ display: "none", }}
            onChange={formik.handleChange}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              variant="contained"
              component="span"
              className={classes.button}
              size="large"
              color="primary"              
            >
              <PhotoCamera fontSize="large" />
            </IconButton>
          </label>
        </Fragment>
    </form>
  </div>
</Container>
    );
}

export default CreatePost;
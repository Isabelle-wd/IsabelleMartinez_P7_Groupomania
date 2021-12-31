import React, { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik'; // Validation des formulaires
import * as Yup from "yup"; // Validation des données du formulaire
import axios from "axios";
import Loading from "../components/Loading"

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', 
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


function Signup() {
  const classes = useStyles();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  function onChangeImage(e) {
      setImage(e.target.files[0])
  }
    
  const validationSchema = Yup.object().shape({
    email: Yup
      .string()
      .email("Adresse email non valide")
      .required(),
    username: Yup
      .string()
      .min(3)
      .max(25)
      .required(),
    password: Yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      )
      .required(), 
    fullName: Yup
      .string()
      .max(25),
    bio: Yup
      .string()
      .max(200),        
    });

    let history = useHistory();

    const formik = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: "",
            fullName: "",
            bio: "",           
        },         
        validationSchema: validationSchema,
        onSubmit: (values) => {
          setLoading(true);
          let formData = new FormData();
          if (image) formData.append("image", image); 
          formData.append("email", values.email);
          formData.append("username", values.username);
          formData.append("fullName", values.fullName);
          formData.append("password", values.password);
          formData.append("bio", values.bio);
          axios
            .post("http://localhost:3001/auth", formData, {
              headers: { 
                "content-type": "multipart/form-data",
                Authorization: "Bearer " + localStorage.getItem("accessToken") },
            })
            .then(() => {
                history.push("/login")
            .catch((error) => {
              console.log(error)
            })
            .finally(()=>{
              setLoading(false)
          });
        })},
    });

    return (
      <>
      { loading ?
      <Loading />         
            :
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper} onSubmit={formik.handleSubmit}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            S'inscrire
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>       
            <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="fullName"
                  label="Prénom et nom de famille"
                  type="fullName"
                  id="fullName"         
                  value={formik.values.fullName}
                  onChange={formik.handleChange}           
                />
              </Grid>       
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Pseudo"
                  name="username"
                  autoComplete="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}                 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="@groupomania.com"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email} 
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}   
                />
              </Grid>      
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="bio"
                  label="Petite description"
                  type="text"
                  id="bio"       
                  value={formik.values.bio}
                  onChange={formik.handleChange}             
                />
              </Grid>      
              <Grid item xs={12}>
                <div>
                  <label htmlFor="image">Photo de profile :</label>
                    <input
                      id="image" 
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={onChangeImage}                
                    />
                </div>
              </Grid>      
            </Grid>
            <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={
          !formik.values.fullName ||
          !formik.values.username ||
          !formik.values.email ||
          !formik.values.bio
          
        }
      >
        Je m'inscrit
      </Button>               
          </form>
        </div>     
      </Container>
          }
          </>
    )
}
export default Signup;

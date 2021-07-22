import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Form} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {Formik } from "formik"; 
import * as Yup from "yup"; // Validation des formulaires
import axios from "axios";

function CreatePost() {
    let history = useHistory(); // Retour à la page d'accueil une fois la publication validée
    const initialValues = {
        title:"",
        content:"",
        url: null,
        username: "",
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("N'oubliez pas de mettre un titre à votre publication!!"),
        content: Yup.string().required(),
        url: Yup.mixed(),
        username: Yup.string().min(3).max(25).required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data)
            .then((response) => {
                history.push("/");
            });
        
    };

    


    return ( 
        <div className="createPostPage">
            <Formik 
                initialValues={initialValues} 
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
            {({
                handleSubmit, handleChange, values, errors
            }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="position-relative mb-3">
                       <Form.Label> Titre  </Form.Label>                     
                            <Form.Control
                                id="inputCreatePost"
                                name="title"
                                placeholder="(ex. titre)"
                                onChange={handleChange}
                                isInvalid={!!errors.title}
                            />
                    </Form.Group>

                    <Form.Group className="position-relative mb-3">    
                        <Form.Label> Quoi de neuf ? </Form.Label>                      
                            <Form.Control
                                as="textarea"
                                id="inputCreatePost"
                                name="content"
                                placeholder="Le contenu de votre publication ..."
                                onChange={handleChange}
                                isInvalid={!!errors.content}
                            />
                    </Form.Group>

                    <Form.Group className="position-relative mb-3">
                        <Form.Label> Identifiant : </Form.Label>                        
                            <Form.Control
                                id="inputCreatePost"
                                name="username"
                                placeholder="(ex. Isabelle123)"
                                value={values.username}
                                onChange={handleChange}
                                isInvalid={!!errors.username}
                            />    
                    </Form.Group>
                    
                    <Form.Group className="position-relative mb-3">
                            <Form.Label>Photo/Vidéo  </Form.Label>
                                <Form.Control
                                  id="inputCreatePost"
                                  type="file"
                                  name="url"
                                  onChange={handleChange}
                                  isInvalid={!!errors.url}
                                />   
                    </Form.Group>
                    
                        
                    <button type="submit"> Publier </button>
                </Form>
      )}
            </Formik>
      
        </div>
    );
}

export default CreatePost;
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Form, Button, Col} from "react-bootstrap";
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
                <Form className="ms-3" onSubmit={handleSubmit}>
                    <Form.Group className="position-relative mb-3" style={{ width: "600px" }}>
                       <Form.Label> Titre :</Form.Label>  
                       <Col sm={10}>                   
                            <Form.Control
                                id="inputCreatePost"
                                name="title"
                                placeholder="(ex. titre)"
                                onChange={handleChange}
                                isInvalid={!!errors.title}
                            />
                            </Col>
                    </Form.Group>

                    <Form.Group className="position-relative mb-3" style={{ width: "600px" }}>    
                        <Form.Label> Quoi de neuf ? :</Form.Label>   
                        <Col sm={10}>                  
                            <Form.Control
                                as="textarea"
                                id="inputCreatePost"
                                name="content"
                                placeholder="Le contenu de votre publication ..."
                                onChange={handleChange}
                                isInvalid={!!errors.content}
                            />
                            </Col> 
                    </Form.Group>

                    <Form.Group className="position-relative mb-3" style={{ width: "600px" }}>
                        <Form.Label> Identifiant : </Form.Label>    
                        <Col sm={10}>                    
                            <Form.Control
                                id="inputCreatePost"
                                name="username"
                                placeholder="(ex. Isabelle123)"
                                value={values.username}
                                onChange={handleChange}
                                isInvalid={!!errors.username}
                            />    
                            </Col>
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
                    
                        
                    <Button block type="submit" className="btn btn-dark btn-lg btn-block">Publier</Button>
                </Form>
      )}
            </Formik>
      
        </div>
    );
}

export default CreatePost;
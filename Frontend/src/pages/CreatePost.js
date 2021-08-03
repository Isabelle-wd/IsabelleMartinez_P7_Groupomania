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
                    <h3 className="my-5"><u>Quoi de neuf</u> ?</h3>
                    <Form.Group className="position-relative mb-3">
                       <Form.Label> Titre :</Form.Label>  
                            <Col sm={10}>                   
                                 <Form.Control
                                     id="inputCreatePost"
                                     name="title"
                                     placeholder='(ex. "Quote of the day")'
                                     onChange={handleChange}
                                     isInvalid={!!errors.title}
                                 />
                             </Col>
                    </Form.Group>

                    <Form.Group className="position-relative mb-3">    
                        <Form.Label> Contenu :</Form.Label>   
                            <Col sm={10}>                  
                                <Form.Control
                                    as="textarea"
                                    id="inputCreatePost"
                                    name="content"
                                    onChange={handleChange}
                                    isInvalid={!!errors.content}
                                />
                            </Col> 
                    </Form.Group>

                    <Form.Group className="position-relative mb-3">
                        <Form.Label> Identifiant : </Form.Label>    
                            <Col sm={10}>                    
                                <Form.Control
                                    id="inputCreatePost"
                                    name="username"
                                    placeholder="votre pseudo"
                                    value={values.username}
                                    onChange={handleChange}
                                    isInvalid={!!errors.username}
                                />    
                            </Col>
                    </Form.Group>
                    
                    <Form.Group className="position-relative mb-3">
                            <Form.Label>Photo/Vidéo :</Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                      id="inputCreatePost"
                                      type="file"
                                      name="url"
                                      onChange={handleChange}
                                      isInvalid={!!errors.url}
                                    />   
                                </Col>
                    </Form.Group>
                    
                        
                    <Button block type="submit" className="btn btn-dark btn-lg btn-block">Publier</Button>
                </Form>
      )}
            </Formik>
      
        </div>
    );
}

export default CreatePost;
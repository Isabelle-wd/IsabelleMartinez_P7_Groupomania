import React from "react";
import {Form} from "react-bootstrap";
import {Formik } from "formik"; // Validation des formulaires
import * as Yup from "yup";
import axios from "axios";

function createPost() {
    const initialValues = {
        title:"",
        content:"",
        url: null,
        username: "",
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string(),
        content: Yup.string().required(),
        username: Yup.string().min(3).max(25).required(),
        url: Yup.mixed()
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data)
            .then((response) => {
                console.log(response)
            })
        
    };

    return ( 
        <div className="createPostPage">
            <Formik 
                initialValues={initialValues} 
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
            {({
                handleChange,
                errors,
            }) => (
                <Form>
                    <Form.Group className="position-relative mb-3">
                       <Form.Label> Titre : </Form.Label>
                       
                            <Form.Control
                                autocomplete="off"
                                id="inputCreatePost"
                                name="title"
                                placeholder="(ex. titre)"
                                onChange={handleChange}
                            />
                    </Form.Group>

                    <Form.Group className="position-relative mb-3">    
                        <Form.Label> Publication : </Form.Label>
                       
                            <Form.Control
                                autocomplete="off"
                                id="inputCreatePost"
                                name="content"
                                placeholder="(ex. publication)"
                                onChange={handleChange}
                            />
                    </Form.Group>
                    <Form.Group className="position-relative mb-3">
                        <Form.Label> Identifiant : </Form.Label>
                        
                            <Form.Control
                                autocomplete="off"
                                id="inputCreatePost"
                                name="username"
                                placeholder="(ex. Isabelle123)"
                                onChange={handleChange}
                            />    
                    </Form.Group>
                    <Form.Group className="position-relative mb-3">
                            <Form.Label>Photo/Vidéo : </Form.Label>
                                <Form.Control
                                  type="file"
                                  name="url"
                                  onChange={handleChange}
                                  isInvalid={!!errors.file}
                                />   
                    </Form.Group>
                    
                        
                    <button type="submit"> Publier </button>
                </Form>
      )}
            </Formik>
      
        </div>
    )
}

export default createPost;
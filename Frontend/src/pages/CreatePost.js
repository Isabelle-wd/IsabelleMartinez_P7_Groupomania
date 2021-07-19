import React from "react";
import {Form} from "react-bootstrap";
import {Formik, ErrorMessage } from "formik"; // Validation des formulaires
import * as Yup from "yup";
import axios from "axios";

function createPost() {
    const initialValues = {
        title:"",
        content:"",
        url:"",
        username: "",
    };

    const validationSchema = Yup.object().shape({
        postTitle:Yup.string(),
        postContent:Yup.string().required(),
        username: Yup.string().min(3).max(25).required(),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return ( 
        <div className="createPostPage">
            <Formik 
                initialValues={initialValues} 
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
                    <Form>
                    <Form.Group className="position-relative mb-3">
                       <Form.Label> Titre : </Form.Label>
                            <Form.Control
                                autocomplete="off"
                                id="inputCreatePost"
                                name="title"
                                placeholder="(ex. titre)"
                            />
                            </Form.Group>

<Form.Group className="position-relative mb-3">    
                        <Form.Label> Publication : </Form.Label>
                            <Form.Control
                                autocomplete="off"
                                id="inputCreatePost"
                                name="content"
                                placeholder="(ex. publication)"
                            />
                            </Form.Group>
                            <Form.Group className="position-relative mb-3">
                        <Form.Label> Identifiant : </Form.Label>
                            <Form.Control
                                autocomplete="off"
                                id="inputCreatePost"
                                name="username"
                                placeholder="(ex. Isabelle123)"
                            />    
                            </Form.Group>
                        <Form.Group className="position-relative mb-3">
                            <Form.Label>Photo/Vidéo : </Form.Label>
                                <Form.Control
                                  type="file"
                                  required
                                  name="file"
                                  //onChange={handleChange}
                                  //isInvalid={!!errors.file}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>{}</Form.Control.Feedback>    
                        </Form.Group>
                        <Form.Group className="position-relative mb-3">
                          <Form.Check
                            required
                            name="url"
                            label="Agree to terms and conditions"
                            // onChange={handleChange}
                            //isInvalid={!!errors.terms}
                            //feedback={errors.terms}
                            id="validationFormik106"
                            feedbackTooltip
                          />
                        </Form.Group>
                        
                        <button type="submit"> Publier </button>
                    </Form>
            </Formik>
        </div>
    )
}

export default createPost;
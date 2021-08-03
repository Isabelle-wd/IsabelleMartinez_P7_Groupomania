import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Form, Button, Col} from "react-bootstrap";
import {Formik} from "formik"; // Validation des formulaires
import * as Yup from "yup"; // Validation des données du formulaire
import axios from "axios";

function Signup() {
    const initialValues = {
        email: "",
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Adresse email non valide").required(),
        username: Yup.string().min(3).max(25).required(),
        password: Yup.string().matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
          ).required(), 
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data)
        .then(() => {
          console.log(data);
        });
      };

    return (
        <div className="signup">
            <Formik 
                initialValues={initialValues} 
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
            {({
                handleSubmit, handleChange, values, errors
            }) => (
                <Form className="ms-3" onSubmit={handleSubmit}>
                    <h3 className="my-5"><u>Inscription</u></h3>
                    <Form.Group className="mb-3" controlId="Email">
                        <Form.Label>Adresse email :</Form.Label>
                            <Col sm={5}>
                                <Form.Control 
                                    type="email" 
                                    placeholder="@groupomania.com" 
                                    name="email" 
                                    value={values.email} 
                                    onChange={handleChange}
                                    isInvalid={!!errors.email}
                                />
                            </Col>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Username">
                        <Form.Label>Identifiant :</Form.Label> 
                            <Col sm={5}>                       
                                <Form.Control
                                    type="text"
                                    placeholder="Choisissez un pseudo"
                                    name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    isInvalid={!!errors.username}
                                />
                            </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Password">
                        <Form.Label>Mot de passe :</Form.Label>
                            <Col sm={5}>
                                <Form.Control 
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Text className="text-muted">
                                    Le mot de passe doit contenir 8 caractères minimum dont une majuscule, une minuscule, un chiffre et un caractère spécial.
                                </Form.Text>
                            </Col>
                    </Form.Group>    
                    <Button block type="submit" className="btn btn-dark btn-lg btn-block">Je m'inscrit</Button>                     
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default Signup

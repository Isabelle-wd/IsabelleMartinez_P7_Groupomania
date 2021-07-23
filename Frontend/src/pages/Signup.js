import React from "react";
import {Form, Button} from "react-bootstrap";
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
        email: Yup.string().email("adresse email non valide").required(),
        username: Yup.string().min(3).max(25).required(),
        password: Yup.string().matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Le MDP doit contenir 8 caractères minimum dont une majuscule, une minuscule, un chiffre et un caractère spécial"
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
                    <Form.Group className="mb-3" style={{ width: "600px" }} controlId="Email">
                        <Form.Label>Adresse email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Entrez votre adresse mail Groupomania" 
                                name="email" 
                                id="inputCreatePost"
                                value={values.email} 
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                            />
                    </Form.Group>
                    <Form.Group className="mb-3" style={{ width: "600px" }} controlId="Username">
                        <Form.Label>Identifiant</Form.Label>                        
                            <Form.Control
                                type="text"
                                placeholder="Choisissez un pseudo"
                                name="username"
                                id="inputCreatePost"
                                value={values.username}
                                onChange={handleChange}
                                isInvalid={!!errors.username}
                            />
                    </Form.Group>

                    <Form.Group className="mb-3" style={{ width: "600px" }} controlId="Password">
                        <Form.Label>Mot de passe</Form.Label>
                            <Form.Control 
                                type="password"
                                placeholder="Le MDP doit contenir 8 caractères minimum dont une majuscule, une minuscule, un chiffre et un caractère spécial"
                                name="password"
                                id="inputCreatePost"
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}/>
                    </Form.Group>
                    
                    <Button block type="submit">Je m'enregistre</Button>
                                
                              
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default Signup

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Form, InputGroup, Button} from "react-bootstrap";
import {Formik} from "formik"; 
import * as Yup from "yup"; // Validation des formulaires

function Login() {
    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(25).required(),
        password: Yup.string().min().max(20).required(), 
    });
    return (
        <div className="login">
            <Formik 
                initialValues={initialValues} 
                
                validationSchema={validationSchema}>
            {({
                handleSubmit, handleChange, values, errors
            }) => (
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                </Form>
            )}
                </Formik>
        </div>
    )
}

export default Login
 
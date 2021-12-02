import React, { useState, useEffect } from 'react';
import { Container, Card, Image, Accordion, Button, Row, Col, Form } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import SignUp from './SignUp';

const NotLoggedIn = (props) => {

    const [isSignUp, setSignUp] = useState(false);
    const [fail, setFail] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target),
            formDataObj = Object.fromEntries(formData.entries())
        
        let URL = "https://speakit-cs361.wl.r.appspot.com/users/login";
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObj)
        }).then((res) => res.json()).then(response => {
            console.log(response)
            if (response.auth) {
                props.setState(response.id);
            } else {
                setFail(true);
            }
        })
    };

    if (isSignUp) {
        return (
            <div>
                <SignUp setState={props.setState}/>
            </div>
        )
    } else if (fail) {
        return (
            <div>
                <Container>
                    <Card>
                        <h4>Incorrect username/password</h4>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Username" name="username"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="password" placeholder="Password" name="password"/>
                            </Form.Group>

                            <Button variant="primary" type="submit">Log In</Button>
                        </Form>

                        <Button variant="primary" onClick={() => setSignUp(true)}>Sign Up</Button>
                    </Card>
                </Container>
            </div>
        )
    } else {
        return (
            <div>
                <Container>
                    <Card>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Username" name="username"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="password" placeholder="Password" name="password"/>
                            </Form.Group>

                            <Button variant="primary" type="submit">Log In</Button>
                        </Form>

                        <Button variant="primary" onClick={() => setSignUp(true)}>Sign Up</Button>
                    </Card>
                </Container>
            </div>
        )
    }
    
}

export default NotLoggedIn
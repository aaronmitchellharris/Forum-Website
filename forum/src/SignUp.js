import React, { useState, useEffect } from 'react';
import { Container, Card, Image, Accordion, Button, Row, Col, Form } from 'react-bootstrap'


const SignUp = (props) => {

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target),
            formDataObj = Object.fromEntries(formData.entries())
        
        let URL = "https://speakit-cs361.wl.r.appspot.com/users";
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObj)
        }).then(id => {
            console.log(id.id)
            props.setState(id);
        })
    };

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

                        <Button variant="primary" type="submit">Sign Up</Button>
                    </Form>
                </Card>
            </Container>
        </div>
    )
}

export default SignUp
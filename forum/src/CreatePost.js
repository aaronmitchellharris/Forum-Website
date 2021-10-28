import React, { useState, useEffect } from 'react';
import { Button, Container, Card, Image, Form } from 'react-bootstrap'
import './CreatePost.css';

const CreatePost = (props) => {
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target),
            formDataObj = Object.fromEntries(formData.entries())
            formDataObj.category = props.category

        
        let URL = "https://concise-bloom-327806.wl.r.appspot.com/posts";
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObj)
        }).then(() => {
            setSubmitted(true);
        }).then(() => {
            fetch("https://concise-bloom-327806.wl.r.appspot.com/categories/" + props.category + "/posts")
            .then(res => res.json()
                .then((result) => {
                    //setIsLoaded(true);
                //console.log(result)
                props.setState(result);
                },
                (error) => {
                    //setIsLoaded(true);
                    //setError(error);
                }
                )
            )
        });
};

    //useEffect(() => {}, [submitted])
    
    if (submitted) {
        return <h1>Post Created Successfully!</h1>
    } else {
        return (
            <div>
                <Container>
                <Card className="CreatePost">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Post Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Title" name="title"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Post Content</Form.Label>
                            <Form.Control as="textarea" placeholder="Enter Content" name="content"/>
                        </Form.Group>

                        <Button variant="primary" type="submit">Create Post</Button>
                    </Form>
                </Card>
                </Container>
            </div>
        )
    }
}

export default CreatePost
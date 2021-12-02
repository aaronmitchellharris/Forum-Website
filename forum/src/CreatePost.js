import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import { Button, Container, Card, Image, Form } from 'react-bootstrap'
import './CreatePost.css';
import ImageSelector from './ImageSelector'

const CreatePost = (props) => {
    
    let {category} = useParams();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [images, setImages] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target),
            formDataObj = Object.fromEntries(formData.entries())
            formDataObj.category = category
            formDataObj.user = props.user.username

        
        let URL = "https://speakit-cs361.wl.r.appspot.com/posts";
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObj)
        }).then(() => {
            setSubmitted(true);
        }).then(() => {
            fetch("https://speakit-cs361.wl.r.appspot.com/categories/" + category + "/posts")
            .then(res => res.json()
                .then((result) => {
                    //setIsLoaded(true);
                //console.log(result)
                //props.setState(result);
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
        return (
            <div>
                <h1>Post Created Successfully!</h1>

                <Button as={Link} to={"/categories/"+category}>Back to {category}</Button>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Creating Post for {category}</h1>

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

                        <ImageSelector/>

                        <Button variant="primary" type="submit">Create Post</Button>
                    </Form>
                </Card>
                </Container>
            </div>
        )
    }
}

export default CreatePost
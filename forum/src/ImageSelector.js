import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import { Button, Container, Card, Image, Form } from 'react-bootstrap'

const width = {
    width: 100,
    padding: 10,
    margin: 25
}

const ImageSelector = (props) => {
    
    const [images, setImages] = useState([])
    const [text, setText] = useState("")

    const handleChange = (event) => {
        setText(event.target.value);
    }

    const findImage = () => {
        //let microservice = ""
        //fetch(microservice)
        console.log(text)
        if (text == "") {
            setImages(["https://i.redd.it/3dtqj9opzsy71.jpg", "https://i.redd.it/aa7kyg1npry71.jpg", "https://i.redd.it/kxts24nhzsy71.jpg"]);
        } else {
            setImages([text, text, text])
        }
    };

    if (images.length == 0) {
        return (
            <div>
                <Form.Label>Pick Thumbnail</Form.Label>
                <Form.Control id="keyword" type="text" onChange={handleChange}/>
                <Button onClick={findImage} variant="primary" type="button">Search Images</Button>
            </div>
        )
    } else {
        return (
            <div>
                <Form.Label>Pick Thumbnail</Form.Label>
                <Form.Control id="keyword" type="text" onChange={handleChange}/>
                <Button onClick={findImage} variant="primary" type="button">Search Images</Button>  
            <Form.Group>
                <Form.Check inline type="radio" name="thumbnail" value={images[0]} label={<Image style={width} src={images[0]} thumbnail/>}/>
                <Form.Check inline type="radio" name="thumbnail" value={images[1]} label={<Image style={width} src={images[1]} thumbnail/>}/>
                <Form.Check inline type="radio" name="thumbnail" value={images[2]} label={<Image style={width} src={images[2]} thumbnail/>}/>
            </Form.Group>
            </div>
        )
    }
    
}

export default ImageSelector

/*
<Form onSubmit={findImage}>
                <Form.Group>
                    <Form.Label>Pick Thumbnail</Form.Label>
                    <Form.Control type="text" placeholder="Enter Keyword" name="keyword"/>
                </Form.Group>
                <Button variant="primary" type="submit">Search Images</Button>
            </Form>*/
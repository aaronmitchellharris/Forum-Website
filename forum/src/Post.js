import React, { useState, useEffect } from 'react';
import { Container, Card, Image, Button, Row, Col } from 'react-bootstrap'
import './Post.css';

const width = {
    width: 100,
    padding: 10
}

const Post = (props) => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState([]);

    let URL = props.self;
    useEffect(() => {
        fetch(URL)
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              console.log(result)
              setItem(result);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
    }, [])

    const deletePost = () => {
        fetch(URL, {
            method: 'DELETE'
        }).then(() => {
            fetch("https://speakit-cs361.wl.r.appspot.com/categories/" + props.category + "/posts")
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

        })
    };
    
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                
                <Container>

                    <Card>
                        <Card.Text xs="1">
                            <Row>
                            <Col md={{span: 2}}><Image style={width} src={item.thumbnail} thumbnail/></Col>
                            <Col md={{span: 2}}><span className="title">{item.title}</span></Col>
                            <Col md={{span: 2, offset: 6}}><Button variant="danger" onClick={deletePost}>Delete</Button></Col>

                            
                            </Row>
                            <div className="content">{item.content}</div>
                        </Card.Text>
                        <Card.Footer>
                            <div>Likes {item.likes}   Dislikes {item.dislikes}</div>

                        </Card.Footer>
                    </Card>

                </Container>

            </div>
        )
    }
}

export default Post
//"https://i.redd.it/6zyzrsgioxv71.jpg"
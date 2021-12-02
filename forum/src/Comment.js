import { prependOnceListener } from 'process';
import React, { useState, useEffect } from 'react';
import { Container, Card, Image, Button, Row, Col, Form } from 'react-bootstrap'

const width = {
    width: 100,
    padding: 10
}

const Comment = (props) => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState([]);

    let URL = "https://speakit-cs361.wl.r.appspot.com/comments/"+props.id;
    useEffect(() => {
        fetch(URL)
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              console.log("comment", result)
              setItem(result);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
    }, [])

    const deleteComment = () => {
        fetch(URL, {
            method: 'DELETE'
        }).then(() => {
            fetch("https://speakit-cs361.wl.r.appspot.com/posts/"+props.parent+"/comments")
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
    } else if (props.user.username == item.user) {
        return (
            <div>
                
                <Container>

                    <Card>
                        <Card.Text>
                            <div className="content">{item.user}: {item.content}</div>
                            <Button variant="danger" onClick={deleteComment}>Delete</Button>
                        </Card.Text>
                    </Card>

                </Container>

            </div>
        )
    } else {
        return (
            <div>
                
                <Container>

                    <Card>
                        <Card.Text>
                            <div className="content">{item.user}: {item.content}</div>
                        </Card.Text>
                    </Card>

                </Container>

            </div>
        )
    }
}

export default Comment
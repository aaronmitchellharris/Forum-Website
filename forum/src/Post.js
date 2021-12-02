import React, { useState, useEffect } from 'react';
import { Container, Card, Image, Button, Row, Col, Form } from 'react-bootstrap'
import './Post.css';
import Comment from './Comment';

const width = {
    width: 100,
    padding: 10
}

const Post = (props) => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState([]);
    const [comments, setComments] = useState([]);
    
    let URL = props.self;
    useEffect(() => {
        fetch(URL)
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItem(result);
              setComments(result.comments);
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

                props.setState(result);
                },
                (error) => {

                }
                )
            )

        })
    };

    const updateUserPost = () => {
        let URL = "https://speakit-cs361.wl.r.appspot.com/users/"+props.user.id;
        fetch(URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(props.user)
        })
        .then((id) => {
            
            fetch("https://speakit-cs361.wl.r.appspot.com/posts/"+item.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            })
            .then((obj) => {
                
                fetch(props.self)
                .then((res) => res.json())
                .then(result => {
                    setItem(result)
                })
                
            })
        })
    };

    const like = () => {
        if (props.user.liked.hasOwnProperty(item.id)) {
            if (props.user.liked[item.id] == 1) {
                return;
            }

        }

        if (props.user.disliked.hasOwnProperty(item.id)) {
            if (props.user.disliked[item.id] == 1) {
                props.user.disliked[item.id] = 0;
                item.dislikes -= 1;
            }
        }
        
        props.user.liked[item.id] = 1;
        item.likes += 1;

        updateUserPost();
    };

    const dislike = () => {
        if (props.user.disliked.hasOwnProperty(item.id)) {
            if (props.user.disliked[item.id] == 1) {
                return;
            }
        }
        
        if (props.user.liked.hasOwnProperty(item.id)) {
            if (props.user.liked[item.id] == 1) {
                props.user.liked[item.id] = 0;
                item.likes -= 1;
            }
        }
        props.user.disliked[item.id] = 1;
        item.dislikes += 1;

        updateUserPost();
    };
    
    const handleSubmit = (event) => {
        
        event.preventDefault();

        const formData = new FormData(event.target),
            formDataObj = Object.fromEntries(formData.entries())
            formDataObj.user = props.user.username
            formDataObj.parent = item.id
        
        let URL = "https://speakit-cs361.wl.r.appspot.com/comments";
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObj)
        }).then(() => {
            fetch("https://speakit-cs361.wl.r.appspot.com/posts/"+item.id+"/comments").then(
                list => list.json()).then(result => {
                    setComments(result)
            })
        });
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
                        <Card.Text xs="1">
                            <Row>
                            <Col md={{span: 2}}><Image style={width} src={item.thumbnail} thumbnail/></Col>
                            <Col md={{span: 2}}><span className="title">{item.title}</span></Col>
                            <Col md={{span: 2, offset: 6}}><Button variant="danger" onClick={deletePost}>Delete</Button></Col>

                            
                            </Row>
                            <div className="content">{item.user}: {item.content}</div>
                        </Card.Text>
                        <Card.Footer>
                            <div>
                                <Button onClick={like}>Like {item.likes}</Button>   
                                <Button onClick={dislike}>Dislike {item.dislikes}</Button>

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Control as="textarea" placeholder="Enter Comment" name="content"/>
                                    </Form.Group>

                                    <Button variant="primary" type="submit">Reply</Button>
                                </Form>
                            </div>
                            
                        </Card.Footer>
                    </Card>

                    {comments.map(comment => (
                        <Col>
                        <Container key={comment.id}>
                            <Comment user={props.user} setUser={props.setUser} isLogin={props.isLogin} id={comment.id} self={comment.self} setState={setComments} parent={item.id}/>
                        </Container>
                        </Col>
                    ))}

                </Container>

            </div>
        )
    } else {
        return (
            <div>
                
                <Container>

                    <Card>
                        <Card.Text xs="1">
                            <Row>
                            <Col md={{span: 2}}><Image style={width} src={item.thumbnail} thumbnail/></Col>
                            <Col md={{span: 2}}><span className="title">{item.title}</span></Col>

                            
                            </Row>
                            <div className="content">{item.content}</div>
                        </Card.Text>
                        <Card.Footer>
                            <div>
                                <Button onClick={like}>Like {item.likes}</Button>   
                                <Button onClick={dislike}>Dislike {item.dislikes}</Button>

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Control as="textarea" placeholder="Enter Comment" name="content"/>
                                    </Form.Group>

                                    <Button variant="primary" type="submit">Reply</Button>
                                </Form>
                            </div>

                        </Card.Footer>
                    </Card>

                    {comments.map(comment => (
                        <Col>
                        <Container key={comment.id}>
                            <Comment user={props.user} setUser={props.setUser} isLogin={props.isLogin} id={comment.id} self={comment.self} setState={setComments} parent={item.id}/>
                        </Container>
                        </Col>
                    ))}

                </Container>

            </div>
        )
    }
}

export default Post
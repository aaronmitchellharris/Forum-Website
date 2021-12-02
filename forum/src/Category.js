import React, { useState, useEffect } from 'react'
import { Button, Card, Container, Row, Col } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Post from './Post'
import CreatePost from './CreatePost'
import './Category.css';

const Category = (props) => {

    let {category} = useParams();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);

    let URL = "https://speakit-cs361.wl.r.appspot.com/categories/" + {category}.category + "/posts";
    useEffect(() => {
        fetch(URL)
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              console.log(result)
              setPosts(result);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <h1>
                    Welcome to Speakit {category}!
                </h1>

                {posts.map(post => (
                        <Col>
                        <Container key={post.id}>
                            <Post user={props.user} setUser={props.setUser} isLogin={props.isLogin} id={post.id} self={post.self} setState={setPosts} category={category}/>
                        </Container>
                        </Col>
                    ))}

                <Col>
                <Container>

                        <Button as={Link} to={category+"/create"} variant="primary" type="submit">Create Post</Button>
                        {/*<CreatePost category={category} setState={setPosts}>*/}

                </Container>
                </Col>

            </div>
        )
    }
}

export default Category
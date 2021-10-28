import React, { useState, useEffect } from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import { Link, Route } from 'react-router-dom'
import './Categories.css';

const Categories = () => {
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://concise-bloom-327806.wl.r.appspot.com/categories")
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              console.log(result.results)
              setItems(result.results);
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
                <h1>Categories</h1>
                <Container>
                    <Row xs md={5}>

                    {items.map(item => (
                        <Col>
                        <Card as={Link} to={item.name.toString()} className="categories" key={item.name}>
                        {item.name}
                        </Card>
                        </Col>
                    ))}

                    </Row>
                
                </Container>
                

            </div>
        )
    }
}

export default Categories
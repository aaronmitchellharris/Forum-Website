import React from 'react';
import { Link } from 'react-router-dom'
import { Nav, Navbar, Container } from 'react-bootstrap';

const Header = () => {
    return (
        <div>

            <Navbar bg="dark" variant="dark">
                <Container>

                    <Navbar.Brand href="/">Speakit</Navbar.Brand>

                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
                    </Nav>

                </Container>
            </Navbar>


        </div>
    )
}

export default Header
import React, { useState, useEffect } from 'react';
import { Container, Card, Image, Accordion, Button, Row, Col } from 'react-bootstrap'

const LoggedIn = (props) => {

    if (props.user.username == null) {
        fetch("https://speakit-cs361.wl.r.appspot.com/users/"+props.login)
            .then(u => u.json()).then(user => {
                console.log(user)
                user.id = props.login
                props.setUser(user);
        })
    }
    
    if (props.user.username == null) {
        return (
            <div>Loading...</div>
        )
    } else {
        return (
            <div>
                <h4>Welcome {props.user.username}!</h4>

                <Button variant="primary" onClick={() => {props.setState(false); props.setUser({"username": null});}}>Logout</Button>
            </div>
        )
    }
}

export default LoggedIn
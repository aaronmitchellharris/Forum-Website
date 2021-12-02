import React, { useState, useEffect } from 'react';
import { Container, Card, Image, Accordion, Button, Row, Col } from 'react-bootstrap'
const credentials = require('./credentials.json');

const NotLoggedIn = (props) => {

    const response_type = "code";
    const client_id = credentials.web.client_id;

    //const redirect_uri = "https://speakit-cs361.wl.r.appspot.com";
    const redirect_uri = "http://localhost:3000";

    const scope = "https://www.googleapis.com/auth/userinfo.profile";
    const URL = "https://accounts.google.com/o/oauth2/v2/auth?response_type=" + response_type + "&client_id=" + client_id + "&redirect_uri=" + redirect_uri + "&scope=" + scope;

    //const baseURL = `${window.location.origin.toString()}/oauth`
    const baseURL = "https://speakit-cs361.wl.r.appspot.com/oauth"

    const redirect = (url) => {

        fetch(baseURL, {
            method: 'POST',
            body: {}
        }).then(res => res.json()).then(data => {

            window.location.href = url + "&state=" + data.state;
        });

    };

    return (
        <div>
            <Button variant="primary" value={URL} onClick={() => redirect(URL)}>Login with Google</Button>
        </div>
    )
}

export default NotLoggedIn
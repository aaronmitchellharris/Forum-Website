import React, { useState, useEffect } from 'react';
import { Container, Card, Image, Accordion, Button, Row, Col } from 'react-bootstrap'
import './User.css';
import LoggedIn from './LoggedIn';
import NotLoggedIn from './NotLoggedIn';

const width = {
    width: 100,
    padding: 10
}

const User = (props) => {

    const [isLogin, setLogin] = useState(false)


    if (isLogin) {
        return (
            <div>
                <LoggedIn setState={setLogin}/>
            </div>
        )
    } else {
        return (
            <div>
                <NotLoggedIn setState={setLogin}/>
            </div>
        )
    }
}

export default User
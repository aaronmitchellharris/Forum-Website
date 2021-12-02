import './App.css';
import qs from 'qs'
import Header from './Header'
import Home from './Home'
import Categories from './Categories'
import Category from './Category'
import CreatePost from './CreatePost'
import User from './User';
import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Card, Container, Row, Col } from 'react-bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
const credentials = require('./credentials.json');

const App = () => {
    
    const [isValid, setValid] = useState('checking');
    const [isLogged, setLogged] = useState(false);

    const code = qs.parse(window.location.search, {ignoreQueryPrefix: true}).code
    const state = qs.parse(window.location.search, {ignoreQueryPrefix: true}).state
    console.log(code)
    console.log(state)

    if (code != null & state != null & isValid === 'checking') {
        fetch("https://speakit-cs361.wl.r.appspot.com/oauth/"+state.toString()).then(res => res.json()).then(res => {
            if (!res.exists) {
                setValid('error');
            } else {
                
                //const redirect_uri = `http://${window.location.origin.toString()}/oauth`
                //const redirect_uri = "https://speakit-cs361.wl.r.appspot.com"
                const redirect_uri = "http://localhost:3000"
                
                const data = {
                    "code": code.toString(),
                    "client_id": credentials.web.client_id,
                    "client_secret": credentials.web.client_secret,
                    "redirect_uri": redirect_uri,
                    "grant_type": "authorization_code"
                }

                fetch("https://www.googleapis.com/oauth2/v4/token", {
                    method: 'POST',
                    body: JSON.stringify(data)
                }).then(response => response.json()).then(data => {
                    console.log("data", data)
                    const token = data.access_token;                   
                    const jwt = data.id_token;
                    fetch("https://people.googleapis.com/v1/people/me?personFields=names",
                    {headers: {'Authorization': 'Bearer ' + token}})
                    .then(res => res.json()).then(p => {
                        let profile = p
                        console.log("profile", profile)
                        console.log("jwt", jwt)
                        fetch("https://speakit-cs361.wl.r.appspot.com/users", {
                            method: 'POST',
                            headers: {'Authorization': 'Bearer ' + jwt}
                        }).then(u => u.json()).then(user => {
                            console.log("user", user)
                            
                            profile.names[0].jwt = jwt
                            profile.names[0].user = user.id
                            setValid(profile.names[0]);
                        })
                    })
                })
            }
        })
    }
    
    return (
        <div>
            <Header />


                <Row className="show-grid">
                    <Col xs={2} md={4}>
                        <User/>
                    </Col>
                    <Col xs={10} md={8}>
                        <Switch>
                            <Route path='/categories/:category/create'>
                                <CreatePost />
                            </Route>
                            <Route path='/categories/:category'>
                                <Category />
                            </Route>
                            <Route path='/categories'>
                                <Categories />
                            </Route>
                            <Route path='/'>
                                <Home />
                            </Route>
                        </Switch>
                    </Col>
                </Row>

        </div>
    )
}

export default App;

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

const App = () => {
   
    const [isLogin, setLogin] = useState(false)
    const [user, setUser] = useState({"username": null})

    return (
        <div>
            <Header />

                <Row className="show-grid">
                    <Col xs={2} md={4}>
                        <User user={user} setUser={setUser} isLogin={isLogin} setLogin={setLogin}/>
                    </Col>
                    <Col xs={10} md={8}>
                        <Switch>
                            <Route path='/categories/:category/create'>
                                <CreatePost user={user} setUser={setUser} isLogin={isLogin}/>
                            </Route>
                            <Route path='/categories/:category'>
                                <Category user={user} setUser={setUser} isLogin={isLogin}/>
                            </Route>
                            <Route path='/categories'>
                                <Categories user={user} setUser={setUser} isLogin={isLogin}/>
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

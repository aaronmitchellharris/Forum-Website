import './App.css';
import Header from './Header'
import Home from './Home'
import Categories from './Categories'
import Category from './Category'
import CreatePost from './CreatePost'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Card, Container, Row, Col } from 'react-bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <div>
            <Header />


                <Row className="show-grid">
                    <Col xs={2} md={4}></Col>
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

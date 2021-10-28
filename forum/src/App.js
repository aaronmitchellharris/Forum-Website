import './App.css';
import Header from './Header'
import Home from './Home'
import Categories from './Categories'
import Category from './Category'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  
  return (
    <div>
      <Header />
      
      <Switch>
        <Route path='/categories'>
          <Categories />
        </Route>
        <Route path='/:category'>
            <Category />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
      

    </div>
  )
}

export default App;

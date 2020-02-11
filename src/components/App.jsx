import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

import Home from '../pages/home'
import Setlist from '../pages/_setlist'
import Navbar from './Navbar'
import Favs from '../pages/favs'
import Login from '../pages/login'

import '../styles/App.scss'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Navbar />
          <Container>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/favs" exact component={Favs} />
              <Route
                path="/setlist/:artist/:venue/:id"
                exact
                component={Setlist}
              />
            </Switch>
          </Container>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App

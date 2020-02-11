import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

import Home from '../pages/home'
import Setlist from '../pages/_setlist'

import '../styles/App.scss'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Container>
            <Switch>
              <Route path="/" exact component={Home} />
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

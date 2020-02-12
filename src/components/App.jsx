import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

import {
  faVolumeDown,
  faVolumeUp,
  faVolumeMute
} from '@fortawesome/free-solid-svg-icons'

import {
  faPlayCircle,
  faPauseCircle
} from '@fortawesome/free-regular-svg-icons'

import Navbar from './Navbar'
import Home from '../pages/home'
import Favs from '../pages/favs'
import Login from '../pages/login'
import Setlist from '../pages/_setlist'

import '../styles/App.scss'

library.add(
  fab,
  faPlayCircle,
  faPauseCircle,
  faVolumeDown,
  faVolumeUp,
  faVolumeMute
)

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

export default compose(
  connect(state => ({
    auth: state.firebase.auth,
    favsIds: state.firestore.data.favs
  })),
  firestoreConnect(({ auth }) => {
    const queries = []

    if (auth.uid != null) {
      queries.push({
        collection: 'users',
        doc: auth.uid,
        subcollections: [{ collection: 'setlists' }],
        storeAs: 'favs'
      })
    }

    return queries
  })
)(App)

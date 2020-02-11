import React from 'react'
import PropTypes from 'prop-types'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { signOut } from '../../actions/auth'

const UserLinks = props => {
  const { signOutConnect } = props
  return (
    <Nav className="align-items-center">
      <Nav.Item>
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink className="nav-link" to="/favs">
          Favs
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="Logout">
          <Button onClick={signOutConnect} variant="primary">
            Logout
          </Button>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

UserLinks.propTypes = {
  signOutConnect: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    signOutConnect: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(UserLinks)

import React from 'react'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const DefaultLinks = () => {
  return (
    <Nav className="align-items-center">
      <Nav.Item>
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="http://localhost:5000/spotify-setlists-8832b/us-central1/api/login"
          eventKey="Login"
        >
          <Button variant="primary">Login</Button>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default DefaultLinks

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
          href={`${process.env.REACT_APP_API_ENDPOINT}/login`}
          eventKey="Login"
        >
          <Button variant="primary">Login</Button>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default DefaultLinks

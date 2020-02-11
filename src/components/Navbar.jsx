import React from 'react'
import PropTypes from 'prop-types'
import Navbar from 'react-bootstrap/Navbar'
import { connect } from 'react-redux'
import UserLinks from './layout/UserLinks'
import DefaultLinks from './layout/DefaultLinks'

const NavbarTop = props => {
  const { auth } = props
  const links = auth.uid ? <UserLinks /> : <DefaultLinks />

  return (
    <Navbar variant="dark" className="justify-content-end">
      {links}
    </Navbar>
  )
}

NavbarTop.defaultProps = {
  auth: {
    uid: ''
  }
}

NavbarTop.propTypes = {
  auth: PropTypes.shape({
    uid: PropTypes.string
  })
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(NavbarTop)

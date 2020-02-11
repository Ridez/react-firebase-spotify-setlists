import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import queryString from 'query-string'
import { signIn } from '../actions/auth'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      redirect: false
    }
  }

  componentDidMount() {
    const parsed = queryString.parse(window.location.hash)
    const { signInConnect } = this.props

    signInConnect(parsed.firebase_token, parsed.uid)

    localStorage.setItem('token', parsed.access_token)
    localStorage.setItem('refreshToken', parsed.refresh_token)

    this.setState({ redirect: true })
  }

  render() {
    const { redirect } = this.state
    if (redirect) {
      return <Redirect to="/" />
    }
    return <div>Login</div>
  }
}

Login.propTypes = {
  signInConnect: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signInConnect: (token, uid) => dispatch(signIn(token, uid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

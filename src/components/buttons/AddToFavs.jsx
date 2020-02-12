import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { addToFavs, isLoadingFavs } from '../../actions/favs'

class AddToFavs extends React.Component {
  addToFavs(setlistId) {
    const { addToFavsConnect, auth } = this.props

    if (auth.uid) {
      addToFavsConnect(setlistId, auth.uid)
    }
  }

  render() {
    const { setlistId, auth } = this.props

    return (
      <div>
        {auth.uid && (
          <Button onClick={() => this.addToFavs(setlistId)} variant="primary">
            Favs+
          </Button>
        )}
      </div>
    )
  }
}

AddToFavs.defaultProps = {
  auth: {
    uid: ''
  }
}

AddToFavs.propTypes = {
  setlistId: PropTypes.string.isRequired,
  auth: PropTypes.shape({
    uid: PropTypes.string
  }),
  addToFavsConnect: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addToFavsConnect: (setlist, uid) => dispatch(addToFavs(setlist, uid)),
    isLoadingFavsConnect: val => dispatch(isLoadingFavs(val))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToFavs)

import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { removeFromFavs } from '../../actions/favs'

class RemoveFromFavs extends React.Component {
  rmFromFavs(setlistId) {
    const { auth, removeFromFavsConnect } = this.props

    if (auth.uid) {
      removeFromFavsConnect(setlistId, auth.uid)
    }
  }

  render() {
    const { removeId, auth } = this.props

    return (
      <div>
        {auth.uid && (
          <Button
            className="remove-btn"
            onClick={() => this.rmFromFavs(removeId)}
            variant="primary"
          >
            Favs-
          </Button>
        )}
      </div>
    )
  }
}

RemoveFromFavs.defaultProps = {
  auth: {
    uid: ''
  }
}
RemoveFromFavs.propTypes = {
  auth: PropTypes.shape({
    uid: PropTypes.string
  }),
  removeId: PropTypes.string.isRequired,
  removeFromFavsConnect: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    favsList: state.favs.favs
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeFromFavsConnect: (setlist, uid) =>
      dispatch(removeFromFavs(setlist, uid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveFromFavs)

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import { isLoaded } from 'react-redux-firebase'
import RemoveFromFavs from './buttons/RemoveFromFavs'
import MoreLink from './buttons/MoreLink'

class FavsSetlistList extends React.Component {
  renderFavs() {
    const { favsList } = this.props

    return Object.keys(favsList)
      .reverse()
      .map((key, index) => {
        return (
          <tr key={favsList[key].setlistId.id}>
            <td className="align-middle">{index + 1}</td>
            <td className="align-middle">
              {favsList[key].setlistId.eventDate.replace(/-/g, '/')}
            </td>
            <td className="align-middle">
              {favsList[key].setlistId.artist.name}
            </td>
            <td className="align-middle">
              {favsList[key].setlistId.tour
                ? favsList[key].setlistId.tour.name
                : ''}
            </td>
            <td className="align-middle">
              {favsList[key].setlistId.venue.city.name}
            </td>
            <td className="align-middle wrap-buttons">
              <MoreLink setlist={favsList[key].setlistId} />
              <RemoveFromFavs removeId={favsList[key].setlistId.id} />
            </td>
          </tr>
        )
      })
  }

  render() {
    const { favsList, auth } = this.props
    return (
      <div>
        {auth.uid && isLoaded(favsList) ? (
          <div>
            <Table responsive="xl" hover variant="dark">
              <tbody>{this.renderFavs()}</tbody>
            </Table>
          </div>
        ) : (
          <div className="text-center">
            <Spinner animation="border" role="status" />
          </div>
        )}
      </div>
    )
  }
}
FavsSetlistList.defaultProps = {
  auth: {
    uid: ''
  },
  favsList: []
}

FavsSetlistList.propTypes = {
  auth: PropTypes.shape({
    uid: PropTypes.string
  }),
  favsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      setlistId: PropTypes.shape({
        id: PropTypes.string.isRequired,
        eventDate: PropTypes.string.isRequired,
        tour: PropTypes.shape({
          name: PropTypes.string.isRequired
        }),
        venue: PropTypes.shape({
          name: PropTypes.string.isRequired,
          city: PropTypes.shape({
            name: PropTypes.string.isRequired,
            country: PropTypes.shape({
              name: PropTypes.string.isRequired
            })
          })
        }),
        artist: PropTypes.shape({
          name: PropTypes.string.isRequired
        })
      })
    })
  )
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    favsList: state.firestore.ordered.favs,
    favsLength: state.favs.favsLength
  }
}

export default connect(mapStateToProps)(FavsSetlistList)

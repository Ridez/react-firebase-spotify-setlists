import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { Link } from 'react-router-dom'
import RemoveFromFavs from './buttons/RemoveFromFavs'
import { fetchSetlistsBySetlistId, setFavsLength } from '../actions/favs'

class FavsSetlistList extends React.Component {
  componentDidMount() {
    const {
      favsIds,
      setFavsLengthConnect,
      fetchSetlistsBySetlistIdConnect
    } = this.props

    setFavsLengthConnect(favsIds.length)
    fetchSetlistsBySetlistIdConnect(favsIds)
  }

  componentDidUpdate() {
    const {
      favsIds,
      favsLength,
      setFavsLengthConnect,
      fetchSetlistsBySetlistIdConnect
    } = this.props

    if (favsIds && favsIds.length !== favsLength) {
      setFavsLengthConnect(favsIds.length)
      fetchSetlistsBySetlistIdConnect(favsIds)
    }
  }

  convertUrl(str) {
    return str.replace(/\s+/g, '-').toLowerCase()
  }

  renderFavs() {
    const { favsList } = this.props

    return Object.keys(favsList).map((key, index) => {
      return (
        <tr key={favsList[key].data.id}>
          <td className="align-middle">{index + 1}</td>
          <td className="align-middle">
            {favsList[key].data.eventDate.replace(/-/g, '/')}
          </td>
          <td className="align-middle">{favsList[key].data.artist.name}</td>
          <td className="align-middle">
            {favsList[key].data.tour ? favsList[key].data.tour.name : ''}
          </td>
          <td className="align-middle">{favsList[key].data.venue.city.name}</td>
          <td className="d-flex wrap-buttons">
            <RemoveFromFavs removeId={favsList[key].data.id} />
            <Link
              to={`/setlist/${this.convertUrl(
                favsList[key].data.artist.name
              )}/${this.convertUrl(
                favsList[key].data.venue.name
              )}-${this.convertUrl(
                favsList[key].data.venue.city.name
              )}-${this.convertUrl(
                favsList[key].data.venue.city.country.name
              )}/${favsList[key].data.id}`}
            >
              <Button variant="primary">More</Button>
            </Link>
          </td>
        </tr>
      )
    })
  }

  render() {
    const { isLoadingFavs } = this.props
    return (
      <div>
        {!isLoadingFavs ? (
          <Table responsive="xl" hover variant="dark">
            <tbody>{this.renderFavs()}</tbody>
          </Table>
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
  favsIds: []
}

FavsSetlistList.propTypes = {
  auth: PropTypes.shape({
    uid: PropTypes.string
  }),
  favsIds: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      setlistId: PropTypes.string
    })
  ),
  favsList: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.shape({
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
  ).isRequired,
  isLoadingFavs: PropTypes.bool.isRequired,
  favsLength: PropTypes.number.isRequired,
  setFavsLengthConnect: PropTypes.func.isRequired,
  fetchSetlistsBySetlistIdConnect: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    favsIds: state.firestore.ordered.favs,
    favsList: state.favs.favs,
    favsLength: state.favs.favsLength,
    isLoadingFavs: state.favs.isLoadingFavs
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSetlistsBySetlistIdConnect: setlistId =>
      dispatch(fetchSetlistsBySetlistId(setlistId)),
    setFavsLengthConnect: arrLength => dispatch(setFavsLength(arrLength))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavsSetlistList)

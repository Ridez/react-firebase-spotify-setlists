import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Sticky from 'react-sticky-el'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from 'react-bootstrap/Spinner'
import SpotifyPlayer from '../components/SpotifyPlayer'
import SingleSetlistList from '../components/SingleSetlistList'
import AddToFavs from '../components/buttons/AddToFavs'
import RemoveFromFavs from '../components/buttons/RemoveFromFavs'
import { loadingSingle, fetchSetlist } from '../actions/setlist'

import '../styles/setlist.scss'

class Setlist extends React.Component {
  componentDidMount() {
    const {
      match: {
        params: { artist, venue, id }
      }
    } = this.props
    const values = { artist, venue, id }
    const { loadingSingleConnect, fetchSetlistConnect } = this.props

    loadingSingleConnect(true)
    fetchSetlistConnect(JSON.parse(JSON.stringify(values)))
  }

  checkFavs(id) {
    const { favsIds } = this.props

    if (favsIds) {
      const hasId = favsIds.some(fav => {
        return fav.setlistId === id
      })

      return hasId
    }
    return false
  }

  render() {
    const { setlist, isLoadingSingle, auth } = this.props

    if (!setlist.artist || !setlist.sets) {
      return null
    }

    return (
      <div className="single-setlist-page">
        {!isLoadingSingle ? (
          <div>
            <div className="head">
              <h1 className="head__title">
                {setlist.artist.name}
                <span> / </span>
                {setlist.tour ? setlist.tour.name : ''}
              </h1>
              <hr />
              <p className="head__caption">
                {setlist.eventDate.replace(/-/g, '/')}
                <br />
                {setlist.venue.city.name}
                <br />
                {setlist.venue.city.country.name}
              </p>
            </div>
            {!this.checkFavs(setlist.id) ? (
              <AddToFavs setlistId={setlist.id} />
            ) : (
              <RemoveFromFavs removeId={setlist.id} />
            )}
            <Row>
              <Col
                xs={{ order: 2 }}
                sm={{ span: 12, order: 2 }}
                lg={{ span: 8, order: 1 }}
              >
                <SingleSetlistList />
              </Col>
              <Col
                xs={{ order: 1 }}
                sm={{ span: 12, order: 1 }}
                lg={{ span: 4, order: 2 }}
              >
                <Sticky style={{ marginTop: '50px' }} topOffset={-50}>
                  {auth.uid ? (
                    <SpotifyPlayer />
                  ) : (
                    <p className="alert">
                      Music Player is available only for Logged In Users!
                    </p>
                  )}
                </Sticky>
              </Col>
            </Row>
          </div>
        ) : (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
      </div>
    )
  }
}

Setlist.defaultProps = {
  setlist: {},
  auth: {
    uid: ''
  },
  favsIds: []
}

Setlist.propTypes = {
  auth: PropTypes.shape({
    uid: PropTypes.string
  }),
  favsIds: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      setlistId: PropTypes.string
    })
  ),
  match: PropTypes.shape({
    params: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      venue: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  setlist: PropTypes.shape({
    tour: PropTypes.shape({
      name: PropTypes.string
    }),
    artist: PropTypes.shape({
      name: PropTypes.string
    }),
    eventDate: PropTypes.string,
    venue: PropTypes.shape({
      city: PropTypes.shape({
        name: PropTypes.string,
        country: PropTypes.shape({
          name: PropTypes.string
        })
      })
    }),
    id: PropTypes.string,
    sets: PropTypes.shape({
      set: PropTypes.array
    })
  }),
  isLoadingSingle: PropTypes.bool.isRequired,
  loadingSingleConnect: PropTypes.func.isRequired,
  fetchSetlistConnect: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    setlist: state.setlist.item[0],
    isLoadingSingle: state.setlist.isLoadingSingle,
    favsIds: state.firestore.ordered.favs
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loadingSingleConnect: val => dispatch(loadingSingle(val)),
    fetchSetlistConnect: val => dispatch(fetchSetlist(val))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Setlist)

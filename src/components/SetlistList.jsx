import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { connect } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import MoreLink from './buttons/MoreLink'
import AddToFavs from './buttons/AddToFavs'
import RemoveFromFavs from './buttons/RemoveFromFavs'

import {
  fetchSetlistsByCity,
  fetchSetlists,
  isLoadingMore,
  clearSetlists
} from '../actions/setlists'

import { isLoadingFavs } from '../actions/favs'

class SetlistList extends React.Component {
  componentDidMount() {
    this.getInitialSetlists()
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props

    if (location !== prevProps.location) {
      this.getInitialSetlists()
    }
  }

  getInitialSetlists() {
    const {
      fetchSetlistsByCityConnect,
      fetchSetlistsConnect,
      clearSetlistsConnect
    } = this.props
    const parsed = queryString.parse(window.location.hash)

    clearSetlistsConnect()

    if (Object.entries(parsed).length === 0) {
      fetchSetlistsByCityConnect('New York')
    } else {
      fetchSetlistsConnect(parsed, 1)
    }
  }

  loadMore = () => {
    const { fetchSetlistsConnect, currPage, isLoadingMoreConnect } = this.props
    const parsed = queryString.parse(window.location.hash)

    isLoadingMoreConnect(true)
    fetchSetlistsConnect(parsed, currPage + 1)
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

  renderList() {
    const { setlists, isLoadingFavsConnect } = this.props

    return setlists.map((setlist, index) => {
      return (
        <tr key={setlist.id}>
          <td className="align-middle">{index + 1}</td>
          <td className="align-middle">
            {setlist.eventDate.replace(/-/g, '/')}
          </td>
          <td className="align-middle">{setlist.artist.name}</td>
          <td className="align-middle">
            {setlist.venue.city.name}
            <span> / </span>
            {setlist.venue.city.country.name}
          </td>

          <td className="align-middle wrap-btns">
            <MoreLink className setlist={setlist} />
            {!this.checkFavs(setlist.id) ? (
              <div className="add-favs-btn">
                <AddToFavs setlistId={setlist.id} />
              </div>
            ) : (
              <div
                role="button"
                tabIndex="0"
                onClick={() => isLoadingFavsConnect(true)}
                onKeyDown={() => isLoadingFavsConnect(true)}
                className="remove-favs-btn"
              >
                <RemoveFromFavs removeId={setlist.id} />
              </div>
            )}
          </td>
        </tr>
      )
    })
  }

  render() {
    const { isLoadingSetlist, loadingMore, hasMore } = this.props

    return (
      <div>
        {!isLoadingSetlist && (
          <div>
            <Table
              responsive="xl"
              className="home-setlist"
              hover
              variant="dark"
            >
              <tbody>{this.renderList()}</tbody>
            </Table>
            {!loadingMore && hasMore && (
              <div className="text-center">
                <Button className="load-more-btn" onClick={this.loadMore}>
                  Load more
                </Button>
              </div>
            )}
            {loadingMore && hasMore && (
              <div className="text-center">
                <Spinner animation="border" role="status" />
              </div>
            )}
            {!hasMore && <p className="no-more">No more results!</p>}
          </div>
        )}

        {isLoadingSetlist && (
          <div className="text-center">
            <Spinner animation="border" role="status" />
          </div>
        )}
      </div>
    )
  }
}

SetlistList.defaultProps = {
  setlists: [] || {},
  favsIds: [],
  loadingMore: false,
  hasMore: true
}

SetlistList.propTypes = {
  setlists: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.array
  ]),
  favsIds: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      setlistId: PropTypes.string
    })
  ),
  isLoadingSetlist: PropTypes.bool.isRequired,
  loadingMore: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  hasMore: PropTypes.bool,
  currPage: PropTypes.number.isRequired,
  fetchSetlistsConnect: PropTypes.func.isRequired,
  fetchSetlistsByCityConnect: PropTypes.func.isRequired,
  isLoadingMoreConnect: PropTypes.func.isRequired,
  isLoadingFavsConnect: PropTypes.func.isRequired,
  clearSetlistsConnect: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    setlists: state.setlists.items,
    currPage: state.setlists.currPage,
    favsIds: state.firestore.ordered.favs,
    isLoadingSetlist: state.setlists.isLoading,
    loadingMore: state.setlists.isLoadingMore,
    hasMore: state.setlists.hasMore
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSetlistsByCityConnect: city => dispatch(fetchSetlistsByCity(city)),
    isLoadingMoreConnect: val => dispatch(isLoadingMore(val)),
    isLoadingFavsConnect: val => dispatch(isLoadingFavs(val)),
    fetchSetlistsConnect: (formValues, currPage) =>
      dispatch(fetchSetlists(formValues, currPage)),
    clearSetlistsConnect: () => dispatch(clearSetlists())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetlistList)

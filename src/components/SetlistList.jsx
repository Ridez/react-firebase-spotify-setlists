import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { connect } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import MoreLink from './buttons/MoreLink'

import {
  fetchSetlistsByCity,
  fetchSetlists,
  isLoadingMore,
  clearSetlists
} from '../actions/setlists'

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

  renderList() {
    const { setlists } = this.props

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

          <td className="d-flex wrap-btns">
            Add/Remove <MoreLink setlist={setlist} />
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
  loadingMore: false,
  hasMore: true
}

SetlistList.propTypes = {
  setlists: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.array
  ]),
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
  clearSetlistsConnect: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    setlists: state.setlists.items,
    currPage: state.setlists.currPage,
    isLoadingSetlist: state.setlists.isLoading,
    loadingMore: state.setlists.isLoadingMore,
    hasMore: state.setlists.hasMore
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSetlistsByCityConnect: city => dispatch(fetchSetlistsByCity(city)),
    isLoadingMoreConnect: val => dispatch(isLoadingMore(val)),
    fetchSetlistsConnect: (formValues, currPage) =>
      dispatch(fetchSetlists(formValues, currPage)),
    clearSetlistsConnect: () => dispatch(clearSetlists())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetlistList)

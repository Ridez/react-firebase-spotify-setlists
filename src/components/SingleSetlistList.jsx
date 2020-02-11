import React from 'react'
import PropTypes from 'prop-types'
import Table from 'react-bootstrap/Table'
import { connect } from 'react-redux'

class SingleSetlistList extends React.Component {
  renderList() {
    const {
      setlist: {
        sets: { set }
      }
    } = this.props

    return set[0].song.map((song, index) => {
      return (
        <tr className="d-flex" key={song.name}>
          <td className="d-flex align-middle col-sm-1">{index + 1}</td>
          <td className="d-flex col-sm-6">{song.name}</td>
          <td className="d-flex align-middle col-sm-5 wrap-btns">
            Play / Spotify
          </td>
        </tr>
      )
    })
  }

  render() {
    const {
      setlist: {
        sets: { set }
      }
    } = this.props

    return (
      <Table responsive="xl" hover variant="dark">
        <tbody>
          {set.length ? (
            this.renderList()
          ) : (
            <tr>
              <td>Setlist not available!</td>
            </tr>
          )}
        </tbody>
      </Table>
    )
  }
}

SingleSetlistList.defaultProps = {
  setlist: [] || {}
}

SingleSetlistList.propTypes = {
  setlist: PropTypes.shape({
    sets: PropTypes.shape({
      set: PropTypes.array.isRequired
    })
  })
}

const mapStateToProps = state => {
  return {
    setlist: state.setlist.item[0]
  }
}

export default connect(mapStateToProps)(SingleSetlistList)

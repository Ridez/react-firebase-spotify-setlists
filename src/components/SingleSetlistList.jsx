import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import { setCurrentSong } from '../actions/spotify'

class SingleSetlistList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      spotifyLink: null
    }
  }

  setCurrentSong = index => {
    const { spotify, setCurrSong } = this.props

    // Find song with id
    const song = spotify.previews.find(preview => preview.id === index)

    if (song !== undefined && song.url !== undefined) {
      setCurrSong(song)
    }
  }

  setSpotifyLink = index => {
    const { spotify } = this.props

    const song = spotify.previews.find(preview => preview.id === index)

    this.setState({ spotifyLink: song.spotifyLink })
  }

  checkSongPlayAvailability = index => {
    const { spotify } = this.props

    const song = spotify.previews.find(preview => preview.id === index)

    const ava = { play: false, link: false }

    if (song) {
      if (song.url) {
        ava.play = true
      }
      if (song.spotifyLink) {
        ava.link = true
      }
    }
    return ava
  }

  renderList() {
    const { spotifyLink } = this.state
    const {
      setlist: {
        sets: { set }
      }
    } = this.props

    return set[0].song.map((song, index) => {
      return (
        <tr key={song.name}>
          <td>{index + 1}</td>
          <td>{song.name}</td>
          <td className="d-flex wrap-btns">
            {this.checkSongPlayAvailability(index).play ? (
              <Button
                onClick={() => this.setCurrentSong(index)}
                key={song.name}
                variant="primary"
              >
                Play
              </Button>
            ) : (
              <Button disabled variant="secondary">
                Play
              </Button>
            )}
            {this.checkSongPlayAvailability(index).link ? (
              <a rel="noreferrer noopener" target="_blank" href={spotifyLink}>
                <Button onClick={() => this.setSpotifyLink(index)}>
                  <FontAwesomeIcon icon={['fab', 'spotify']} />
                  Spotify
                </Button>
              </a>
            ) : (
              <Button disabled variant="secondary">
                <FontAwesomeIcon icon={['fab', 'spotify']} />
                Spotify
              </Button>
            )}
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
  spotify: PropTypes.shape({
    previews: PropTypes.array.isRequired
  }).isRequired,
  setlist: PropTypes.shape({
    sets: PropTypes.shape({
      set: PropTypes.array.isRequired
    })
  }),
  setCurrSong: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    setlist: state.setlist.item[0],
    spotify: state.spotify
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setCurrSong: songUrl => dispatch(setCurrentSong(songUrl))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleSetlistList)

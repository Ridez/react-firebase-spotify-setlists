/* eslint-disable jsx-a11y/media-has-caption */
import 'rc-slider/assets/index.css'

import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import WaveSurfer from 'wavesurfer.js'
import Slider from 'rc-slider'

import {
  getSong,
  clearPlaylist,
  checkMe,
  setIsValidToken,
  setCurrentSong
} from '../actions/spotify'
import {
  setVolumeRange,
  setIsPlaying,
  toggleVolumeMute,
  setCurrentTime
} from '../actions/player'

class SpotifyPlaylist extends React.Component {
  constructor(props) {
    super(props)

    this.audioRef = React.createRef()
  }

  componentDidMount() {
    const {
      clearPlayls,
      setIsPlayingConnect,
      setCurrTime,
      checkMeConnect,
      setIsValidTokenConnect,
      setCurrSong
    } = this.props

    // Clear prev Spotify playlist
    clearPlayls()

    // Check access to Spotify
    setIsValidTokenConnect(false)
    checkMeConnect()

    this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#fff',
      progressColor: '#7f8084',
      height: 80,
      width: 150,
      barWidth: 3
    })

    // set initial song for Player
    setCurrSong()

    // Set initial volume
    this.wavesurfer.setVolume(0.05)

    // Stop player on song finish
    this.wavesurfer.on('finish', () => {
      setIsPlayingConnect(false)
    })

    // Set initial formated value for player timer
    setCurrTime(this.formatTime(0))

    // Fire timer listener
    this.updateCurrTime()
  }

  componentDidUpdate(prevProps) {
    const { currSong, setIsPlayingConnect, spotify } = this.props

    if (currSong !== prevProps.currSong) {
      if (currSong.url) {
        this.wavesurfer.load(currSong.url)
        if (prevProps.currSong !== null) {
          this.wavesurfer.on('ready', () => {
            this.wavesurfer.play()
            setIsPlayingConnect(true)
          })
        }
      }
    }

    if (spotify.isValidToken !== prevProps.spotify.isValidToken) {
      if (spotify.isValidToken) {
        // Fetch available songs from Spotify
        this.getPlaylist()
      }
    }
  }

  componentWillUnmount() {
    const { clearPlayls, setIsPlayingConnect } = this.props

    // clear Player on umnount
    setIsPlayingConnect(false)
    clearPlayls()
    this.wavesurfer.pause()
  }

  onSliderChange = value => {
    const { setVolRange } = this.props

    this.wavesurfer.setVolume(value)

    // Set state for slider range display
    setVolRange(value)
  }

  getPlaylist = () => {
    const { setlist, getSongConnect } = this.props
    const playlist = setlist.sets.set
    const artist = setlist.artist.name

    if (playlist.length) {
      playlist[0].song.forEach((song, index) => {
        getSongConnect(`"${artist} ${song.name}"`, index)
      })
    }
  }

  playIt = () => {
    const { player, setIsPlayingConnect } = this.props

    this.wavesurfer.playPause()

    // Set state for icon display
    setIsPlayingConnect(!player.isPlaying)
  }

  muteIt = () => {
    const { toggleVolMute } = this.props

    this.wavesurfer.toggleMute()

    // Set state for icon display
    toggleVolMute()
  }

  updateCurrTime = () => {
    const { setCurrTime } = this.props
    let currentTime = 0
    let newTime = 0

    this.wavesurfer.on('audioprocess', () => {
      newTime = this.formatTime(this.wavesurfer.getCurrentTime())

      if (currentTime !== newTime) {
        currentTime = newTime
        setCurrTime(newTime)
      }
    })
  }

  formatTime = time => {
    return [
      Math.floor((time % 3600) / 60), // minutes
      `00${Math.floor(time % 60)}`.slice(-2) // seconds
    ].join(':')
  }

  renderVolumeIcon = () => {
    const { player } = this.props

    if (!player.isMuted) {
      if (player.range < 0.5) {
        return <FontAwesomeIcon onClick={this.muteIt} icon="volume-down" />
      }
      return <FontAwesomeIcon onClick={this.muteIt} icon="volume-up" />
    }
    return <FontAwesomeIcon onClick={this.muteIt} icon="volume-mute" />
  }

  render() {
    const { spotify, player } = this.props
    return (
      <div>
        <div style={{ height: 80, width: '100%' }} id="waveform" />
        {this.wavesurfer !== undefined && (
          <div className="wrap-ui">
            <span className="curr-time">
              {player.currTime}
              <span>/</span>
              {this.formatTime(this.wavesurfer.getDuration())}
            </span>
            {player.isPlaying ? (
              <FontAwesomeIcon
                onClick={this.playIt}
                icon={['far', 'pause-circle']}
              />
            ) : (
              <FontAwesomeIcon
                onClick={this.playIt}
                icon={['far', 'play-circle']}
              />
            )}
            <div className="wrap-volume">
              {this.renderVolumeIcon()}
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={player.range}
                onChange={this.onSliderChange}
              />
            </div>

            <audio
              style={{ display: 'none' }}
              ref={this.audioRef}
              controls
              src={spotify.previews[0]}
            />
          </div>
        )}
      </div>
    )
  }
}

SpotifyPlaylist.defaultProps = {
  currSong: null,
  setlist: [] || {}
}

SpotifyPlaylist.propTypes = {
  spotify: PropTypes.shape({
    previews: PropTypes.array.isRequired,
    isValidToken: PropTypes.bool.isRequired
  }).isRequired,
  currSong: PropTypes.shape({
    url: PropTypes.string.isRequired
  }),
  setlist: PropTypes.shape({
    sets: PropTypes.shape({
      set: PropTypes.array.isRequired
    }),
    artist: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  }),
  player: PropTypes.shape({
    range: PropTypes.number.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    isMuted: PropTypes.bool.isRequired,
    currTime: PropTypes.number.isRequired
  }).isRequired,
  clearPlayls: PropTypes.func.isRequired,
  getSongConnect: PropTypes.func.isRequired,
  checkMeConnect: PropTypes.func.isRequired,
  setIsPlayingConnect: PropTypes.func.isRequired,
  setVolRange: PropTypes.func.isRequired,
  toggleVolMute: PropTypes.func.isRequired,
  setCurrTime: PropTypes.func.isRequired,
  setCurrSong: PropTypes.func.isRequired,
  setIsValidTokenConnect: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    setlist: state.setlist.item[0],
    spotify: state.spotify,
    player: state.player,
    currSong: state.spotify.currSong
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSongConnect: (search, index) => dispatch(getSong(search, index)),
    checkMeConnect: () => dispatch(checkMe()),
    setIsValidTokenConnect: val => dispatch(setIsValidToken(val)),
    clearPlayls: () => dispatch(clearPlaylist()),
    setVolRange: range => dispatch(setVolumeRange(range)),
    setIsPlayingConnect: val => dispatch(setIsPlaying(val)),
    toggleVolMute: () => dispatch(toggleVolumeMute()),
    setCurrTime: time => dispatch(setCurrentTime(time)),
    setCurrSong: song => dispatch(setCurrentSong(song))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyPlaylist)

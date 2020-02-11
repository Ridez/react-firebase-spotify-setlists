import spotify from '../apis/spotify'
import spotifyAuth from '../apis/setlists'

export const checkMe = () => async dispatch => {
  if (localStorage.getItem('refreshToken') && localStorage.getItem('token')) {
    try {
      const response = await spotify.get('/me')
      if (response.status === 200) {
        dispatch({
          type: 'IS_VALID_TOKEN',
          payload: true
        })
      }
    } catch (err) {
      if (err.response.status === 401) {
        dispatch({
          type: 'IS_VALID_TOKEN',
          payload: false
        })

        const res = await spotifyAuth.get('/refresh_token', {
          params: {
            refresh_token: localStorage.getItem('refreshToken')
          }
        })

        if (res.status === 200) {
          localStorage.setItem('token', res.data.access_token)

          spotify.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
            'token'
          )}`

          dispatch({
            type: 'IS_VALID_TOKEN',
            payload: true
          })
        }
      }
    }
  }
}

export const getSong = (search, index) => async dispatch => {
  const response = await spotify.get('/search', {
    params: {
      q: search,
      type: 'track'
    }
  })

  if (response.data.tracks.total) {
    dispatch({
      type: 'ADD_TO_PLAYLIST',
      payload: { id: index, data: response.data.tracks.items[0] }
    })
  }
}

export const setIsValidToken = val => {
  return { type: 'IS_VALID_TOKEN', payload: val }
}

export const setCurrentSong = songUrl => {
  let song = songUrl

  if (!song) {
    song = {
      id: 1,
      url:
        'https://p.scdn.co/mp3-preview/f504e6b8e037771318656394f532dede4f9bcaea?cid=82b3aa3f49e14747ad4a443876f8dfe6',
      spotifyLink: 'https://open.spotify.com/track/5ChkMS8OtdzJeqyybCc9R5'
    }
  }
  return { type: 'SET_CURRENT_SONG', payload: song }
}

export const clearPlaylist = () => {
  return { type: 'CLEAR_PLAYLIST' }
}

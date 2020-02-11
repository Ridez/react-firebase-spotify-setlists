export default (
  state = {
    previews: [],
    ids: [],
    currSong: null,
    isValidToken: false
  },
  action
) => {
  switch (action.type) {
    case 'ADD_TO_PLAYLIST':
      return {
        ...state,
        previews: [
          ...state.previews,
          {
            id: action.payload.id,
            url: action.payload.data.preview_url,
            spotifyLink: action.payload.data.external_urls.spotify
          }
        ],
        ids: [...state.ids, action.payload.data.id]
      }
    case 'SET_CURRENT_SONG':
      return { ...state, currSong: action.payload }
    case 'CLEAR_PLAYLIST':
      return { ...state, previews: [], ids: [], currSong: null }
    case 'IS_VALID_TOKEN':
      return {
        ...state,
        isValidToken: action.payload
      }
    default:
      return state
  }
}

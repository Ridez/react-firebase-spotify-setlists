export default (
  state = {
    favs: [],
    favsErr: false,
    favsLength: 0,
    isLoadingFavs: true
  },
  action
) => {
  switch (action.type) {
    case 'ADD_TO_FAVS_ERROR':
      return { ...state, isLoadingFavs: true, favsErr: action.payload }
    case 'REMOVE_FROM_FAVS_ERROR':
      return { ...state, favsErr: action.payload }
    case 'FETCH_SETLISTS_BY_SETLIST_ID':
      return { ...state, isLoadingFavs: false, favs: action.payload }
    case 'SET_FAVS_LENGTH':
      return { ...state, favsLength: action.payload }
    case 'IS_LOADING_FAVS':
      return { ...state, isLoadingFavs: action.payload }
    default:
      return state
  }
}

export default (
  state = {
    favsErr: false
  },
  action
) => {
  switch (action.type) {
    case 'ADD_TO_FAVS_ERROR':
      return { ...state, favsErr: action.payload }
    case 'REMOVE_FROM_FAVS_ERROR':
      return { ...state, favsErr: action.payload }

    default:
      return state
  }
}

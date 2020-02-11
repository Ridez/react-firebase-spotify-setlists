export default (
  state = {
    isLoadingSingle: true,
    item: []
  },
  action
) => {
  switch (action.type) {
    case 'LOADING_SINGLE':
      return { ...state, isLoadingSingle: action.payload }
    case 'FETCH_SETLIST':
      return { ...state, isLoadingSingle: false, item: action.payload }
    default:
      return state
  }
}

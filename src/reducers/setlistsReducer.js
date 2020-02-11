export default (
  state = {
    isLoading: true,
    isLoadingMore: false,
    hasMore: true,
    items: [],
    currPage: 1
  },
  action
) => {
  switch (action.type) {
    case 'IS_LOADING':
      return { ...state, isLoading: action.payload }
    case 'IS_LOADING_MORE':
      return { ...state, isLoadingMore: action.payload }
    case 'SET_HAS_MORE':
      return { ...state, hasMore: false }
    case 'FETCH_SETLISTS':
      return {
        ...state,
        isLoading: false,
        hasMore: true,
        isLoadingMore: false,
        items: [...state.items, ...action.payload.setlist],
        currPage: action.payload.page
      }
    case 'FETCH_SETLISTS_BY_CITY':
      return {
        ...state,
        isLoading: false,
        items: action.payload
      }
    case 'CLEAR_SETLISTS':
      return {
        isLoading: true,
        items: [],
        currPage: 1
      }
    default:
      return state
  }
}

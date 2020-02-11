import setlists from '../apis/setlists'

export const fetchSetlist = searchValues => async dispatch => {
  const response = await setlists.get('/setlist', {
    params: {
      search: searchValues
    }
  })
  dispatch({ type: 'FETCH_SETLIST', payload: response.data })
}

export const loadingSingle = val => {
  return { type: 'LOADING_SINGLE', payload: val }
}

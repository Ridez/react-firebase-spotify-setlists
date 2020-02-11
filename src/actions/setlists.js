import setlists from '../apis/setlists'

export const fetchSetlists = (formValues, currPage) => async dispatch => {
  const response = await setlists.get('/setlists', {
    params: {
      search: formValues,
      page: currPage
    }
  })

  if (response.data === 'Not found!') {
    dispatch({ type: 'SET_HAS_MORE' })
  } else {
    dispatch({ type: 'FETCH_SETLISTS', payload: response.data })
  }
}

export const fetchSetlistsByCity = city => async dispatch => {
  const response = await setlists.get('/setlistsByCity', {
    params: {
      search: city
    }
  })

  dispatch({ type: 'FETCH_SETLISTS_BY_CITY', payload: response.data.setlist })
}

export const clearSetlists = () => {
  return { type: 'CLEAR_SETLISTS' }
}

export const isLoading = val => {
  return { type: 'IS_LOADING', payload: val }
}

export const isLoadingMore = val => {
  return { type: 'IS_LOADING_MORE', payload: val }
}

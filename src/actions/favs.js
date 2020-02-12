import setlists from '../apis/setlists'

export const addToFavs = (setlistId, uid) => (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore()
  firestore
    .collection('users')
    .doc(uid)
    .collection('setlists')
    .doc(setlistId)
    .set({
      setlistId
    })
    .then(() => {
      dispatch({ type: 'ADD_TO_FAVS_ERROR', payload: false })
    })
    .catch(() => {
      dispatch({ type: 'ADD_TO_FAVS_ERROR', payload: true })
    })
}

export const removeFromFavs = (setlistId, uid) => (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore()
  firestore
    .collection('users')
    .doc(uid)
    .collection('setlists')
    .doc(setlistId)
    .delete()
    .then(() => {
      dispatch({ type: 'REMOVE_FROM_FAVS_ERROR', payload: false })
    })
    .catch(() => {
      dispatch({ type: 'REMOVE_FROM_FAVS_ERROR', payload: true })
    })
}

export const setFavsLength = arrLength => {
  return { type: 'SET_FAVS_LENGTH', payload: arrLength }
}

export const fetchSetlistsBySetlistId = setlistId => async dispatch => {
  const response = setlistId.map(id =>
    setlists.get('/setlistsBySetlistId', {
      params: {
        search: id.id
      }
    })
  )
  Promise.all(response).then(array => {
    // Sort DESC array by date property
    array.sort((a, b) => {
      const aa = new Date(
        a.data.eventDate
          .split('-')
          .reverse()
          .join()
      )
      const bb = new Date(
        b.data.eventDate
          .split('-')
          .reverse()
          .join()
      )

      if (aa > bb) {
        return -1
      }
      if (aa < bb) {
        return 1
      }
      return 0
    })

    dispatch({
      type: 'FETCH_SETLISTS_BY_SETLIST_ID',
      payload: array
    })
  })
}

export const isLoadingFavs = val => {
  return { type: 'IS_LOADING_FAVS', payload: val }
}

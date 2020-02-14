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
    .doc(setlistId.id)
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

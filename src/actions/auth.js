export const signIn = (token, uid) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase()
  const firestore = getFirestore()

  firebase
    .auth()
    .signInWithCustomToken(token)
    .then(() => {
      firestore
        .collection('users')
        .doc(uid)
        .set({ uid })
      dispatch({ type: 'LOGIN_SUCCESS', payload: true })
    })
}

export const signOut = () => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase()

  firebase
    .auth()
    .signOut()
    .then(() => {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    })
}

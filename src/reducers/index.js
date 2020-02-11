import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import setlistsReducer from './setlistsReducer'
import setlistReducer from './setlistReducer'

export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  setlists: setlistsReducer,
  setlist: setlistReducer
})

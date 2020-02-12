import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import setlistsReducer from './setlistsReducer'
import setlistReducer from './setlistReducer'
import spotifyReducer from './spotifyReducer'
import playerReducer from './playerReducer'
import favsReducer from './favsReducer'

export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  setlists: setlistsReducer,
  setlist: setlistReducer,
  spotify: spotifyReducer,
  player: playerReducer,
  favs: favsReducer
})

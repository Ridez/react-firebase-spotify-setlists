export default (
  state = {
    loggedIn: false
  },
  action
) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, loggedIn: action.payload }
    case 'SIGNOUT_SUCCESS':
      return state
    default:
      return state
  }
}

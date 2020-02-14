export default (
  state = {
    range: 0.05,
    isPlaying: false,
    isMuted: false,
    currTime: '0'
  },
  action
) => {
  switch (action.type) {
    case 'SET_IS_PLAYING':
      return {
        ...state,
        isPlaying: action.payload
      }
    case 'SET_VOLUME_RANGE':
      return {
        ...state,
        range: action.payload
      }
    case 'TOGGLE_VOLUME_MUTE':
      return {
        ...state,
        isMuted: !state.isMuted
      }
    case 'SET_CURRENT_TIME':
      return {
        ...state,
        currTime: action.payload
      }
    default:
      return state
  }
}

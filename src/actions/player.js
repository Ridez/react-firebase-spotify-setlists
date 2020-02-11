export const setIsPlaying = isPlaying => {
  return { type: 'SET_IS_PLAYING', payload: isPlaying }
}

export const setVolumeRange = range => {
  return { type: 'SET_VOLUME_RANGE', payload: range }
}

export const toggleVolumeMute = () => {
  return { type: 'TOGGLE_VOLUME_MUTE' }
}

export const setCurrentTime = time => {
  return { type: 'SET_CURRENT_TIME', payload: time }
}

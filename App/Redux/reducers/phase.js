import Immutable from 'immutable'
import { Actions,
  SET_COLOR,
  NEXT_PHASE,
  START_GAME,
  REPEAT_AUDIO,
  RESET_GAME,
  EXIT_GAME  } from '../actions'

const addNewColor = (colorSequence, newColor) => {
  if(colorSequence.size > 6){
    colorSequence = colorSequence.shift()
  }
  return colorSequence.push(newColor)
}

export default function(state, action){
  if(state === undefined) {
    state = Immutable.fromJS({
      colorSequence: [],
      phaseLevel: 0,
      justPassed: false,
      audioFileName: '',
      correctSequence: require('../../API/index.js').default
    })
  }
  switch (action.type) {
    case SET_COLOR:

      let newSequence = addNewColor(state.get('colorSequence'), action.color)
      let newState = state.set('colorSequence', newSequence).set('justPassed', false)

      return newState
    case REPEAT_AUDIO:
      return state.set('justPassed', true)
    case RESET_GAME:
      return state.set('justPasse', false)
                  .set('audioFileName', '')
                  .set('colorSequence', [])
                  .set('phaseLevel', 0)
    case NEXT_PHASE:
      let phaseLevel = state.get('phaseLevel')
      let newPhaseLevel = phaseLevel + 1
      let audioFileName = newPhaseLevel  + '.mp3'

      return state.set('justPassed', true)
             .set('phaseLevel', newPhaseLevel)
             .set('colorSequence', Immutable.fromJS([]))
             .set('audioFileName', audioFileName)
    case START_GAME:
      phaseLevel = 0
      newPhaseLevel = phaseLevel + 1
      audioFileName = newPhaseLevel  + '.mp3'

      return state.set('justPassed', true)
             .set('phaseLevel', newPhaseLevel)
             .set('colorSequence', Immutable.fromJS([]))
             .set('audioFileName', audioFileName)
  default:
    return state
  }
}

export const SET_COLOR = 'SET_COLOR'
export const CHECK_COLOR_SEQUENCE = 'CHECK_COLOR_SEQUENCE'
export const START_GAME = 'START_GAME'

// PHASE

export const NEXT_PHASE = 'NEXT_PHASE'


/* COLOR SEQUENCE ACTIONS */

const setColor = (color) => {
  return {
    type: SET_COLOR,
    color,
  }
}

/* PHASE */

const startGame = () => {
  return {
    type: START_GAME,
  }
}

const nextPhase = () => {
  return {
    type: NEXT_PHASE
  }
}

const addColor = (color) => {
  return (dispatch, getState) => {
      dispatch(Actions.setColor(color))
      dispatch(Actions.checkColorSequence())
    }
}

let checkColorSequence = (state) => {
  return (dispatch, getState) => {
      let state = getState().phase
      let phaseLevel = state.get('phaseLevel')
      let actualCode = state.get('colorSequence').toJSON()
      let correctSequence = state.get('correctSequence').toJSON()[phaseLevel].code

      if(actualCode.toString() == correctSequence.toString()){
        dispatch(Actions.nextPhase())
      }
    }
}

export const Actions = {
  setColor,
  nextPhase,
  startGame,
  addColor,
  checkColorSequence,
}

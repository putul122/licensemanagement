import { createAction, handleActions } from 'redux-actions'
import { ACTIVITY_MESSAGE_SUCCESS } from '../../sagas/applicationActivity/applicationActivitySaga'
// Name Spaced Action Types
const SET_COMPONENT_ID = 'applicationActivityReducer/SET_COMPONENT_ID'

export const actions = {
  ACTIVITY_MESSAGE_SUCCESS,
  SET_COMPONENT_ID
}

export const actionCreators = {
  setComponentId: createAction(SET_COMPONENT_ID)
}

export const initialState = {
  activityMessages: '',
  componentId: ''
}

export default handleActions(
  {
    [ACTIVITY_MESSAGE_SUCCESS]: (state, action) => ({
      ...state,
      activityMessages: action.payload
    }),
    [SET_COMPONENT_ID]: (state, action) => ({
      ...state,
      componentId: action.payload
    })
  },
  initialState
)

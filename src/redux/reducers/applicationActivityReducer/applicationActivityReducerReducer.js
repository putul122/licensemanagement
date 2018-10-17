import { handleActions } from 'redux-actions'
import { ACTIVITY_MESSAGE_SUCCESS } from '../../sagas/applicationActivity/applicationActivitySaga'
// Name Spaced Action Types

export const actions = {
  ACTIVITY_MESSAGE_SUCCESS
}

export const actionCreators = {}

export const initialState = {
  activityMessages: ''
}

export default handleActions(
  {
    [ACTIVITY_MESSAGE_SUCCESS]: (state, action) => ({
      ...state,
      activityMessages: action.payload
    })
  },
  initialState
)

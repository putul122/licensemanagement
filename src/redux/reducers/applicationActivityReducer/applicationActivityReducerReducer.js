import { createAction, handleActions } from 'redux-actions'
import { ACTIVITY_MESSAGE_SUCCESS } from '../../sagas/applicationActivity/applicationActivitySaga'
// Name Spaced Action Types
const SET_CURRENT_PAGE = 'applicationActivityReducer/SET_CURRENT_PAGE'

export const actions = {
  ACTIVITY_MESSAGE_SUCCESS,
  SET_CURRENT_PAGE
}

export const actionCreators = {
  setCurrentPage: createAction(SET_CURRENT_PAGE)
}

export const initialState = {
  activityMessages: '',
  currentPage: 1
}

export default handleActions(
  {
    [ACTIVITY_MESSAGE_SUCCESS]: (state, action) => ({
      ...state,
      activityMessages: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    })
  },
  initialState
)

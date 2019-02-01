import { createAction, handleActions } from 'redux-actions'
import { ACTIVITY_MESSAGE_SUCCESS } from '../../sagas/applicationActivity/applicationActivitySaga'
// Name Spaced Action Types
const SET_COMPONENT_ID = 'applicationActivityReducer/SET_COMPONENT_ID'
const SET_CURRENT_PAGE = 'applicationActivityReducer/SET_CURRENT_PAGE'

export const actions = {
  ACTIVITY_MESSAGE_SUCCESS,
  SET_COMPONENT_ID,
  SET_CURRENT_PAGE
}

export const actionCreators = {
  setComponentId: createAction(SET_COMPONENT_ID),
  setCurrentPage: createAction(SET_CURRENT_PAGE)
}

export const initialState = {
  activityMessages: '',
  componentId: '',
  currentPage: 1
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
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    })
  },
  initialState
)

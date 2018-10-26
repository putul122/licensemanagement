import { createAction, handleActions } from 'redux-actions'
import {FETCH_SOFTWARE_BY_ID_SUCCESS, FETCH_SOFTWARE_PROPERTIES_SUCCESS,
  FETCH_SOFTWARE_RELATIONSHIPS_SUCCESS} from '../../sagas/software/softwareSaga'
// Name Spaced Action Types
// const INCREMENT = 'BasicReducer/INCREMENT'
// const DECREMENT = 'BasicReducer/DECREMENT'
const SET_CURRENT_TAB = 'softwareDetailReducer/SET_CURRENT_TAB'
export const actions = {
//   FETCH_APPLICATIONS_SUMMARY_SUCCESS,
//   FETCH_APPLICATIONS_SUCCESS,
  FETCH_SOFTWARE_BY_ID_SUCCESS,
  FETCH_SOFTWARE_PROPERTIES_SUCCESS,
  FETCH_SOFTWARE_RELATIONSHIPS_SUCCESS
}

export const actionCreators = {
//   increment: createAction(INCREMENT),
//   decrement: createAction(DECREMENT)
setCurrentTab: createAction(SET_CURRENT_TAB)
}

export const initialState = {
      softwarebyId: '',
      softwareProperties: '',
      softwareRelationships: '',
      showTabs: {'showProperty': ' active show', 'showRelationship': ''}
 }

export default handleActions(
  {
    [FETCH_SOFTWARE_BY_ID_SUCCESS]: (state, action) => ({
      ...state,
      softwarebyId: action.payload
    }),
    [FETCH_SOFTWARE_PROPERTIES_SUCCESS]: (state, action) => ({
      ...state,
      softwareProperties: action.payload
    }),
    [SET_CURRENT_TAB]: (state, action) => ({
      ...state,
      showTabs: action.payload
    }),
    [FETCH_SOFTWARE_RELATIONSHIPS_SUCCESS]: (state, action) => ({
      ...state,
      softwareRelationships: action.payload
    })
  },
  initialState
)

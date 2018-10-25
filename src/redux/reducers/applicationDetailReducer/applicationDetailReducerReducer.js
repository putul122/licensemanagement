import { createAction, handleActions } from 'redux-actions'
import {FETCH_APPLICATIONS_SUMMARY_SUCCESS,
   FETCH_APPLICATIONS_SUCCESS,
   FETCH_APPLICATION_BY_ID_SUCCESS,
   FETCH_APPLICATION_PROPERTIES_SUCCESS,
   FETCH_APPLICATION_RELATIONSHIPS_SUCCESS}
   from '../../sagas/application/applicationSaga'
// Name Spaced Action Types
// const INCREMENT = 'BasicReducer/INCREMENT'
// const DECREMENT = 'BasicReducer/DECREMENT'
const SET_CURRENT_TAB = 'applicationDetailReducer/SET_CURRENT_TAB'
export const actions = {
  FETCH_APPLICATIONS_SUMMARY_SUCCESS,
  FETCH_APPLICATIONS_SUCCESS,
  FETCH_APPLICATION_BY_ID_SUCCESS,
  FETCH_APPLICATION_PROPERTIES_SUCCESS,
  FETCH_APPLICATION_RELATIONSHIPS_SUCCESS,
  SET_CURRENT_TAB
}

export const actionCreators = {
//   increment: createAction(INCREMENT),
//   decrement: createAction(DECREMENT)
  setCurrentTab: createAction(SET_CURRENT_TAB)
}

export const initialState = {
  application: '',
  applicationSummary: '',
  applicationbyId: '',
  applicationProperties: '',
  applicationRelationships: '',
  showTabs: {'showProperty': ' active show', 'showRelationship': ''}
 }

export default handleActions(
  {
    [FETCH_APPLICATIONS_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      applicationSummary: action.payload
    }),
    [FETCH_APPLICATIONS_SUCCESS]: (state, action) => ({
      ...state,
      application: action.payload
    }),
    [FETCH_APPLICATION_BY_ID_SUCCESS]: (state, action) => ({
      ...state,
      applicationbyId: action.payload
    }),
    [FETCH_APPLICATION_PROPERTIES_SUCCESS]: (state, action) => ({
      ...state,
      applicationProperties: action.payload
    }),
    [SET_CURRENT_TAB]: (state, action) => ({
      ...state,
      showTabs: action.payload
    }),
    [FETCH_APPLICATION_RELATIONSHIPS_SUCCESS]: (state, action) => ({
      ...state,
      applicationRelationships: action.payload
    })
  },
  initialState
)

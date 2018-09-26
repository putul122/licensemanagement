import {createAction, handleActions} from 'redux-actions'
import {FETCH_SOFTWARES_SUCCESS, FETCH_SOFTWARES_SUMMARY_SUCCESS, FETCH_SOFTWARE_AGREEMENTS_SUCCESS} from '../../sagas/software/softwareSaga'
// Name Spaced Action Types
// const INCREMENT = 'BasicReducer/INCREMENT'
const SET_CURRENT_PAGE = 'softwaresReducer/SET_CURRENT_PAGE'
const SET_EXPAND_SETTINGS = 'softwaresReducer/SET_EXPAND_SETTINGS'
const RESET_RESPONSE = 'softwaresReducer/RESET_RESPONSE'

export const actions = {
FETCH_SOFTWARES_SUCCESS,
FETCH_SOFTWARES_SUMMARY_SUCCESS,
SET_CURRENT_PAGE,
FETCH_SOFTWARE_AGREEMENTS_SUCCESS,
SET_EXPAND_SETTINGS,
RESET_RESPONSE
}

export const actionCreators = {
  setCurrentPage: createAction(SET_CURRENT_PAGE),
  setExpandSettings: createAction(SET_EXPAND_SETTINGS),
  resetResponse: createAction(RESET_RESPONSE)
}

export const initialState = {
  software: '',
  softwareSummary: '',
  currentPage: 1,
  softwareAgreements: '',
  expandSettings: {
    selectedId: '',
    expandFlag: false
  }

}

export default handleActions(
  {
    [FETCH_SOFTWARES_SUCCESS]: (state, action) => ({
      ...state,
      software: action.payload
    }),
    [FETCH_SOFTWARES_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      softwareSummary: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    }),
    [FETCH_SOFTWARE_AGREEMENTS_SUCCESS]: (state, action) => ({
      ...state,
      softwareAgreements: action.payload
    }),
    [SET_EXPAND_SETTINGS]: (state, action) => ({
      ...state,
      expandSettings: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      softwareAgreements: {resources: []}
    })
  },
  initialState
)

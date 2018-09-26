import {createAction, handleActions} from 'redux-actions'
import {FETCH_APPLICATIONS_SUMMARY_SUCCESS, FETCH_APPLICATIONS_SUCCESS, FETCH_APPLICATION_SOFTWARES_SUCCESS} from '../../sagas/application/applicationSaga'
// import {FETCH_APPLICATIONS_SUCCESS} from '../../sagas/application/applicationSaga'
const SET_CURRENT_PAGE = 'applicationsReducer/SET_CURRENT_PAGE'
const SET_EXPAND_SETTINGS = 'applicationsReducer/SET_EXPAND_SETTINGS'
const RESET_RESPONSE = 'applicationsReducer/RESET_RESPONSE'

export const actions = {
FETCH_APPLICATIONS_SUMMARY_SUCCESS,
FETCH_APPLICATIONS_SUCCESS,
SET_CURRENT_PAGE,
FETCH_APPLICATION_SOFTWARES_SUCCESS,
SET_EXPAND_SETTINGS,
RESET_RESPONSE
}

export const actionCreators = {
  setCurrentPage: createAction(SET_CURRENT_PAGE),
  setExpandSettings: createAction(SET_EXPAND_SETTINGS),
  resetResponse: createAction(RESET_RESPONSE)
}

export const initialState = {
   application: '',
   applicationSummary: '',
   applicationSoftwares: '',
   currentPage: 1,
   expandSettings: {
    selectedId: '',
    expandFlag: false
  }
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
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    }),
    [FETCH_APPLICATION_SOFTWARES_SUCCESS]: (state, action) => ({
      ...state,
      applicationSoftwares: action.payload
    }),
    [SET_EXPAND_SETTINGS]: (state, action) => ({
      ...state,
      expandSettings: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      applicationSoftwares: {resources: []}
    })
  },
  initialState
)

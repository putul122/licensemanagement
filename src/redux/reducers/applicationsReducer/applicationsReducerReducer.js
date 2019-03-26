import {createAction, handleActions} from 'redux-actions'
import {FETCH_APPLICATIONS_SUMMARY_SUCCESS, FETCH_APPLICATIONS_SUCCESS, FETCH_APPLICATION_ENTITLEMENTS_SUCCESS, FETCH_APPLICATION_SOFTWARES_SUCCESS} from '../../sagas/application/applicationSaga'
// import {FETCH_APPLICATIONS_SUCCESS} from '../../sagas/application/applicationSaga'
import {FETCH_BUSINESS_UNITS_SUCCESS} from '../../sagas/basic/basicSaga'
const SET_CURRENT_PAGE = 'applicationsReducer/SET_CURRENT_PAGE'
const SET_EXPAND_SETTINGS = 'applicationsReducer/SET_EXPAND_SETTINGS'
const RESET_RESPONSE = 'applicationsReducer/RESET_RESPONSE'
const SET_DEFAULT_SELECT = 'applicationsReducer/SET_DEFAULT_SELECT'
const SET_PER_PAGE = 'applicationsReducer/SET_PER_PAGE'
const SET_BUSINESS_UNIT_ID = 'applicationsReducer/SET_BUSINESS_UNIT_ID'

export const actions = {
FETCH_APPLICATIONS_SUMMARY_SUCCESS,
FETCH_APPLICATIONS_SUCCESS,
SET_CURRENT_PAGE,
FETCH_APPLICATION_SOFTWARES_SUCCESS,
FETCH_APPLICATION_ENTITLEMENTS_SUCCESS,
FETCH_BUSINESS_UNITS_SUCCESS,
SET_EXPAND_SETTINGS,
RESET_RESPONSE,
SET_DEFAULT_SELECT,
SET_PER_PAGE,
SET_BUSINESS_UNIT_ID
}

export const actionCreators = {
  setCurrentPage: createAction(SET_CURRENT_PAGE),
  setExpandSettings: createAction(SET_EXPAND_SETTINGS),
  resetResponse: createAction(RESET_RESPONSE),
  setDefaultSelect: createAction(SET_DEFAULT_SELECT),
  setPerPage: createAction(SET_PER_PAGE),
  setbusinessUnitId: createAction(SET_BUSINESS_UNIT_ID)
}

export const initialState = {
   application: '',
   applicationSummary: '',
   applicationSoftwares: '',
   businessUnits: '',
   businessUnitId: '',
   currentPage: 1,
   perPage: 10,
   expandSettings: {
    selectedId: '',
    expandFlag: false
  },
  applicationEntitlements: ''
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
    [SET_PER_PAGE]: (state, action) => ({
      ...state,
      perPage: action.payload
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
    }),
    [FETCH_BUSINESS_UNITS_SUCCESS]: (state, action) => ({
      ...state,
      businessUnits: action.payload
    }),
    [SET_DEFAULT_SELECT]: (state, action) => ({
      ...state,
      defaultSelect: action.payload
    }),
    [SET_BUSINESS_UNIT_ID]: (state, action) => ({
      ...state,
      businessUnitId: action.payload
    }),
    [FETCH_APPLICATION_ENTITLEMENTS_SUCCESS]: (state, action) => ({
      ...state,
      applicationEntitlements: action.payload
    })
  },
  initialState
)

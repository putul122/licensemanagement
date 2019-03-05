import { createAction, handleActions } from 'redux-actions'
import { FETCH_BUSINESSUNITS_SUCCESS, FETCH_BUSINESSUNITS_SUMMARY_SUCCESS } from '../../sagas/businessUnits/businessUnitsSaga'
// import { CREATE_USER_SUCCESS } from '../../sagas/signUp/signUpSaga'
// Name Spaced Action Types
const SET_CURRENT_PAGE = 'BusinessUnitsReducer/SET_CURRENT_PAGE'
const SET_PER_PAGE = 'BusinessUnitsReducer/SET_PER_PAGE'
// const RESET_RESPONSE = 'ProjectsReducer/RESET_RESPONSE'
// const SET_CREATE_USER_PROCESS_STATUS = 'BasicReducer/SET_CREATE_USER_PROCESS_STATUS'

export const actions = {
//   CREATE_PROJECT_SUCCESS,
//   RESET_RESPONSE,
  FETCH_BUSINESSUNITS_SUMMARY_SUCCESS,
  FETCH_BUSINESSUNITS_SUCCESS,
  SET_CURRENT_PAGE,
  SET_PER_PAGE
}

export const actionCreators = {
  setCurrentPage: createAction(SET_CURRENT_PAGE),
  setPerPage: createAction(SET_PER_PAGE)
//   resetResponse: createAction(RESET_RESPONSE)
}

export const initialState = {
  businessUnitsSummary: '',
  businessUnits: '',
  currentPage: 1,
  perPage: 10
}

export default handleActions(
  {
    // [CREATE_PROJECT_SUCCESS]: (state, action) => ({
    // ...state,
    // createProjectResponse: action.payload
    // }),
    [FETCH_BUSINESSUNITS_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      businessUnitsSummary: action.payload
    }),
    [FETCH_BUSINESSUNITS_SUCCESS]: (state, action) => ({
      ...state,
      businessUnits: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    }),
    [SET_PER_PAGE]: (state, action) => ({
      ...state,
      perPage: action.payload
    })
  },
  initialState
)

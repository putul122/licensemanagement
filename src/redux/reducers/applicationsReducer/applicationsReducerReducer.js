import {createAction, handleActions} from 'redux-actions'
import {FETCH_APPLICATIONS_SUMMARY_SUCCESS, FETCH_APPLICATIONS_SUCCESS} from '../../sagas/application/applicationSaga'
// import {FETCH_APPLICATIONS_SUCCESS} from '../../sagas/application/applicationSaga'
const SET_CURRENT_PAGE = 'applicationsReducer/SET_CURRENT_PAGE'

export const actions = {
FETCH_APPLICATIONS_SUMMARY_SUCCESS,
FETCH_APPLICATIONS_SUCCESS,
SET_CURRENT_PAGE
}

export const actionCreators = {
  setCurrentPage: createAction(SET_CURRENT_PAGE)
}

export const initialState = {
   application: '',
   applicationSummary: '',
   currentPage: 1
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
    })
  },
  initialState
)

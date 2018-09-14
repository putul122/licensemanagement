import { createAction, handleActions } from 'redux-actions'
import {FETCH_AGREEMENTS_SUCCESS, FETCH_AGREEMENTS_SUMMARY_SUCCESS} from '../../sagas/agreement/agreementSaga'
// Name Spaced Action Types
const SET_CURRENT_PAGE = 'AgreementsReducer/SET_CURRENT_PAGE'

export const actions = {
    FETCH_AGREEMENTS_SUCCESS,
    FETCH_AGREEMENTS_SUMMARY_SUCCESS,
    SET_CURRENT_PAGE
}

export const actionCreators = {
    setCurrentPage: createAction(SET_CURRENT_PAGE)
}

export const initialState = {
  agreements: '',
  agreementsSummary: '',
  currentPage: 1
}

export default handleActions(
  {
    [FETCH_AGREEMENTS_SUCCESS]: (state, action) => ({
        ...state,
        agreements: action.payload
    }),
    [FETCH_AGREEMENTS_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      agreementsSummary: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
    ...state,
    currentPage: action.payload
    })
  },
  initialState
)

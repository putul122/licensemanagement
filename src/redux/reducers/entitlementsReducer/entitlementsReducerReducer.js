import {createAction, handleActions} from 'redux-actions'
import {FETCH_ENTITLEMENTS_SUMMARY_SUCCESS, FETCH_ENTITLEMENTS_SUCCESS} from '../../sagas/entitlement/entitlementSaga'
// import {FETCH_APPLICATIONS_SUCCESS} from '../../sagas/application/applicationSaga'
const SET_CURRENT_PAGE = 'entitlementsReducer/SET_CURRENT_PAGE'

export const actions = {
FETCH_ENTITLEMENTS_SUMMARY_SUCCESS,
FETCH_ENTITLEMENTS_SUCCESS,
SET_CURRENT_PAGE
}

export const actionCreators = {
  setCurrentPage: createAction(SET_CURRENT_PAGE)
}

export const initialState = {
   entitlements: '',
   entitlementsSummary: '',
   currentPage: 1
}

export default handleActions(
  {
    [FETCH_ENTITLEMENTS_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      entitlementsSummary: action.payload
    }),
    [FETCH_ENTITLEMENTS_SUCCESS]: (state, action) => ({
      ...state,
      entitlements: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    })
  },
  initialState
)

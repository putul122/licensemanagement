import {createAction, handleActions} from 'redux-actions'
import {FETCH_ENTITLEMENTS_SUMMARY_SUCCESS, FETCH_ENTITLEMENTS_SUCCESS, ADD_ENTITLEMENT_SUCCESS} from '../../sagas/entitlement/entitlementSaga'
// import {FETCH_APPLICATIONS_SUCCESS} from '../../sagas/application/applicationSaga'
const SET_CURRENT_PAGE = 'entitlementsReducer/SET_CURRENT_PAGE'
const RESET_RESPONSE = 'entitlementReducer/RESET_RESPONSE'

export const actions = {
FETCH_ENTITLEMENTS_SUMMARY_SUCCESS,
FETCH_ENTITLEMENTS_SUCCESS,
SET_CURRENT_PAGE,
ADD_ENTITLEMENT_SUCCESS,
RESET_RESPONSE
}

export const actionCreators = {
  setCurrentPage: createAction(SET_CURRENT_PAGE),
  resetResponse: createAction(RESET_RESPONSE)
}

export const initialState = {
   entitlements: '',
   entitlementsSummary: '',
   currentPage: 1,
   addEntitlementResponse: ''
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
    }),
    [ADD_ENTITLEMENT_SUCCESS]: (state, action) => ({
      ...state,
      addEntitlementResponse: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      addEntitlementResponse: ''
    })
  },
  initialState
)

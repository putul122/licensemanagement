import { handleActions } from 'redux-actions'
import {
    FETCH_ENTITLEMENTS_SUMMARY_SUCCESS,
    FETCH_ENTITLEMENT_BY_ID_SUCCESS,
    FETCH_ENTITLEMENT_PROPERTIES_SUCCESS,
    FETCH_ENTITLEMENT_RELATIONSHIPS_SUCCESS
} from '../../sagas/entitlement/entitlementSaga'
// Name Spaced Action Types

export const actions = {
    FETCH_ENTITLEMENTS_SUMMARY_SUCCESS,
    FETCH_ENTITLEMENT_BY_ID_SUCCESS,
    FETCH_ENTITLEMENT_PROPERTIES_SUCCESS,
    FETCH_ENTITLEMENT_RELATIONSHIPS_SUCCESS
}

export const actionCreators = {}

export const initialState = {
  entitlement: '',
  entitlementSummary: '',
  entitlementProperties: '',
  entitlementRelationships: ''
}

export default handleActions(
  {
    [FETCH_ENTITLEMENTS_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      entitlementSummary: action.payload
    }),
    [FETCH_ENTITLEMENT_BY_ID_SUCCESS]: (state, action) => ({
      ...state,
      entitlement: action.payload
    }),
    [FETCH_ENTITLEMENT_PROPERTIES_SUCCESS]: (state, action) => ({
      ...state,
      entitlementProperties: action.payload
    }),
    [FETCH_ENTITLEMENT_RELATIONSHIPS_SUCCESS]: (state, action) => ({
      ...state,
      entitlementRelationships: action.payload
    })
  },
  initialState
)

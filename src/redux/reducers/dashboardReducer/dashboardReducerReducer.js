import { handleActions } from 'redux-actions'
import {FETCH_APPLICATIONS_SUMMARY_SUCCESS} from '../../sagas/application/applicationSaga'
import {FETCH_AGREEMENTS_SUMMARY_SUCCESS} from '../../sagas/agreement/agreementSaga'
import {FETCH_SUPPLIERS_SUMMARY_SUCCESS} from '../../sagas/supplier/supplierSaga'
import {FETCH_ENTITLEMENTS_SUMMARY_SUCCESS} from '../../sagas/entitlement/entitlementSaga'
import {FETCH_SOFTWARES_SUMMARY_SUCCESS} from '../../sagas/software/softwareSaga'
// Name Spaced Action Types
// const SOME_ACTION = 'DashboardReducer/SOME_ACTION'

export const actions = {
    FETCH_APPLICATIONS_SUMMARY_SUCCESS,
    FETCH_AGREEMENTS_SUMMARY_SUCCESS,
    FETCH_SUPPLIERS_SUMMARY_SUCCESS,
    FETCH_ENTITLEMENTS_SUMMARY_SUCCESS,
    FETCH_SOFTWARES_SUMMARY_SUCCESS
}

export const actionCreators = {}

export const initialState = {
  supplierSummary: '',
  applicationSummary: '',
  agreementSummary: '',
  entitlementSummary: '',
  softwareSummary: ''
}

export default handleActions(
  {
    [FETCH_APPLICATIONS_SUMMARY_SUCCESS]: (state, action) => ({
        ...state,
        applicationSummary: action.payload
    }),
    [FETCH_AGREEMENTS_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      agreementSummary: action.payload
    }),
    [FETCH_SUPPLIERS_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      supplierSummary: action.payload
    }),
    [FETCH_ENTITLEMENTS_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      entitlementSummary: action.payload
    }),
    [FETCH_SOFTWARES_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      softwareSummary: action.payload
    })
  },
  initialState
)

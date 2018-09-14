import { handleActions } from 'redux-actions'
import {FETCH_APPLICATIONS_SUMMARY_SUCCESS} from '../../sagas/application/applicationSaga'
import {FETCH_AGREEMENTS_SUMMARY_SUCCESS} from '../../sagas/agreement/agreementSaga'
import {FETCH_SUPPLIERS_SUMMARY_SUCCESS} from '../../sagas/supplier/supplierSaga'
// Name Spaced Action Types
// const SOME_ACTION = 'DashboardReducer/SOME_ACTION'

export const actions = {
    FETCH_APPLICATIONS_SUMMARY_SUCCESS,
    FETCH_AGREEMENTS_SUMMARY_SUCCESS,
    FETCH_SUPPLIERS_SUMMARY_SUCCESS
}

export const actionCreators = {}

export const initialState = {
  suppliers: '',
  suppliersSummary: '',
  application: '',
  applicationSummary: '',
  agreements: '',
  agreementsSummary: '',
  entitlements: '',
  softwareReference: ''
}

export default handleActions(
  {
    [FETCH_APPLICATIONS_SUMMARY_SUCCESS]: (state, action) => ({
        ...state,
        applicationSummary: action.payload
    }),
    [FETCH_AGREEMENTS_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      agreementsSummary: action.payload
    }),
    [FETCH_SUPPLIERS_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      suppliersSummary: action.payload
    })
  },
  initialState
)

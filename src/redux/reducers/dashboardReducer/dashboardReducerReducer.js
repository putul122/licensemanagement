import {createAction, handleActions} from 'redux-actions'
import {FETCH_APPLICATIONS_SUMMARY_SUCCESS} from '../../sagas/application/applicationSaga'
import {FETCH_AGREEMENTS_SUMMARY_SUCCESS} from '../../sagas/agreement/agreementSaga'
import {FETCH_SUPPLIERS_SUMMARY_SUCCESS} from '../../sagas/supplier/supplierSaga'
import {FETCH_ENTITLEMENTS_SUMMARY_SUCCESS} from '../../sagas/entitlement/entitlementSaga'
import {FETCH_SOFTWARES_SUMMARY_SUCCESS} from '../../sagas/software/softwareSaga'
import {FETCH_BUSINESS_UNITS_SUCCESS} from '../../sagas/basic/basicSaga'
// Name Spaced Action Types
const SET_DEFAULT_SELECT = 'DashboardReducer/SET_DEFAULT_SELECT'

export const actions = {
    FETCH_APPLICATIONS_SUMMARY_SUCCESS,
    FETCH_AGREEMENTS_SUMMARY_SUCCESS,
    FETCH_SUPPLIERS_SUMMARY_SUCCESS,
    FETCH_ENTITLEMENTS_SUMMARY_SUCCESS,
    FETCH_SOFTWARES_SUMMARY_SUCCESS,
    FETCH_BUSINESS_UNITS_SUCCESS,
    SET_DEFAULT_SELECT
}

export const actionCreators = {
  setDefaultSelect: createAction(SET_DEFAULT_SELECT)
}

export const initialState = {
  supplierSummary: '',
  applicationSummary: '',
  agreementSummary: '',
  entitlementSummary: '',
  softwareSummary: '',
  businessUnits: '',
  defaultSelect: null
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
    }),
    [FETCH_BUSINESS_UNITS_SUCCESS]: (state, action) => ({
      ...state,
      businessUnits: action.payload
    }),
    [SET_DEFAULT_SELECT]: (state, action) => ({
      ...state,
      defaultSelect: action.payload
    })
  },
  initialState
)

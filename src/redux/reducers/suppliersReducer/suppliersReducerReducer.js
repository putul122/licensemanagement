import { createAction, handleActions } from 'redux-actions'
import {
  FETCH_SUPPLIERS_SUCCESS,
  FETCH_SUPPLIERS_SUMMARY_SUCCESS,
  FETCH_SUPPLIER_AGREEMENTS_SUCCESS
} from '../../sagas/supplier/supplierSaga'
import {FETCH_AGREEMENT_ENTITLEMENTS_SUCCESS} from '../../sagas/agreement/agreementSaga'
// Name Spaced Action Types
const SET_CURRENT_PAGE = 'SuppliersReducer/SET_CURRENT_PAGE'
const SET_EXPAND_SETTINGS = 'SuppliersReducer/SET_EXPAND_SETTINGS'
const RESET_RESPONSE = 'SuppliersReducer/RESET_RESPONSE'
const SET_PER_PAGE = 'SuppliersReducer/SET_PER_PAGE'

export const actions = {
  FETCH_SUPPLIERS_SUCCESS,
  FETCH_SUPPLIERS_SUMMARY_SUCCESS,
  SET_CURRENT_PAGE,
  FETCH_SUPPLIER_AGREEMENTS_SUCCESS,
  SET_EXPAND_SETTINGS,
  RESET_RESPONSE,
  SET_PER_PAGE,
  FETCH_AGREEMENT_ENTITLEMENTS_SUCCESS
}

export const actionCreators = {
  setCurrentPage: createAction(SET_CURRENT_PAGE),
  setExpandSettings: createAction(SET_EXPAND_SETTINGS),
  resetResponse: createAction(RESET_RESPONSE),
  setPerPage: createAction(SET_PER_PAGE)
}

export const initialState = {
  suppliers: '',
  suppliersSummary: '',
  supplierAgreements: '',
  agreementEntitlements: '',
  currentPage: 1,
  perPage: 10,
  expandSettings: {
    selectedId: '',
    expandFlag: false,
    nestedSelectedId: '',
    nestedExpandFlag: false
  }
}

export default handleActions(
  {
    [FETCH_SUPPLIERS_SUCCESS]: (state, action) => ({
        ...state,
        suppliers: action.payload
    }),
    [FETCH_SUPPLIERS_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      suppliersSummary: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
    ...state,
    currentPage: action.payload
    }),
    [SET_PER_PAGE]: (state, action) => ({
      ...state,
      perPage: action.payload
    }),
    [FETCH_SUPPLIER_AGREEMENTS_SUCCESS]: (state, action) => ({
      ...state,
      supplierAgreements: action.payload
    }),
    [FETCH_AGREEMENT_ENTITLEMENTS_SUCCESS]: (state, action) => ({
      ...state,
      agreementEntitlements: action.payload
    }),
    [SET_EXPAND_SETTINGS]: (state, action) => ({
      ...state,
      expandSettings: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      supplierAgreements: action.payload.supplierAgreements,
      agreementEntitlements: action.payload.agreementEntitlements
    })
  },
  initialState
)

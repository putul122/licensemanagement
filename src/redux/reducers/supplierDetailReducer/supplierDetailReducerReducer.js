import { createAction, handleActions } from 'redux-actions'
import {
    FETCH_SUPPLIERS_SUCCESS,
    FETCH_SUPPLIERS_SUMMARY_SUCCESS,
    FETCH_SUPPLIER_BY_ID_SUCCESS,
    FETCH_SUPPLIER_AGREEMENTS_SUCCESS,
    FETCH_SUPPLIER_SOFTWARES_SUCCESS,
    FETCH_SUPPLIER_APPLICATIONS_SUCCESS
} from '../../sagas/supplier/supplierSaga'
// Name Spaced Action Types
const SET_CURRENT_PAGE = 'SuppliersReducer/SET_CURRENT_PAGE'

export const actions = {
    FETCH_SUPPLIERS_SUCCESS,
    FETCH_SUPPLIERS_SUMMARY_SUCCESS,
    FETCH_SUPPLIER_BY_ID_SUCCESS,
    FETCH_SUPPLIER_AGREEMENTS_SUCCESS,
    FETCH_SUPPLIER_SOFTWARES_SUCCESS,
    FETCH_SUPPLIER_APPLICATIONS_SUCCESS,
    SET_CURRENT_PAGE
}

export const actionCreators = {
    setCurrentPage: createAction(SET_CURRENT_PAGE)
}

export const initialState = {
  supplier: '',
  supplierApplications: '',
  suppliersSummary: '',
  supplierAgreements: '',
  supplierSoftwares: '',
  currentPage: 1
}

export default handleActions(
  {
    [FETCH_SUPPLIER_BY_ID_SUCCESS]: (state, action) => ({
        ...state,
        supplier: action.payload
    }),
    [FETCH_SUPPLIERS_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      suppliersSummary: action.payload
    }),
    [FETCH_SUPPLIER_APPLICATIONS_SUCCESS]: (state, action) => ({
      ...state,
      supplierApplications: action.payload
    }),
    [FETCH_SUPPLIER_AGREEMENTS_SUCCESS]: (state, action) => ({
      ...state,
      supplierAgreements: action.payload
    }),
    [FETCH_SUPPLIER_SOFTWARES_SUCCESS]: (state, action) => ({
      ...state,
      supplierSoftwares: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
    ...state,
    currentPage: action.payload
    })
  },
  initialState
)

import { createAction, handleActions } from 'redux-actions'
import {FETCH_SUPPLIERS_SUCCESS, FETCH_SUPPLIERS_SUMMARY_SUCCESS, FETCH_SUPPLIER_SOFTWARES_SUCCESS} from '../../sagas/supplier/supplierSaga'
// Name Spaced Action Types
const SET_CURRENT_PAGE = 'SuppliersReducer/SET_CURRENT_PAGE'
const SET_EXPAND_SETTINGS = 'SuppliersReducer/SET_EXPAND_SETTINGS'
const RESET_RESPONSE = 'SuppliersReducer/RESET_RESPONSE'
const SET_PER_PAGE = 'SuppliersReducer/SET_PER_PAGE'

export const actions = {
  FETCH_SUPPLIERS_SUCCESS,
  FETCH_SUPPLIERS_SUMMARY_SUCCESS,
  SET_CURRENT_PAGE,
  FETCH_SUPPLIER_SOFTWARES_SUCCESS,
  SET_EXPAND_SETTINGS,
  RESET_RESPONSE,
  SET_PER_PAGE
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
  supplierSoftwares: '',
  currentPage: 1,
  perPage: 10,
  expandSettings: {
    selectedId: '',
    expandFlag: false
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
    [FETCH_SUPPLIER_SOFTWARES_SUCCESS]: (state, action) => ({
      ...state,
      supplierSoftwares: action.payload
    }),
    [SET_EXPAND_SETTINGS]: (state, action) => ({
      ...state,
      expandSettings: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      supplierSoftwares: {resources: []}
    })
  },
  initialState
)

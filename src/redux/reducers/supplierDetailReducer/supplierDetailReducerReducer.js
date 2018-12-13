import { createAction, handleActions } from 'redux-actions'
import {
    FETCH_SUPPLIERS_SUCCESS,
    FETCH_SUPPLIERS_SUMMARY_SUCCESS,
    FETCH_SUPPLIER_BY_ID_SUCCESS,
    FETCH_SUPPLIER_AGREEMENTS_SUCCESS,
    FETCH_SUPPLIER_SOFTWARES_SUCCESS,
    FETCH_SUPPLIER_APPLICATIONS_SUCCESS,
    FETCH_SUPPLIER_PROPERTIES_SUCCESS,
    UPDATE_SUPPLIER_PROPERTIES_SUCCESS
} from '../../sagas/supplier/supplierSaga'
// Name Spaced Action Types
const SET_CURRENT_PAGE = 'SuppliersReducer/SET_CURRENT_PAGE'
const SET_ACTIVE_TAB = 'SuppliersReducer/SET_ACTIVE_TAB'
const SET_SUPPLIER_PROPERTY_SETTINGS = 'SuppliersReducer/SET_SUPPLIER_PROPERTY_SETTINGS'
const RESET_RESPONSE = 'SuppliersReducer/RESET_RESPONSE'
const SET_SUPPLIER_DETAILS = 'SuppliersReducer/SET_SUPPLIER_DETAILS'

export const actions = {
    FETCH_SUPPLIERS_SUCCESS,
    FETCH_SUPPLIERS_SUMMARY_SUCCESS,
    FETCH_SUPPLIER_BY_ID_SUCCESS,
    FETCH_SUPPLIER_AGREEMENTS_SUCCESS,
    FETCH_SUPPLIER_SOFTWARES_SUCCESS,
    FETCH_SUPPLIER_APPLICATIONS_SUCCESS,
    FETCH_SUPPLIER_PROPERTIES_SUCCESS,
    SET_CURRENT_PAGE,
    SET_ACTIVE_TAB,
    SET_SUPPLIER_PROPERTY_SETTINGS,
    UPDATE_SUPPLIER_PROPERTIES_SUCCESS,
    SET_SUPPLIER_DETAILS
}

export const actionCreators = {
    setCurrentPage: createAction(SET_CURRENT_PAGE),
    setActiveTab: createAction(SET_ACTIVE_TAB),
    setSupplierPropertySettings: createAction(SET_SUPPLIER_PROPERTY_SETTINGS),
    setSupplierDetails: createAction(SET_SUPPLIER_DETAILS),
    resetResponse: createAction(RESET_RESPONSE)
}

export const initialState = {
  supplier: '',
  supplierApplications: '',
  suppliersSummary: '',
  supplierAgreements: '',
  supplierDetails: '',
  supplierSoftwares: '',
  currentPage: 1,
  activeTab: 'agreement',
  supplierPropertySettings: {
    isEditFlag: false,
    person_name: '',
    department_name: '',
    function: '',
    email: '',
    cell_number: '',
    product: '',
    surname: ''
  },
  supplierProperties: '',
  updateSupplierResponse: ''
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
    [FETCH_SUPPLIER_PROPERTIES_SUCCESS]: (state, action) => ({
      ...state,
      supplierProperties: action.payload
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
    }),
    [UPDATE_SUPPLIER_PROPERTIES_SUCCESS]: (state, action) => ({
      ...state,
      updateSupplierPropertyResponse: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      updateSupplierPropertyResponse: ''
    }),
    [SET_ACTIVE_TAB]: (state, action) => ({
      ...state,
      activeTab: action.payload
    }),
    [SET_SUPPLIER_PROPERTY_SETTINGS]: (state, action) => ({
      ...state,
      supplierPropertySettings: action.payload
    }),
    [SET_SUPPLIER_DETAILS]: (state, action) => ({
      ...state,
      supplierDetails: action.payload
    })
  },
  initialState
)

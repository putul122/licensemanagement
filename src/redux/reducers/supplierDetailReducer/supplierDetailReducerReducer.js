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
const SET_SUPPLIER_PROPERTIES = 'SuppliersReducer/SET_SUPPLIER_PROPERTIES'
const RESET_RESPONSE = 'SuppliersReducer/RESET_RESPONSE'
const EDIT_SUPPLIER_PROPERTIES = 'SuppliersReducer/EDIT_SUPPLIER_PROPERTIES'
const PUSH_SUPPLIER_PROPERTY_PAYLOAD = 'SupplierReducer/PUSH_SUPPLIER_PROPERTY_PAYLOAD'

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
    SET_SUPPLIER_PROPERTIES,
    UPDATE_SUPPLIER_PROPERTIES_SUCCESS,
    EDIT_SUPPLIER_PROPERTIES,
    PUSH_SUPPLIER_PROPERTY_PAYLOAD
}

export const actionCreators = {
    setCurrentPage: createAction(SET_CURRENT_PAGE),
    setActiveTab: createAction(SET_ACTIVE_TAB),
    setSupplierProperties: createAction(SET_SUPPLIER_PROPERTIES),
    editSupplierProperties: createAction(EDIT_SUPPLIER_PROPERTIES),
    pushSupplierPropertyPayload: createAction(PUSH_SUPPLIER_PROPERTY_PAYLOAD)
}

export const initialState = {
  supplier: '',
  supplierApplications: '',
  suppliersSummary: '',
  supplierAgreements: '',
  supplierSoftwares: '',
  currentPage: 1,
  activeTab: 'agreement',
  supplierPropertiesSettings: {
    isEditFlag: true
  },
  supplierProperties: '',
  updateSupplierResponse: '',
  supplierPropertiesPayload: {property: []}
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
    [PUSH_SUPPLIER_PROPERTY_PAYLOAD]: (state, action) => ({
      ...state,
      supplierPropertiesPayload: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      updateSupplierPropertyResponse: ''
    }),
    [SET_ACTIVE_TAB]: (state, action) => ({
      ...state,
      activeTab: action.payload
    }),
    [SET_SUPPLIER_PROPERTIES]: (state, action) => ({
      ...state,
      supplierPropertiesSettings: action.payload
    }),
    [EDIT_SUPPLIER_PROPERTIES]: (state, action) => ({
      ...state,
      supplierProperties: action.payload.property
    })
  },
  initialState
)

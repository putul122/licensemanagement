import { createAction, handleActions } from 'redux-actions'
import {
    FETCH_BUSINESSUNIT_BY_ID_SUCCESS,
    FETCH_BUSINESSUNIT_AGREEMENTS_SUCCESS,
    FETCH_BUSINESSUNIT_ENTITLEMENTS_SUCCESS,
    FETCH_BUSINESSOWNS_APPLICATIONS_SUCCESS,
    FETCH_BUSINESSUSES_APPLICATIONS_SUCCESS,
    UPDATE_BUSINESSUNIT_ENTITLEMENTS_SUCCESS,
    FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS,
    DELETE_BUSINESSUNIT_ENTITLEMENTS_SUCCESS,
    ADD_BUSINESSUNIT_ENTITLEMENTS_SUCCESS
} from '../../sagas/businessUnits/businessUnitsSaga'
import { FETCH_SUPPLIERS_SUCCESS } from '../../sagas/supplier/supplierSaga'
import { FETCH_AGREEMENTS_SUCCESS } from '../../sagas/agreement/agreementSaga'
import { FETCH_ENTITLEMENTS_BY_SUPPLIER_AGREEMENT_SUCCESS } from '../../sagas/entitlement/entitlementSaga'
// Name Spaced Action Types
const SET_CURRENT_PAGE = 'viesBusinessUnitsReducer/SET_CURRENT_PAGE'
const SET_ACTIVE_TAB = 'viewBusinessUnitsReducer/SET_ACTIVE_TAB'
const SET_ENTITLEMENTS_ACTION_SETTINGS = 'viewBusinessUnitsReducer/SET_ENTITLEMENTS_ACTION_SETTINGS'
// const SET_SUPPLIER_PROPERTY_SETTINGS = 'SuppliersReducer/SET_SUPPLIER_PROPERTY_SETTINGS'
const RESET_RESPONSE = 'viewBusinessUnitsReducer/RESET_RESPONSE'
// const SET_SUPPLIER_DETAILS = 'SuppliersReducer/SET_SUPPLIER_DETAILS'

export const actions = {
    // FETCH_SUPPLIERS_SUCCESS,
    // FETCH_SUPPLIERS_SUMMARY_SUCCESS,
    FETCH_BUSINESSUNIT_BY_ID_SUCCESS,
    FETCH_BUSINESSUNIT_AGREEMENTS_SUCCESS,
    FETCH_BUSINESSUNIT_ENTITLEMENTS_SUCCESS,
    FETCH_BUSINESSOWNS_APPLICATIONS_SUCCESS,
    FETCH_BUSINESSUSES_APPLICATIONS_SUCCESS,
    SET_ENTITLEMENTS_ACTION_SETTINGS,
    UPDATE_BUSINESSUNIT_ENTITLEMENTS_SUCCESS,
    DELETE_BUSINESSUNIT_ENTITLEMENTS_SUCCESS,
    FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS,
    ADD_BUSINESSUNIT_ENTITLEMENTS_SUCCESS,
    SET_CURRENT_PAGE,
    SET_ACTIVE_TAB,
    RESET_RESPONSE
    // SET_SUPPLIER_PROPERTY_SETTINGS,
    // UPDATE_SUPPLIER_PROPERTIES_SUCCESS,
    // SET_SUPPLIER_DETAILS
}

export const actionCreators = {
    setCurrentPage: createAction(SET_CURRENT_PAGE),
    setActiveTab: createAction(SET_ACTIVE_TAB),
    setEntitlementActionSettings: createAction(SET_ENTITLEMENTS_ACTION_SETTINGS),
    // setSupplierPropertySettings: createAction(SET_SUPPLIER_PROPERTY_SETTINGS),
    // setSupplierDetails: createAction(SET_SUPPLIER_DETAILS),
    resetResponse: createAction(RESET_RESPONSE)
}

export const initialState = {
//   supplier: '',
//   supplierApplications: '',
//   suppliersSummary: '',
//   supplierAgreements: '',
//   supplierDetails: '',
//   supplierSoftwares: '',
  currentPage: 1,
  businessUnit: '',
  activeTab: 'agreement',
  businessUnitAgreements: '',
  businessUnitEntitlements: '',
  businessOwnsApplications: '',
  businessUsesApplications: '',
  entitlementActionSettings: {
    isLinkModalOpen: false,
    isLinkDeleteModalOpen: false,
    isLinkUpdateModalOpen: false,
    entitlementSelected: null,
    entitlement: null,
    agreement: null,
    supplier: null,
    software: null,
    licenseCount: 0
  },
  addBusinessUnitEntitlementResponse: '',
  updateBusinessUnitEntitlementResponse: '',
  deleteBusinessUnitEntitlementResponse: '',
  allEntitlements: '',
  suppliers: '',
  agreements: ''
}

export default handleActions(
  {
    [FETCH_BUSINESSUNIT_BY_ID_SUCCESS]: (state, action) => ({
        ...state,
        businessUnit: action.payload
    }),
    [FETCH_BUSINESSUNIT_AGREEMENTS_SUCCESS]: (state, action) => ({
      ...state,
      businessUnitAgreements: action.payload
    }),
    [FETCH_BUSINESSUNIT_ENTITLEMENTS_SUCCESS]: (state, action) => ({
      ...state,
      businessUnitEntitlements: action.payload
    }),
    [FETCH_BUSINESSOWNS_APPLICATIONS_SUCCESS]: (state, action) => ({
      ...state,
      businessOwnsApplications: action.payload
    }),
    [FETCH_BUSINESSUSES_APPLICATIONS_SUCCESS]: (state, action) => ({
      ...state,
      businessUsesApplications: action.payload
    }),
    [SET_ENTITLEMENTS_ACTION_SETTINGS]: (state, action) => ({
      ...state,
    entitlementActionSettings: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
    ...state,
    currentPage: action.payload
    }),
    [ADD_BUSINESSUNIT_ENTITLEMENTS_SUCCESS]: (state, action) => ({
      ...state,
      addBusinessUnitEntitlementResponse: action.payload
    }),
    [UPDATE_BUSINESSUNIT_ENTITLEMENTS_SUCCESS]: (state, action) => ({
      ...state,
      updateBusinessUnitEntitlementResponse: action.payload
    }),
    [DELETE_BUSINESSUNIT_ENTITLEMENTS_SUCCESS]: (state, action) => ({
      ...state,
      deleteBusinessUnitEntitlementResponse: action.payload
    }),
    [SET_ACTIVE_TAB]: (state, action) => ({
      ...state,
      activeTab: action.payload
    }),
    [FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS]: (state, action) => ({
      ...state,
      allEntitlements: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      addBusinessUnitEntitlementResponse: '',
      updateBusinessUnitEntitlementResponse: '',
      deleteBusinessUnitEntitlementResponse: ''
    }),
    [FETCH_SUPPLIERS_SUCCESS]: (state, action) => ({
      ...state,
      suppliers: action.payload
    }),
    [FETCH_AGREEMENTS_SUCCESS]: (state, action) => ({
      ...state,
      agreements: action.payload
    }),
    [FETCH_ENTITLEMENTS_BY_SUPPLIER_AGREEMENT_SUCCESS]: (state, action) => ({
      ...state,
      entitlements: action.payload
    })
  },
  initialState
)

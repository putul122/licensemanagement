import { createAction, handleActions } from 'redux-actions'
import {
    FETCH_ENTITLEMENTS_SUMMARY_SUCCESS,
    FETCH_ENTITLEMENT_BY_ID_SUCCESS,
    FETCH_ENTITLEMENT_PROPERTIES_SUCCESS,
    FETCH_ENTITLEMENT_RELATIONSHIPS_SUCCESS,
    DELETE_ENTITLEMENT_SUCCESS,
    UPDATE_ENTITLEMENT_PROPERTIES_SUCCESS
} from '../../sagas/entitlement/entitlementSaga'
// Name Spaced Action Types
const SET_UPDATE_ENTITLEMENT_SETTINGS = 'EntitlementDetailReducer/SET_UPDATE_ENTITLEMENT_SETTINGS'
const RESET_RESPONSE = 'EntitlementDetailReducer/RESET_RESPONSE'
const SET_EDIT_COMPONENT_FLAG = 'EntitlementDetailReducer/SET_EDIT_COMPONENT_FLAG'
const PUSH_ENTITLEMENT_PROPERTY_PAYLOAD = 'EntitlementDetailReducer/PUSH_ENTITLEMENT_PROPERTY_PAYLOAD'
const EDIT_ENTITLEMENT_PROPERTIES = 'EntitlementDetailReducer/EDIT_ENTITLEMENT_PROPERTIES'
const COPY_ENTITLEMENT_PROPERTIES = 'EntitlementDetailReducer/COPY_AGREEMENT_PROPERTIES'
const COPY_ENTITLEMENT_DATA = 'EntitlementDetailReducer/COPY_AGREEMENT_DATA'
const RESTORE_ENTITLEMENT_PROPERTIES = 'EntitlementDetailReducer/RESTORE_AGREEMENT_PROPERTIES'

export const actions = {
    FETCH_ENTITLEMENTS_SUMMARY_SUCCESS,
    FETCH_ENTITLEMENT_BY_ID_SUCCESS,
    FETCH_ENTITLEMENT_PROPERTIES_SUCCESS,
    FETCH_ENTITLEMENT_RELATIONSHIPS_SUCCESS,
    SET_UPDATE_ENTITLEMENT_SETTINGS,
    RESET_RESPONSE,
    SET_EDIT_COMPONENT_FLAG,
    PUSH_ENTITLEMENT_PROPERTY_PAYLOAD,
    EDIT_ENTITLEMENT_PROPERTIES,
    COPY_ENTITLEMENT_PROPERTIES,
    COPY_ENTITLEMENT_DATA,
    RESTORE_ENTITLEMENT_PROPERTIES,
    DELETE_ENTITLEMENT_SUCCESS,
    UPDATE_ENTITLEMENT_PROPERTIES_SUCCESS
}

export const actionCreators = {
  setUpdateEntitlementSettings: createAction(SET_UPDATE_ENTITLEMENT_SETTINGS),
  setEditComponentFlag: createAction(SET_EDIT_COMPONENT_FLAG),
  resetResponse: createAction(RESET_RESPONSE),
  pushEntitlementPropertyPayload: createAction(PUSH_ENTITLEMENT_PROPERTY_PAYLOAD),
  editEntitlementProperties: createAction(EDIT_ENTITLEMENT_PROPERTIES),
  copyEntitlementProperties: createAction(COPY_ENTITLEMENT_PROPERTIES),
  copyEntitlementData: createAction(COPY_ENTITLEMENT_DATA),
  restoreEntitlementProperties: createAction(RESTORE_ENTITLEMENT_PROPERTIES)
}

export const initialState = {
  entitlement: '',
  entitlementSummary: '',
  entitlementProperties: '',
  entitlementRelationships: '',
  deleteEntitlementResponse: '',
  updateEntitlementResponse: '',
  updateEntitlementPropertyResponse: '',
  copiedEntitlementProperties: '',
  copiedEntitlementData: '',
  isEditComponent: false,
  entitlementPropertiesPayload: {property: [], entitlement: [], relationship: []},
  updateEntitlementSettings: {
    isDeleteModalOpen: false,
    isConfirmationModalOpen: false
  }
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
    }),
    [DELETE_ENTITLEMENT_SUCCESS]: (state, action) => ({
      ...state,
      deleteEntitlementResponse: action.payload
    }),
    [UPDATE_ENTITLEMENT_PROPERTIES_SUCCESS]: (state, action) => ({
      ...state,
      updateEntitlementPropertyResponse: action.payload
    }),
    [COPY_ENTITLEMENT_PROPERTIES]: (state, action) => ({
      ...state,
      copiedEntitlementProperties: action.payload
    }),
    [COPY_ENTITLEMENT_DATA]: (state, action) => ({
      ...state,
      copiedEntitlementData: action.payload
    }),
    [SET_EDIT_COMPONENT_FLAG]: (state, action) => ({
      ...state,
      isEditComponent: action.payload
    }),
    [PUSH_ENTITLEMENT_PROPERTY_PAYLOAD]: (state, action) => ({
      ...state,
      entitlementPropertiesPayload: action.payload
    }),
    [EDIT_ENTITLEMENT_PROPERTIES]: (state, action) => ({
      ...state,
      entitlementProperties: action.payload.property,
      entitlement: action.payload.entitlement
    }),
    [SET_UPDATE_ENTITLEMENT_SETTINGS]: (state, action) => ({
      ...state,
      updateEntitlementSettings: action.payload
    }),
    [RESTORE_ENTITLEMENT_PROPERTIES]: (state, action) => ({
      ...state,
      entitlementProperties: action.payload.property,
      entitlement: action.payload.entitlement
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      entitlementPropertiesPayload: {property: [], entitlement: [], relationship: []},
      updateEntitlementResponse: '',
      deleteEntitlementResponse: '',
      updateEntitlementPropertyResponse: ''
    })
  },
  initialState
)

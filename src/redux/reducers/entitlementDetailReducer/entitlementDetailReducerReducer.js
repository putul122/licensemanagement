import { createAction, handleActions } from 'redux-actions'
import {
    FETCH_ENTITLEMENTS_SUMMARY_SUCCESS,
    FETCH_ENTITLEMENT_BY_ID_SUCCESS,
    FETCH_ENTITLEMENT_PROPERTIES_SUCCESS,
    FETCH_ENTITLEMENT_RELATIONSHIPS_SUCCESS,
    DELETE_ENTITLEMENT_SUCCESS,
    UPDATE_ENTITLEMENT_PROPERTIES_SUCCESS
} from '../../sagas/entitlement/entitlementSaga'
import {
  FETCH_RELATIONSHIP_PROPERTY_SUCCESS,
  UPDATE_RELATIONSHIP_PROPERTY_SUCCESS,
  DELETE_COMPONENT_RELATIONSHIP_SUCCESS,
  FETCH_COMPONENT_CONSTRAINTS_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS,
  UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS
} from '../../sagas/agreement/agreementSaga'
// Name Spaced Action Types
const SET_UPDATE_ENTITLEMENT_SETTINGS = 'EntitlementDetailReducer/SET_UPDATE_ENTITLEMENT_SETTINGS'
const RESET_RESPONSE = 'EntitlementDetailReducer/RESET_RESPONSE'
const SET_EDIT_COMPONENT_FLAG = 'EntitlementDetailReducer/SET_EDIT_COMPONENT_FLAG'
const PUSH_ENTITLEMENT_PROPERTY_PAYLOAD = 'EntitlementDetailReducer/PUSH_ENTITLEMENT_PROPERTY_PAYLOAD'
const EDIT_ENTITLEMENT_PROPERTIES = 'EntitlementDetailReducer/EDIT_ENTITLEMENT_PROPERTIES'
const COPY_ENTITLEMENT_PROPERTIES = 'EntitlementDetailReducer/COPY_AGREEMENT_PROPERTIES'
const COPY_ENTITLEMENT_DATA = 'EntitlementDetailReducer/COPY_AGREEMENT_DATA'
const RESTORE_ENTITLEMENT_PROPERTIES = 'EntitlementDetailReducer/RESTORE_AGREEMENT_PROPERTIES'
const SET_RELATIONSHIP_ACTION_SETTINGS = 'EntitlementDetailReducer/SET_RELATIONSHIPS_ACTION_SETTINGS'
const EDIT_COMPONENT_RELATIONSHIP_PROPERTY = 'EntitlementDetailReducer/EDIT_COMPONENT_RELATIONSHIP_PROPERTY'
const RESET_COMPONENT_RELATIONSHIP_PROPERTY = 'EntitlementDetailReducer/RESET_COMPONENT_RELATIONSHIP_PROPERTY'
const EDIT_COMPONENT_RELATIONSHIP_PROPERTY_PAYLOAD = 'EntitlementDetailReducer/EDIT_COMPONENT_RELATIONSHIP_PROPERTY_PAYLOAD'
const SET_ADD_CONNECTION_SETTINGS = 'EntitlementDetailReducer/SET_ADD_CONNECTION_SETTINGS'
const RESET_UPDATE_RELATIONSHIP_RESPONSE = 'EntitlementDetailReducer/RESET_UPDATE_RELATIONSHIP_RESPONSE'

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
    UPDATE_ENTITLEMENT_PROPERTIES_SUCCESS,
    FETCH_RELATIONSHIP_PROPERTY_SUCCESS,
    UPDATE_RELATIONSHIP_PROPERTY_SUCCESS,
    DELETE_COMPONENT_RELATIONSHIP_SUCCESS,
    FETCH_COMPONENT_CONSTRAINTS_SUCCESS,
    FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS,
    UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS,
    RESET_UPDATE_RELATIONSHIP_RESPONSE,
    SET_RELATIONSHIP_ACTION_SETTINGS
}

export const actionCreators = {
  setUpdateEntitlementSettings: createAction(SET_UPDATE_ENTITLEMENT_SETTINGS),
  setEditComponentFlag: createAction(SET_EDIT_COMPONENT_FLAG),
  resetResponse: createAction(RESET_RESPONSE),
  pushEntitlementPropertyPayload: createAction(PUSH_ENTITLEMENT_PROPERTY_PAYLOAD),
  editEntitlementProperties: createAction(EDIT_ENTITLEMENT_PROPERTIES),
  copyEntitlementProperties: createAction(COPY_ENTITLEMENT_PROPERTIES),
  copyEntitlementData: createAction(COPY_ENTITLEMENT_DATA),
  restoreEntitlementProperties: createAction(RESTORE_ENTITLEMENT_PROPERTIES),
  setRelationshipActionSettings: createAction(SET_RELATIONSHIP_ACTION_SETTINGS),
  editComponentRelationshipProperties: createAction(EDIT_COMPONENT_RELATIONSHIP_PROPERTY),
  resetComponentRelationshipProperties: createAction(RESET_COMPONENT_RELATIONSHIP_PROPERTY),
  editComponentRelationshipPropertyPayload: createAction(EDIT_COMPONENT_RELATIONSHIP_PROPERTY_PAYLOAD),
  setAddConnectionSettings: createAction(SET_ADD_CONNECTION_SETTINGS),
  resetUpdateRelationshipResponse: createAction(RESET_UPDATE_RELATIONSHIP_RESPONSE)
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
  },
  addNewConnectionSettings: {
    isModalOpen: false,
    firstSelectboxSelected: false,
    firstSelectboxIndex: null,
    targetComponentTypeId: '',
    isWaitingForApiResponse: false,
    secondSelectboxSelected: false,
    secondSelectboxIndex: '',
    isParentSelected: false,
    isNewComponent: false,
    newComponentName: '',
    isEditComponent: false,
    showAddRelationshipButton: false,
    showCreateConnectionButton: false,
    slectedConstraintObject: {},
    selectedComponentObject: {},
    relationshipText: '',
    componentText: '',
    newConnectionArray: []
  },
  relationshipActionSettings: {
    isModalOpen: false,
    actionType: '',
    relationshipId: '',
    relationshipText: '',
    componentName: '',
    selectedObject: ''
  },
  relationshipProperty: '',
  relationshipPropertyPayload: [],
  componentTypeComponentConstraints: '',
  componentTypeComponents: '',
  updateRelationshipResponse: '',
  updateRelationshipPropertyResponse: '',
  deleteRelationshipResponse: ''
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
    }),
    [FETCH_RELATIONSHIP_PROPERTY_SUCCESS]: (state, action) => ({
      ...state,
      relationshipProperty: action.payload
    }),
    [EDIT_COMPONENT_RELATIONSHIP_PROPERTY]: (state, action) => ({
      ...state,
      relationshipProperty: action.payload
    }),
    [RESET_COMPONENT_RELATIONSHIP_PROPERTY]: (state, action) => ({
      ...state,
      relationshipProperty: ''
    }),
    [EDIT_COMPONENT_RELATIONSHIP_PROPERTY_PAYLOAD]: (state, action) => ({
      ...state,
      relationshipPropertyPayload: action.payload
    }),
    [UPDATE_RELATIONSHIP_PROPERTY_SUCCESS]: (state, action) => ({
      ...state,
      updateRelationshipPropertyResponse: action.payload
    }),
    [DELETE_COMPONENT_RELATIONSHIP_SUCCESS]: (state, action) => ({
      ...state,
      deleteRelationshipResponse: action.payload
    }),
    [SET_ADD_CONNECTION_SETTINGS]: (state, action) => ({
      ...state,
      addNewConnectionSettings: action.payload
    }),
    [FETCH_COMPONENT_CONSTRAINTS_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeComponentConstraints: action.payload
    }),
    [FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeComponents: action.payload
    }),
    [UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS]: (state, action) => ({
      ...state,
      updateRelationshipResponse: action.payload
    }),
    [SET_RELATIONSHIP_ACTION_SETTINGS]: (state, action) => ({
      ...state,
      relationshipActionSettings: action.payload
    }),
    [RESET_UPDATE_RELATIONSHIP_RESPONSE]: (state, action) => ({
      ...state,
      updateRelationshipResponse: '',
      updateRelationshipPropertyResponse: '',
      deleteRelationshipResponse: '',
      relationshipPropertyPayload: [],
      deleteComponent: ''
    })
  },
  initialState
)

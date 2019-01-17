import { createAction, handleActions } from 'redux-actions'
import {
  FETCH_AGREEMENT_BY_ID_SUCCESS,
  FETCH_AGREEMENT_ENTITLEMENTS_SUCCESS,
  FETCH_AGREEMENT_PROPERTIES_SUCCESS,
  FETCH_AGREEMENT_RELATIONSHIPS_SUCCESS,
  ADD_AGREEMENT_SUCCESS,
  DELETE_AGREEMENT_SUCCESS,
  UPDATE_AGREEMENT_PROPERTIES_SUCCESS,
  FETCH_RELATIONSHIP_PROPERTY_SUCCESS,
  UPDATE_RELATIONSHIP_PROPERTY_SUCCESS,
  DELETE_COMPONENT_RELATIONSHIP_SUCCESS,
  FETCH_COMPONENT_CONSTRAINTS_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS,
  UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS
} from '../../sagas/agreement/agreementSaga'
// Name Spaced Action Types
const SET_ADD_AGREEMENT_SETTINGS = 'AgreementDetailReducer/SET_ADD_AGREEMENT_SETTINGS'
const SET_RELATIONSHIP_ACTION_SETTINGS = 'AgreementDetailReducer/SET_RELATIONSHIPS_ACTION_SETTINGS'
const RESET_RESPONSE = 'AgreementDetailReducer/RESET_RESPONSE'
const SET_EDIT_COMPONENT_FLAG = 'AgreementDetailReducer/SET_EDIT_COMPONENT_FLAG'
const PUSH_COMPONENT_PROPERTY_PAYLOAD = 'AgreementDetailReducer/PUSH_COMPONENT_PROPERTY_PAYLOAD'
const EDIT_COMPONENT_PROPERTIES = 'AgreementDetailReducer/EDIT_COMPONENT_PROPERTIES'
const COPY_AGREEMENT_PROPERTIES = 'AgreementDetailReducer/COPY_AGREEMENT_PROPERTIES'
const COPY_AGREEMENT_DATA = 'AgreementDetailReducer/COPY_AGREEMENT_DATA'
const RESTORE_AGREEMENT_PROPERTIES = 'AgreementDetailReducer/RESTORE_AGREEMENT_PROPERTIES'
const EDIT_COMPONENT_RELATIONSHIP_PROPERTY = 'AgreementDetailReducer/EDIT_COMPONENT_RELATIONSHIP_PROPERTY'
const RESET_COMPONENT_RELATIONSHIP_PROPERTY = 'AgreementDetailReducer/RESET_COMPONENT_RELATIONSHIP_PROPERTY'
const EDIT_COMPONENT_RELATIONSHIP_PROPERTY_PAYLOAD = 'AgreementDetailReducer/EDIT_COMPONENT_RELATIONSHIP_PROPERTY_PAYLOAD'
const SET_ADD_CONNECTION_SETTINGS = 'AgreementDetailReducer/SET_ADD_CONNECTION_SETTINGS'
const RESET_UPDATE_RELATIONSHIP_RESPONSE = 'AgreementDetailReducer/RESET_UPDATE_RELATIONSHIP_RESPONSE'
const SET_CURRENT_PAGE = 'AgreementDetailReducer/SET_CURRENT_PAGE'

export const actions = {
    FETCH_AGREEMENT_BY_ID_SUCCESS,
    FETCH_AGREEMENT_ENTITLEMENTS_SUCCESS,
    FETCH_AGREEMENT_PROPERTIES_SUCCESS,
    FETCH_AGREEMENT_RELATIONSHIPS_SUCCESS,
    SET_ADD_AGREEMENT_SETTINGS,
    SET_RELATIONSHIP_ACTION_SETTINGS,
    ADD_AGREEMENT_SUCCESS,
    DELETE_AGREEMENT_SUCCESS,
    UPDATE_AGREEMENT_PROPERTIES_SUCCESS,
    RESET_RESPONSE,
    SET_EDIT_COMPONENT_FLAG,
    PUSH_COMPONENT_PROPERTY_PAYLOAD,
    EDIT_COMPONENT_PROPERTIES,
    COPY_AGREEMENT_PROPERTIES,
    COPY_AGREEMENT_DATA,
    RESTORE_AGREEMENT_PROPERTIES,
    FETCH_RELATIONSHIP_PROPERTY_SUCCESS,
    UPDATE_RELATIONSHIP_PROPERTY_SUCCESS,
    DELETE_COMPONENT_RELATIONSHIP_SUCCESS,
    UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS,
    RESET_UPDATE_RELATIONSHIP_RESPONSE,
    SET_CURRENT_PAGE
}

export const actionCreators = {
    setAddAgreementSettings: createAction(SET_ADD_AGREEMENT_SETTINGS),
    setEditComponentFlag: createAction(SET_EDIT_COMPONENT_FLAG),
    resetResponse: createAction(RESET_RESPONSE),
    pushComponentPropertyPayload: createAction(PUSH_COMPONENT_PROPERTY_PAYLOAD),
    editComponentProperties: createAction(EDIT_COMPONENT_PROPERTIES),
    copyAgreementProperties: createAction(COPY_AGREEMENT_PROPERTIES),
    copyAgreementData: createAction(COPY_AGREEMENT_DATA),
    restoreAgreementProperties: createAction(RESTORE_AGREEMENT_PROPERTIES),
    setRelationshipActionSettings: createAction(SET_RELATIONSHIP_ACTION_SETTINGS),
    editComponentRelationshipProperties: createAction(EDIT_COMPONENT_RELATIONSHIP_PROPERTY),
    resetComponentRelationshipProperties: createAction(RESET_COMPONENT_RELATIONSHIP_PROPERTY),
    editComponentRelationshipPropertyPayload: createAction(EDIT_COMPONENT_RELATIONSHIP_PROPERTY_PAYLOAD),
    setAddConnectionSettings: createAction(SET_ADD_CONNECTION_SETTINGS),
    resetUpdateRelationshipResponse: createAction(RESET_UPDATE_RELATIONSHIP_RESPONSE),
    setCurrentPage: createAction(SET_CURRENT_PAGE)
}

export const initialState = {
  agreement: '',
  addAgreementResponse: '',
  deleteAgreementResponse: '',
  updateAgreementResponse: '',
  updateRelationshipResponse: '',
  updateRelationshipPropertyResponse: '',
  deleteRelationshipResponse: '',
  agreementProperties: '',
  copiedAgreementProperties: '',
  copiedAgreementData: '',
  agreementRelationships: '',
  agreementEntitlements: '',
  isEditComponent: false,
  agreementPropertiesPayload: {property: [], project: []},
  addAgreementSettings: {
    isAddModalOpen: false,
    isDeleteModalOpen: false,
    isUpdateModalOpen: false,
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
  currentPage: 1
}

export default handleActions(
  {
    [FETCH_AGREEMENT_BY_ID_SUCCESS]: (state, action) => ({
        ...state,
        agreement: action.payload
    }),
    [FETCH_AGREEMENT_ENTITLEMENTS_SUCCESS]: (state, action) => ({
      ...state,
      agreementEntitlements: action.payload
    }),
    [FETCH_AGREEMENT_PROPERTIES_SUCCESS]: (state, action) => ({
      ...state,
      agreementProperties: action.payload
    }),
    [FETCH_AGREEMENT_RELATIONSHIPS_SUCCESS]: (state, action) => ({
      ...state,
      agreementRelationships: action.payload
    }),
    [SET_ADD_AGREEMENT_SETTINGS]: (state, action) => ({
      ...state,
      addAgreementSettings: action.payload
    }),
    [SET_RELATIONSHIP_ACTION_SETTINGS]: (state, action) => ({
      ...state,
      relationshipActionSettings: action.payload
    }),
    [ADD_AGREEMENT_SUCCESS]: (state, action) => ({
      ...state,
      addAgreementResponse: action.payload
    }),
    [DELETE_AGREEMENT_SUCCESS]: (state, action) => ({
      ...state,
      deleteAgreementResponse: action.payload
    }),
    [UPDATE_AGREEMENT_PROPERTIES_SUCCESS]: (state, action) => ({
      ...state,
      updateAgreementResponse: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      addAgreementResponse: '',
      deleteAgreementResponse: '',
      updateAgreementResponse: ''
    }),
    [COPY_AGREEMENT_PROPERTIES]: (state, action) => ({
      ...state,
      copiedAgreementProperties: action.payload
    }),
    [COPY_AGREEMENT_DATA]: (state, action) => ({
      ...state,
      copiedAgreementData: action.payload
    }),
    [SET_EDIT_COMPONENT_FLAG]: (state, action) => ({
      ...state,
      isEditComponent: action.payload
    }),
    [PUSH_COMPONENT_PROPERTY_PAYLOAD]: (state, action) => ({
      ...state,
      agreementPropertiesPayload: action.payload
    }),
    [EDIT_COMPONENT_PROPERTIES]: (state, action) => ({
      ...state,
      agreementProperties: action.payload.property,
      agreement: action.payload.agreement
    }),
    [RESTORE_AGREEMENT_PROPERTIES]: (state, action) => ({
      ...state,
      agreementProperties: action.payload.property,
      agreement: action.payload.agreement
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
    [RESET_UPDATE_RELATIONSHIP_RESPONSE]: (state, action) => ({
      ...state,
      updateRelationshipResponse: '',
      updateRelationshipPropertyResponse: '',
      deleteRelationshipResponse: '',
      relationshipPropertyPayload: [],
      deleteComponent: ''
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    })
  },
  initialState
)

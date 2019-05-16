import { createAction, handleActions } from 'redux-actions'
import {
  FETCH_AGREEMENT_BY_ID_SUCCESS,
  FETCH_AGREEMENT_ENTITLEMENTS_SUCCESS,
  // FETCH_AGREEMENT_PROPERTIES_SUCCESS,
  // FETCH_AGREEMENT_RELATIONSHIPS_SUCCESS,
  FETCH_AGREEMENT_CONDITIONS_SUCCESS,
  FETCH_AGREEMENT_CONDITION_BY_ID_SUCCESS,
  FETCH_AGREEMENT_CONDITION_NOTIFICATION_PERIOD_SUCCESS,
  FETCH_AGREEMENT_PURCHASE_ORDER_SUCCESS,
  FETCH_AGREEMENT_PURCHASE_ORDER_BY_ID_SUCCESS,
  ADD_AGREEMENT_SUCCESS,
  DELETE_AGREEMENT_SUCCESS,
  UPDATE_AGREEMENT_PROPERTIES_SUCCESS,
  FETCH_RELATIONSHIP_PROPERTY_SUCCESS,
  UPDATE_RELATIONSHIP_PROPERTY_SUCCESS,
  DELETE_COMPONENT_RELATIONSHIP_SUCCESS,
  FETCH_COMPONENT_CONSTRAINTS_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS,
  UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS,
  ADD_AGREEMENT_CONDITION_SUCCESS,
  DELETE_AGREEMENT_CONDITION_SUCCESS,
  UPDATE_AGREEMENT_CONDITION_SUCCESS
} from '../../sagas/agreement/agreementSaga'
import {
  FETCH_META_MODEL_PRESPECTIVE_SUCCESS,
  UPDATE_MODEL_PRESPECTIVES_SUCCESS,
  FETCH_MODEL_PERSPECTIVE_SUCCESS
} from '../../sagas/model/modelSaga'
import {FETCH_DROPDOWN_DATA_SUCCESS} from '../../sagas/basic/basicSaga'
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
const SET_VALIDATION_PROPERTY = 'AgreementDetailReducer/SET_VALIDATION_PROPERTY'
const SET_ADD_CONDITION_SETTINGS = 'AgreementDetailReducer/SET_ADD_CONDITION_SETTINGS'
const SET_NOTIFICATION_PERIOD_DATA = 'AgreementDetailReducer/SET_NOTIFICATION_PERIOD_DATA'
const SET_SELECTED_DATE = 'AgreementDetailReducer/SET_SELECTED_DATE'
const SET_SELECTED_NOTIFICATION_PERIOD = 'AgreementDetailReducer/SET_SELECTED_NOTIFICATION_PERIOD'
const SET_UPDATE_AGREEMENT_CONDITION_SETTINGS = 'AgreementDetailReducer/SET_UPDATE_AGREEMENT_CONDITION_SETTINGS'
const SET_PURCHASE_ORDER_SETTING = 'AgreementDetailReducer/SET_PURCHASE_ORDER_SETTING'
const SET_ADD_SETTINGS = 'AgreementDetailReducer/SET_ADD_SETTINGS'
const SET_AVAILABLE_ACTION = 'AgreementDetailReducer/SET_AVAILABLE_ACTION'
const SET_CONNECTION_DATA = 'AgreementDetailReducer/SET_CONNECTION_DATA'
const SET_START_DATE = 'AgreementDetailReducer/SET_START_DATE'
const SET_AGREEMENT_RELATIONSHIP = 'AgreementDetailReducer/SET_AGREEMENT_RELATIONSHIP'
const SET_AGREEMENT_PROPERTY = 'AgreementDetailReducer/SET_AGREEMENT_PROPERTY'

export const actions = {
    FETCH_AGREEMENT_BY_ID_SUCCESS,
    FETCH_AGREEMENT_ENTITLEMENTS_SUCCESS,
    // FETCH_AGREEMENT_PROPERTIES_SUCCESS,
    // FETCH_AGREEMENT_RELATIONSHIPS_SUCCESS,
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
    SET_CURRENT_PAGE,
    SET_VALIDATION_PROPERTY,
    SET_ADD_CONDITION_SETTINGS,
    FETCH_AGREEMENT_CONDITIONS_SUCCESS,
    FETCH_AGREEMENT_CONDITION_BY_ID_SUCCESS,
    ADD_AGREEMENT_CONDITION_SUCCESS,
    DELETE_AGREEMENT_CONDITION_SUCCESS,
    FETCH_AGREEMENT_CONDITION_NOTIFICATION_PERIOD_SUCCESS,
    SET_NOTIFICATION_PERIOD_DATA,
    UPDATE_AGREEMENT_CONDITION_SUCCESS,
    SET_SELECTED_DATE,
    SET_UPDATE_AGREEMENT_CONDITION_SETTINGS,
    SET_SELECTED_NOTIFICATION_PERIOD,
    FETCH_AGREEMENT_PURCHASE_ORDER_SUCCESS,
    FETCH_AGREEMENT_PURCHASE_ORDER_BY_ID_SUCCESS,
    SET_PURCHASE_ORDER_SETTING,
    SET_ADD_SETTINGS,
    SET_AVAILABLE_ACTION,
    SET_CONNECTION_DATA,
    SET_START_DATE,
    SET_AGREEMENT_RELATIONSHIP,
    SET_AGREEMENT_PROPERTY
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
    setCurrentPage: createAction(SET_CURRENT_PAGE),
    setValidationProperty: createAction(SET_VALIDATION_PROPERTY),
    setAddConditionSettings: createAction(SET_ADD_CONDITION_SETTINGS),
    setNotificationPeriodData: createAction(SET_NOTIFICATION_PERIOD_DATA),
    setSelectedDate: createAction(SET_SELECTED_DATE),
    setUpdateAgreementConditionSettings: createAction(SET_UPDATE_AGREEMENT_CONDITION_SETTINGS),
    setSelectedNotificationPeriod: createAction(SET_SELECTED_NOTIFICATION_PERIOD),
    setPurchaseOrderSettings: createAction(SET_PURCHASE_ORDER_SETTING),
    setAddSettings: createAction(SET_ADD_SETTINGS),
    setAvailableAction: createAction(SET_AVAILABLE_ACTION),
    setConnectionData: createAction(SET_CONNECTION_DATA),
    setStartDate: createAction(SET_START_DATE),
    setAgreementRelationship: createAction(SET_AGREEMENT_RELATIONSHIP),
    setAgreementProperty: createAction(SET_AGREEMENT_PROPERTY)
  }

export const initialState = {
  agreement: '',
  addAgreementResponse: '',
  deleteAgreementResponse: '',
  selectedDate: null,
  selectedNotificationPeriod: null,
  updateAgreementResponse: '',
  updateRelationshipResponse: '',
  updateRelationshipPropertyResponse: '',
  deleteRelationshipResponse: '',
  agreementProperties: '',
  copiedAgreementProperties: '',
  copiedAgreementData: '',
  agreementRelationships: [],
  agreementEntitlements: '',
  isEditComponent: false,
  agreementPropertiesPayload: {property: [], agreement: [], relationship: []},
  addAgreementSettings: {
    isAddModalOpen: false,
    isDeleteModalOpen: false,
    isUpdateModalOpen: false,
    isConfirmationModalOpen: false
  },
  agreementPurchaseOrderSettings: {
    isPoModalOpen: false,
    purchaseOrderData: null
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
  currentPage: 1,
  validationProperty: [],
  addConditionActionSettings: {
    isAddConditionModalOpen: false,
    isUpdateConditionModalOpen: false,
    isDeleteConditionModalOpen: false,
    isViewConditionModalOpen: false,
    conditionData: null,
    notificationPeriodSelected: '',
    isEditFlag: true
  },
  agreementConditions: '',
  agreementCondition: '',
  addAgreementConditionResponse: '',
  deleteAgreementConditionResponse: '',
  updateAgreementConditionResponse: '',
  agreementConditionNotificationPeriod: '',
  agreementPurchaseOrders: '',
  agreementPurchaseOrderById: '',
  notificationPeriodData: '',
  updateAgreementConditionSettings: {
    isEditFlag: false,
    name: '',
    description: '',
    duedate: '',
    'notificationPeriod': ''
  },
  addSettings: {
    isAddModalOpen: false,
    isDeleteModalOpen: false,
    isEditModalOpen: false,
    isConfirmationModalOpen: false,
    updateResponse: null,
    name: '',
    description: ''
  },
  metaModelPerspective: '',
  modelPerspective: '',
  updateModelPerspectiveResponse: '',
  availableAction: {
    Create: false,
    Read: false,
    Update: false,
    Delete: false,
    toProcessMetaModel: false,
    toProcessModelPerspectives: false
  },
  connectionData: '',
  dropdownData: '',
  startDate: ''
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
    // [FETCH_AGREEMENT_PROPERTIES_SUCCESS]: (state, action) => ({
    //   ...state,
    //   agreementProperties: action.payload
    // }),
    // [FETCH_AGREEMENT_RELATIONSHIPS_SUCCESS]: (state, action) => ({
    //   ...state,
    //   agreementRelationships: action.payload
    // }),
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
      updateAgreementResponse: '',
      addAgreementConditionResponse: '',
      deleteAgreementConditionResponse: '',
      updateAgreementConditionResponse: '',
      updateModelPerspectiveResponse: '',
      dropdownData: ''
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
    }),
    [SET_VALIDATION_PROPERTY]: (state, action) => ({
      ...state,
      validationProperty: action.payload
    }),
    [SET_ADD_CONDITION_SETTINGS]: (state, action) => ({
      ...state,
      addConditionActionSettings: action.payload
    }),
    [FETCH_AGREEMENT_CONDITIONS_SUCCESS]: (state, action) => ({
      ...state,
      agreementConditions: action.payload
    }),
    [FETCH_AGREEMENT_CONDITION_BY_ID_SUCCESS]: (state, action) => ({
      ...state,
      agreementCondition: action.payload
    }),
    [ADD_AGREEMENT_CONDITION_SUCCESS]: (state, action) => ({
      ...state,
      addAgreementConditionResponse: action.payload
    }),
    [DELETE_AGREEMENT_CONDITION_SUCCESS]: (state, action) => ({
      ...state,
      deleteAgreementConditionResponse: action.payload
    }),
    [UPDATE_AGREEMENT_CONDITION_SUCCESS]: (state, action) => ({
      ...state,
      updateAgreementConditionResponse: action.payload
    }),
    [FETCH_AGREEMENT_CONDITION_NOTIFICATION_PERIOD_SUCCESS]: (state, action) => ({
      ...state,
      agreementConditionNotificationPeriod: action.payload
    }),
    [SET_NOTIFICATION_PERIOD_DATA]: (state, action) => ({
      ...state,
      notificationPeriodData: action.payload
    }),
    [SET_SELECTED_DATE]: (state, action) => ({
      ...state,
      selectedDate: action.payload
    }),
    [SET_UPDATE_AGREEMENT_CONDITION_SETTINGS]: (state, action) => ({
      ...state,
      setUpdateAgreementConditionSettings: action.payload
    }),
    [SET_SELECTED_NOTIFICATION_PERIOD]: (state, action) => ({
      ...state,
      selectedNotificationPeriod: action.payload
    }),
    [FETCH_AGREEMENT_PURCHASE_ORDER_SUCCESS]: (state, action) => ({
      ...state,
      agreementPurchaseOrders: action.payload
    }),
    [FETCH_AGREEMENT_PURCHASE_ORDER_BY_ID_SUCCESS]: (state, action) => ({
      ...state,
      agreementPurchaseOrderById: action.payload
    }),
    [SET_PURCHASE_ORDER_SETTING]: (state, action) => ({
      ...state,
      agreementPurchaseOrderSettings: action.payload
    }),
    [SET_AVAILABLE_ACTION]: (state, action) => ({
      ...state,
      availableAction: action.payload
    }),
    [SET_CONNECTION_DATA]: (state, action) => ({
      ...state,
      connectionData: action.payload
    }),
    [FETCH_META_MODEL_PRESPECTIVE_SUCCESS]: (state, action) => ({
      ...state,
      metaModelPerspective: action.payload,
      availableAction: {...state.availableAction, 'toProcessMetaModel': true}
    }),
    [FETCH_DROPDOWN_DATA_SUCCESS]: (state, action) => ({
      ...state,
      dropdownData: action.payload
    }),
    [UPDATE_MODEL_PRESPECTIVES_SUCCESS]: (state, action) => ({
      ...state,
      updateModelPerspectiveResponse: action.payload
    }),
    [SET_ADD_SETTINGS]: (state, action) => ({
      ...state,
      addSettings: action.payload
    }),
    [FETCH_MODEL_PERSPECTIVE_SUCCESS]: (state, action) => ({
      ...state,
      modelPerspective: action.payload,
      availableAction: {...state.availableAction, 'toProcessModelPerspectives': true}
    }),
    [SET_START_DATE]: (state, action) => ({
      ...state,
      startDate: action.payload
    }),
    [SET_AGREEMENT_RELATIONSHIP]: (state, action) => ({
      ...state,
      agreementRelationships: action.payload
    }),
    [SET_AGREEMENT_PROPERTY]: (state, action) => ({
      ...state,
      agreementProperties: action.payload
    })
  },
  initialState
)

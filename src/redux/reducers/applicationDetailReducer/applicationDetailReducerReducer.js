import { createAction, handleActions } from 'redux-actions'
import {
  FETCH_APPLICATIONS_SUMMARY_SUCCESS,
  FETCH_APPLICATIONS_SUCCESS,
  FETCH_APPLICATION_BY_ID_SUCCESS,
  // FETCH_APPLICATION_PROPERTIES_SUCCESS,
  FETCH_APPLICATION_RELATIONSHIPS_SUCCESS,
  FETCH_APPLICATION_ENTITLEMENTS_SUCCESS,
  FETCH_APPLICATION_SOFTWARES_SUCCESS,
  ADD_LINK_SUCCESS,
  UPDATE_LINK_SUCCESS,
  DELETE_LINK_SUCCESS
} from '../../sagas/application/applicationSaga'
import {
  FETCH_META_MODEL_PRESPECTIVE_SUCCESS,
  FETCH_COMPONENT_MODEL_PRESPECTIVES_SUCCESS
} from '../../sagas/model/modelSaga'
import { FETCH_ENTITLEMENTS_SUCCESS } from '../../sagas/entitlement/entitlementSaga'
import { FETCH_SUPPLIERS_SUCCESS } from '../../sagas/supplier/supplierSaga'
import { FETCH_AGREEMENTS_SUCCESS } from '../../sagas/agreement/agreementSaga'
import { FETCH_SOFTWARES_SUCCESS } from '../../sagas/software/softwareSaga'
// Name Spaced Action Types
const SET_APPLICATION_PROPERTY = 'applicationDetailReducer/SET_APPLICATION_PROPERTY'
const SET_APPLICATION_RELATIONSHIP = 'applicationDetailReducer/SET_APPLICATION_RELATIONSHIP'
const SET_CURRENT_TAB = 'applicationDetailReducer/SET_CURRENT_TAB'
const RESET_RESPONSE = 'applicationDetailReducer/RESET_RESPONSE'
const SET_RESPONSE_PROCESSED = 'applicationDetailReducer/SET_RESPONSE_PROCESSED'
const SET_CURRENT_PAGE = 'applicationDetailReducer/SET_CURRENT_PAGE'
const SET_LINK_ACTION_SETTINGS = 'applicationDetailReducer/SET_LINK_ACTION_SETTINGS'
export const actions = {
  FETCH_APPLICATIONS_SUMMARY_SUCCESS,
  FETCH_APPLICATIONS_SUCCESS,
  FETCH_APPLICATION_BY_ID_SUCCESS,
  // FETCH_APPLICATION_PROPERTIES_SUCCESS,
  FETCH_APPLICATION_RELATIONSHIPS_SUCCESS,
  FETCH_META_MODEL_PRESPECTIVE_SUCCESS,
  FETCH_COMPONENT_MODEL_PRESPECTIVES_SUCCESS,
  SET_CURRENT_TAB,
  RESET_RESPONSE,
  SET_APPLICATION_PROPERTY,
  SET_APPLICATION_RELATIONSHIP,
  SET_RESPONSE_PROCESSED,
  SET_CURRENT_PAGE,
  SET_LINK_ACTION_SETTINGS
}

export const actionCreators = {
  setCurrentTab: createAction(SET_CURRENT_TAB),
  resetResponse: createAction(RESET_RESPONSE),
  setApplicationProperty: createAction(SET_APPLICATION_PROPERTY),
  setApplicationRelationship: createAction(SET_APPLICATION_RELATIONSHIP),
  setResponseProcessed: createAction(SET_RESPONSE_PROCESSED),
  setCurrentPage: createAction(SET_CURRENT_PAGE),
  setLinkActionSettings: createAction(SET_LINK_ACTION_SETTINGS)
}

export const initialState = {
  application: '',
  applicationSummary: '',
  applicationbyId: '',
  applicationProperties: [],
  metaModelPrespective: '',
  modelPrespective: '',
  // applicationProperties: '',
  responseProcessed: {
    metaModelPrespective: false,
    modelPrespective: false,
    applicationRelationships: false
  },
  applicationRelationships: '',
  applicationRelationshipData: '',
  showTabs: {
    'parentTab': 'Application',
    'showProperty': ' active show',
    'showRelationship': ''
  },
  entitlements: '',
  softwares: '',
  suppliers: '',
  agreements: '',
  applicationEntitlements: '',
  applicationSoftwares: '',
  perPage: 10,
  currentPage: 1,
  linkActionSettings: {
    isLinkModalOpen: false,
    isLinkDeleteModalOpen: false,
    isLinkUpdateModalOpen: false,
    SelectedObject: null,
    entitlement: null,
    agreement: null,
    supplier: null,
    licenseCount: 0
  },
  addLinkResponse: '',
  updateLinkResponse: '',
  removeLinkResponse: ''
 }

export default handleActions(
  {
    [FETCH_APPLICATIONS_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      applicationSummary: action.payload
    }),
    [FETCH_APPLICATIONS_SUCCESS]: (state, action) => ({
      ...state,
      application: action.payload
    }),
    [FETCH_APPLICATION_BY_ID_SUCCESS]: (state, action) => ({
      ...state,
      applicationbyId: action.payload
    }),
    // [FETCH_APPLICATION_PROPERTIES_SUCCESS]: (state, action) => ({
    //   ...state,
    //   applicationProperties: action.payload
    // }),
    [SET_CURRENT_TAB]: (state, action) => ({
      ...state,
      showTabs: action.payload
    }),
    [FETCH_APPLICATION_RELATIONSHIPS_SUCCESS]: (state, action) => ({
      ...state,
      applicationRelationships: action.payload
    }),
    [FETCH_META_MODEL_PRESPECTIVE_SUCCESS]: (state, action) => ({
      ...state,
      metaModelPrespective: action.payload
    }),
    [FETCH_COMPONENT_MODEL_PRESPECTIVES_SUCCESS]: (state, action) => ({
      ...state,
      modelPrespective: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      modelPrespective: '',
      metaModelPrespective: '',
      addLinkResponse: '',
      updateLinkResponse: '',
      removeLinkResponse: ''
    }),
    [SET_APPLICATION_PROPERTY]: (state, action) => ({
      ...state,
      applicationProperties: action.payload
    }),
    [SET_APPLICATION_RELATIONSHIP]: (state, action) => ({
      ...state,
      applicationRelationshipData: action.payload
    }),
    [SET_RESPONSE_PROCESSED]: (state, action) => ({
      ...state,
      responseProcessed: action.payload
    }),
    [FETCH_ENTITLEMENTS_SUCCESS]: (state, action) => ({
      ...state,
      entitlements: action.payload
    }),
    [FETCH_SUPPLIERS_SUCCESS]: (state, action) => ({
      ...state,
      suppliers: action.payload
    }),
    [FETCH_AGREEMENTS_SUCCESS]: (state, action) => ({
      ...state,
      agreements: action.payload
    }),
    [FETCH_SOFTWARES_SUCCESS]: (state, action) => ({
      ...state,
      softwares: action.payload
    }),
    [FETCH_APPLICATION_ENTITLEMENTS_SUCCESS]: (state, action) => ({
      ...state,
      applicationEntitlements: action.payload
    }),
    [FETCH_APPLICATION_SOFTWARES_SUCCESS]: (state, action) => ({
      ...state,
      applicationSoftwares: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    }),
    [SET_LINK_ACTION_SETTINGS]: (state, action) => ({
      ...state,
      linkActionSettings: action.payload
    }),
    [ADD_LINK_SUCCESS]: (state, action) => ({
      ...state,
      addLinkResponse: action.payload
    }),
    [UPDATE_LINK_SUCCESS]: (state, action) => ({
      ...state,
      updateLinkResponse: action.payload
    }),
    [DELETE_LINK_SUCCESS]: (state, action) => ({
      ...state,
      removeLinkResponse: action.payload
    })
  },
  initialState
)

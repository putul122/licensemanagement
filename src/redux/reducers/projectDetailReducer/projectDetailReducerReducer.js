import { createAction, handleActions } from 'redux-actions'
import {
  FETCH_PROJECT_BY_ID_SUCCESS,
  DELETE_PROJECT_SUCCESS,
  FETCH_PROJECT_ENTITLEMENTS_SUCCESS,
  FETCH_PROJECT_PROPERTIES_SUCCESS,
  UPDATE_PROJECT_PROPERTIES_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS,
  UPDATE_PROJECT_ENTITLEMENTS_SUCCESS,
  DELETE_PROJECT_ENTITLEMENTS_SUCCESS,
  ADD_PROJECT_ENTITLEMENTS_SUCCESS
} from '../../sagas/project/projectSaga'
// Name Spaced Action Types
const SET_DELETE_PROJECT_MODAL_OPEN_STATUS = 'ProjectDetailReducer/SET_DELETE_PROJECT_MODAL_OPEN_STATUS'
const SET_ENTITLEMENTS_ACTION_SETTINGS = 'ProjectDetailReducer/SET_ENTITLEMENTS_ACTION_SETTINGS'
const SET_EDIT_COMPONENT_FLAG = 'ProjectDetailReducer/SET_EDIT_COMPONENT_FLAG'
const PUSH_COMPONENT_PROPERTY_PAYLOAD = 'ProjectDetailReducer/PUSH_COMPONENT_PROPERTY_PAYLOAD'
const EDIT_COMPONENT_PROPERTIES = 'ProjectDetailReducer/EDIT_COMPONENT_PROPERTIES'
const COPY_PROJECT_PROPERTIES = 'ProjectDetailReducer/COPY_PROJECT_PROPERTIES'
const COPY_PROJECT_DATA = 'ProjectDetailReducer/COPY_PROJECT_DATA'
const RESTORE_PROJECT_PROPERTIES = 'ProjectDetailReducer/RESTORE_PROJECT_PROPERTIES'
const RESET_RESPONSE = 'ProjectDetailReducer/RESET_RESPONSE'
const SET_CURRENT_PAGE = 'ProjectDetailReducer/SET_CURRENT_PAGE'

export const actions = {
  SET_DELETE_PROJECT_MODAL_OPEN_STATUS,
  SET_ENTITLEMENTS_ACTION_SETTINGS,
  FETCH_PROJECT_BY_ID_SUCCESS,
  DELETE_PROJECT_SUCCESS,
  FETCH_PROJECT_ENTITLEMENTS_SUCCESS,
  FETCH_PROJECT_PROPERTIES_SUCCESS,
  UPDATE_PROJECT_PROPERTIES_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS,
  UPDATE_PROJECT_ENTITLEMENTS_SUCCESS,
  DELETE_PROJECT_ENTITLEMENTS_SUCCESS,
  ADD_PROJECT_ENTITLEMENTS_SUCCESS,
  SET_EDIT_COMPONENT_FLAG,
  PUSH_COMPONENT_PROPERTY_PAYLOAD,
  EDIT_COMPONENT_PROPERTIES,
  COPY_PROJECT_PROPERTIES,
  COPY_PROJECT_DATA,
  RESTORE_PROJECT_PROPERTIES,
  RESET_RESPONSE,
  SET_CURRENT_PAGE
}

export const actionCreators = {
  setDeleteProjectModalStatus: createAction(SET_DELETE_PROJECT_MODAL_OPEN_STATUS),
  setEntitlementActionSettings: createAction(SET_ENTITLEMENTS_ACTION_SETTINGS),
  setEditComponentFlag: createAction(SET_EDIT_COMPONENT_FLAG),
  pushComponentPropertyPayload: createAction(PUSH_COMPONENT_PROPERTY_PAYLOAD),
  editComponentProperties: createAction(EDIT_COMPONENT_PROPERTIES),
  copyProjectProperties: createAction(COPY_PROJECT_PROPERTIES),
  copyProjectData: createAction(COPY_PROJECT_DATA),
  restoreProjectProperties: createAction(RESTORE_PROJECT_PROPERTIES),
  resetResponse: createAction(RESET_RESPONSE),
  setCurrentPage: createAction(SET_CURRENT_PAGE)
}

export const initialState = {
  projectData: '',
  projectEntitlements: '',
  projectProperties: '',
  isEditComponent: false,
  copiedProjectProperties: '',
  copiedProjectData: '',
  updateProjectResponse: '',
  addProjectEntitlementResponse: '',
  updateProjectEntitlementResponse: '',
  deleteProjectEntitlementResponse: '',
  deleteProjectResponse: '',
  entitlementComponents: '',
  projectPropertiesPayload: {property: [], project: []},
  modalDeleteProjectIsOpen: false,
  entitlementActionSettings: {
    isLinkModalOpen: false,
    isProjectDeleteModalOpen: false,
    isLinkDeleteModalOpen: false,
    isLinkUpdateModalOpen: false,
    isConfirmationModalOpen: false,
    entitlementSelected: null,
    licenseCount: 0,
    updateEntitlementData: null
  },
  currentPage: 1,
  perPage: 5
}

export default handleActions(
  {
    [FETCH_PROJECT_BY_ID_SUCCESS]: (state, action) => ({
      ...state,
      projectData: action.payload
    }),
    [DELETE_PROJECT_SUCCESS]: (state, action) => ({
      ...state,
      deleteProjectResponse: action.payload
    }),
    [FETCH_PROJECT_ENTITLEMENTS_SUCCESS]: (state, action) => ({
      ...state,
      projectEntitlements: action.payload
    }),
    [FETCH_PROJECT_PROPERTIES_SUCCESS]: (state, action) => ({
      ...state,
      projectProperties: action.payload
    }),
    [UPDATE_PROJECT_PROPERTIES_SUCCESS]: (state, action) => ({
      ...state,
      updateProjectResponse: action.payload
    }),
    [ADD_PROJECT_ENTITLEMENTS_SUCCESS]: (state, action) => ({
      ...state,
      addProjectEntitlementResponse: action.payload
    }),
    [UPDATE_PROJECT_ENTITLEMENTS_SUCCESS]: (state, action) => ({
      ...state,
      updateProjectEntitlementResponse: action.payload
    }),
    [DELETE_PROJECT_ENTITLEMENTS_SUCCESS]: (state, action) => ({
      ...state,
      deleteProjectEntitlementResponse: action.payload
    }),
    [SET_DELETE_PROJECT_MODAL_OPEN_STATUS]: (state, action) => ({
      ...state,
      modalDeleteProjectIsOpen: action.payload
    }),
    [SET_ENTITLEMENTS_ACTION_SETTINGS]: (state, action) => ({
        ...state,
      entitlementActionSettings: action.payload
    }),
    [SET_EDIT_COMPONENT_FLAG]: (state, action) => ({
      ...state,
      isEditComponent: action.payload
    }),
    [FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS]: (state, action) => ({
      ...state,
      entitlementComponents: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      updateProjectResponse: '',
      addProjectEntitlementResponse: '',
      updateProjectEntitlementResponse: '',
      deleteProjectEntitlementResponse: '',
      deleteProjectResponse: ''
    }),
    [COPY_PROJECT_PROPERTIES]: (state, action) => ({
      ...state,
      copiedProjectProperties: action.payload
    }),
    [COPY_PROJECT_DATA]: (state, action) => ({
      ...state,
      copiedProjectData: action.payload
    }),
    [PUSH_COMPONENT_PROPERTY_PAYLOAD]: (state, action) => ({
      ...state,
      projectPropertiesPayload: action.payload
    }),
    [EDIT_COMPONENT_PROPERTIES]: (state, action) => ({
      ...state,
      projectProperties: action.payload.property,
      projectData: action.payload.project
    }),
    [RESTORE_PROJECT_PROPERTIES]: (state, action) => ({
      ...state,
      projectProperties: action.payload.property,
      projectData: action.payload.project
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    })
  },
  initialState
)

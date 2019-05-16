import { createAction, handleActions } from 'redux-actions'
import {
  FETCH_SOFTWARE_BY_ID_SUCCESS,
  DELETE_SOFTWARE_SUCCESS,
  FETCH_SOFTWARE_PROPERTIES_SUCCESS,
  FETCH_SOFTWARE_RELATIONSHIPS_SUCCESS
} from '../../sagas/software/softwareSaga'
import {
  FETCH_META_MODEL_PRESPECTIVE_SUCCESS,
  UPDATE_MODEL_PRESPECTIVES_SUCCESS,
  FETCH_MODEL_PERSPECTIVE_SUCCESS
} from '../../sagas/model/modelSaga'
import {FETCH_DROPDOWN_DATA_SUCCESS} from '../../sagas/basic/basicSaga'
// Name Spaced Action Types
const SET_CURRENT_TAB = 'softwareDetailReducer/SET_CURRENT_TAB'
const RESET_RESPONSE = 'softwareDetailReducer/RESET_RESPONSE'
const SET_ADD_SETTINGS = 'softwareDetailReducer/SET_ADD_SETTINGS'
const SET_AVAILABLE_ACTION = 'softwareDetailReducer/SET_AVAILABLE_ACTION'
const SET_CONNECTION_DATA = 'softwareDetailReducer/SET_CONNECTION_DATA'
const SET_SOFTWARE_PROPERTY = 'softwareDetailReducer/SET_SOFTWARE_PROPERTY'
const SET_SOFTWARE_RELATIONSHIP = 'softwareDetailReducer/SET_SOFTWARE_RELATIONSHIP'

export const actions = {
  FETCH_SOFTWARE_BY_ID_SUCCESS,
  FETCH_SOFTWARE_PROPERTIES_SUCCESS,
  FETCH_SOFTWARE_RELATIONSHIPS_SUCCESS,
  RESET_RESPONSE,
  SET_ADD_SETTINGS,
  SET_AVAILABLE_ACTION,
  SET_CONNECTION_DATA,
  SET_SOFTWARE_PROPERTY,
  SET_SOFTWARE_RELATIONSHIP
}

export const actionCreators = {
  setCurrentTab: createAction(SET_CURRENT_TAB),
  resetResponse: createAction(RESET_RESPONSE),
  setAddSettings: createAction(SET_ADD_SETTINGS),
  setAvailableAction: createAction(SET_AVAILABLE_ACTION),
  setConnectionData: createAction(SET_CONNECTION_DATA),
  setSoftwareProperty: createAction(SET_SOFTWARE_PROPERTY),
  setSoftwareRelationship: createAction(SET_SOFTWARE_RELATIONSHIP)
}

export const initialState = {
  softwarebyId: '',
  softwareProperties: [],
  modelPerspective: '',
  softwareRelationships: [],
  showTabs: {'showProperty': ' active show', 'showRelationship': ''},
  updateSoftwareResponse: '',
  deleteSoftwareResponse: '',
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
  availableAction: {
    Create: false,
    Read: false,
    Update: false,
    Delete: false,
    toProcessMetaModel: false,
    toProcessModelPerspectives: false
  },
  connectionData: '',
  dropdownData: ''
}

export default handleActions(
  {
    [FETCH_SOFTWARE_BY_ID_SUCCESS]: (state, action) => ({
      ...state,
      softwarebyId: action.payload
    }),
    // [FETCH_SOFTWARE_PROPERTIES_SUCCESS]: (state, action) => ({
    //   ...state,
    //   softwareProperties: action.payload
    // }),
    [SET_CURRENT_TAB]: (state, action) => ({
      ...state,
      showTabs: action.payload
    }),
    // [FETCH_SOFTWARE_RELATIONSHIPS_SUCCESS]: (state, action) => ({
    //   ...state,
    //   softwareRelationships: action.payload
    // }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      addSoftwareResponse: '',
      updateSoftwareResponse: '',
      deleteSoftwareResponse: '',
      dropdownData: ''
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
      updateSoftwareResponse: action.payload
    }),
    [SET_ADD_SETTINGS]: (state, action) => ({
      ...state,
      addSettings: action.payload
    }),
    [DELETE_SOFTWARE_SUCCESS]: (state, action) => ({
      ...state,
      deleteSoftwareResponse: action.payload
    }),
    [FETCH_MODEL_PERSPECTIVE_SUCCESS]: (state, action) => ({
      ...state,
      modelPerspective: action.payload,
      availableAction: {...state.availableAction, 'toProcessModelPerspectives': true}
    }),
    [SET_SOFTWARE_PROPERTY]: (state, action) => ({
      ...state,
      softwareProperties: action.payload
    }),
    [SET_SOFTWARE_RELATIONSHIP]: (state, action) => ({
      ...state,
      softwareRelationships: action.payload
    })
  },
  initialState
)

import {createAction, handleActions} from 'redux-actions'
import {
  FETCH_SOFTWARES_SUCCESS,
  ADD_SOFTWARE_SUCCESS,
  FETCH_SOFTWARES_SUMMARY_SUCCESS,
  FETCH_SOFTWARE_AGREEMENTS_SUCCESS
} from '../../sagas/software/softwareSaga'
import {
  FETCH_META_MODEL_PRESPECTIVE_SUCCESS,
  UPDATE_MODEL_PRESPECTIVES_SUCCESS
} from '../../sagas/model/modelSaga'
import {FETCH_DROPDOWN_DATA_SUCCESS} from '../../sagas/basic/basicSaga'
// Name Spaced Action Types
// const INCREMENT = 'BasicReducer/INCREMENT'
const SET_CURRENT_PAGE = 'softwaresReducer/SET_CURRENT_PAGE'
const SET_EXPAND_SETTINGS = 'softwaresReducer/SET_EXPAND_SETTINGS'
const RESET_RESPONSE = 'softwaresReducer/RESET_RESPONSE'
const SET_PER_PAGE = 'softwaresReducer/SET_PER_PAGE'
const SET_ADD_SETTINGS = 'softwaresReducer/SET_ADD_SETTINGS'
const SET_AVAILABLE_ACTION = 'softwaresReducer/SET_AVAILABLE_ACTION'
const SET_CONNECTION_DATA = 'softwaresReducer/SET_CONNECTION_DATA'

export const actions = {
  FETCH_SOFTWARES_SUCCESS,
  FETCH_SOFTWARES_SUMMARY_SUCCESS,
  SET_CURRENT_PAGE,
  FETCH_SOFTWARE_AGREEMENTS_SUCCESS,
  SET_EXPAND_SETTINGS,
  RESET_RESPONSE,
  SET_PER_PAGE,
  SET_ADD_SETTINGS,
  SET_AVAILABLE_ACTION,
  SET_CONNECTION_DATA
}

export const actionCreators = {
  setCurrentPage: createAction(SET_CURRENT_PAGE),
  setExpandSettings: createAction(SET_EXPAND_SETTINGS),
  resetResponse: createAction(RESET_RESPONSE),
  setPerPage: createAction(SET_PER_PAGE),
  setAddSettings: createAction(SET_ADD_SETTINGS),
  setAvailableAction: createAction(SET_AVAILABLE_ACTION),
  setConnectionData: createAction(SET_CONNECTION_DATA)
}

export const initialState = {
  software: '',
  softwareSummary: '',
  currentPage: 1,
  softwareAgreements: '',
  perPage: 10,
  expandSettings: {
    selectedId: '',
    expandFlag: false
  },
  addSoftwareResponse: '',
  addSettings: {
    isAddModalOpen: false,
    isDeleteModalOpen: false,
    isUpdateModalOpen: false,
    isConfirmationModalOpen: false,
    createResponse: null
  },
  metaModelPerspective: '',
  availableAction: {
    toProcess: false
  },
  connectionData: '',
  dropdownData: ''
}

export default handleActions(
  {
    [FETCH_SOFTWARES_SUCCESS]: (state, action) => ({
      ...state,
      software: action.payload
    }),
    [FETCH_SOFTWARES_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      softwareSummary: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    }),
    [SET_PER_PAGE]: (state, action) => ({
      ...state,
      perPage: action.payload
    }),
    [FETCH_SOFTWARE_AGREEMENTS_SUCCESS]: (state, action) => ({
      ...state,
      softwareAgreements: action.payload
    }),
    [SET_EXPAND_SETTINGS]: (state, action) => ({
      ...state,
      expandSettings: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      addSoftwareResponse: '',
      updateComponentResponse: '',
      deleteComponentResponse: '',
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
    [ADD_SOFTWARE_SUCCESS]: (state, action) => ({
      ...state,
      addSoftwareResponse: action.payload
    }),
    [FETCH_META_MODEL_PRESPECTIVE_SUCCESS]: (state, action) => ({
      ...state,
      metaModelPerspective: action.payload,
      availableAction: {...state.availableAction, 'toProcess': true}
    }),
    [FETCH_DROPDOWN_DATA_SUCCESS]: (state, action) => ({
      ...state,
      dropdownData: action.payload
    }),
    [UPDATE_MODEL_PRESPECTIVES_SUCCESS]: (state, action) => ({
      ...state,
      addSoftwareResponse: action.payload
    }),
    [SET_ADD_SETTINGS]: (state, action) => ({
      ...state,
      addSettings: action.payload
    })
  },
  initialState
)

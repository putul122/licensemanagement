import {createAction, handleActions} from 'redux-actions'
import {FETCH_ENTITLEMENTS_SUMMARY_SUCCESS, FETCH_ENTITLEMENTS_SUCCESS} from '../../sagas/entitlement/entitlementSaga'
// import {FETCH_APPLICATIONS_SUCCESS} from '../../sagas/application/applicationSaga'
import {
  FETCH_META_MODEL_PRESPECTIVE_SUCCESS,
  UPDATE_MODEL_PRESPECTIVES_SUCCESS
} from '../../sagas/model/modelSaga'
import {FETCH_DROPDOWN_DATA_SUCCESS} from '../../sagas/basic/basicSaga'
// Name Spaced Action Types
const SET_CURRENT_PAGE = 'entitlementsReducer/SET_CURRENT_PAGE'
const RESET_RESPONSE = 'entitlementsReducer/RESET_RESPONSE'
const SET_PER_PAGE = 'entitlementsReducer/SET_PER_PAGE'
const SET_AVAILABLE_ACTION = 'entitlementsReducer/SET_AVAILABLE_ACTION'
const SET_CONNECTION_DATA = 'entitlementsReducer/SET_CONNECTION_DATA'
const SET_ADD_ENTITLEMENT_SETTINGS = 'entitlementsReducer/SET_ADD_ENTITLEMENT_SETTINGS'

export const actions = {
  FETCH_ENTITLEMENTS_SUMMARY_SUCCESS,
  FETCH_ENTITLEMENTS_SUCCESS,
  SET_CURRENT_PAGE,
  RESET_RESPONSE,
  SET_PER_PAGE,
  FETCH_META_MODEL_PRESPECTIVE_SUCCESS,
  SET_AVAILABLE_ACTION,
  SET_CONNECTION_DATA,
  FETCH_DROPDOWN_DATA_SUCCESS,
  UPDATE_MODEL_PRESPECTIVES_SUCCESS,
  SET_ADD_ENTITLEMENT_SETTINGS
}

export const actionCreators = {
  setCurrentPage: createAction(SET_CURRENT_PAGE),
  resetResponse: createAction(RESET_RESPONSE),
  setPerPage: createAction(SET_PER_PAGE),
  setAvailableAction: createAction(SET_AVAILABLE_ACTION),
  setConnectionData: createAction(SET_CONNECTION_DATA),
  setAddEntitlementSettings: createAction(SET_ADD_ENTITLEMENT_SETTINGS)
}

export const initialState = {
  entitlements: '',
  entitlementsSummary: '',
  currentPage: 1,
  perPage: 10,
  addEntitlementResponse: '',
  metaModelPerspective: '',
  availableAction: {
    toProcess: false
  },
  connectionData: '',
  dropdownData: '',
  addEntitlementSettings: {
    isAddModalOpen: false,
    createResponse: null
  }
}

export default handleActions(
  {
    [FETCH_ENTITLEMENTS_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      entitlementsSummary: action.payload
    }),
    [FETCH_ENTITLEMENTS_SUCCESS]: (state, action) => ({
      ...state,
      entitlements: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    }),
    [UPDATE_MODEL_PRESPECTIVES_SUCCESS]: (state, action) => ({
      ...state,
      addEntitlementResponse: action.payload
    }),
    [SET_PER_PAGE]: (state, action) => ({
      ...state,
      perPage: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      addEntitlementResponse: '',
      dropdownData: ''
    }),
    [SET_ADD_ENTITLEMENT_SETTINGS]: (state, action) => ({
      ...state,
      addEntitlementSettings: action.payload
    }),
    [FETCH_META_MODEL_PRESPECTIVE_SUCCESS]: (state, action) => ({
      ...state,
      metaModelPerspective: action.payload,
      availableAction: {...state.availableAction, 'toProcess': true}
    }),
    [SET_AVAILABLE_ACTION]: (state, action) => ({
      ...state,
      availableAction: action.payload
    }),
    [SET_CONNECTION_DATA]: (state, action) => ({
      ...state,
      connectionData: action.payload
    }),
    [FETCH_DROPDOWN_DATA_SUCCESS]: (state, action) => ({
      ...state,
      dropdownData: action.payload
    })
  },
  initialState
)

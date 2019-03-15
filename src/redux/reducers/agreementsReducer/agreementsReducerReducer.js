import { createAction, handleActions } from 'redux-actions'
import {FETCH_AGREEMENTS_SUCCESS, ADD_AGREEMENT_SUCCESS, FETCH_AGREEMENTS_SUMMARY_SUCCESS} from '../../sagas/agreement/agreementSaga'
import {
  FETCH_META_MODEL_PRESPECTIVE_SUCCESS,
  UPDATE_MODEL_PRESPECTIVES_SUCCESS
} from '../../sagas/model/modelSaga'
import {FETCH_DROPDOWN_DATA_SUCCESS} from '../../sagas/basic/basicSaga'
// Name Spaced Action Types
const SET_CURRENT_PAGE = 'AgreementsReducer/SET_CURRENT_PAGE'
const SET_ADD_AGREEMENT_SETTINGS = 'AgreementsReducer/SET_ADD_AGREEMENT_SETTINGS'
const SET_PER_PAGE = 'AgreementsReducer/SET_PER_PAGE'
const SET_AVAILABLE_ACTION = 'AgreementsReducer/SET_AVAILABLE_ACTION'
const SET_CONNECTION_DATA = 'AgreementsReducer/SET_CONNECTION_DATA'
const RESET_RESPONSE = 'AgreementsReducer/RESET_RESPONSE'

export const actions = {
  FETCH_AGREEMENTS_SUCCESS,
  FETCH_AGREEMENTS_SUMMARY_SUCCESS,
  SET_CURRENT_PAGE,
  SET_ADD_AGREEMENT_SETTINGS,
  ADD_AGREEMENT_SUCCESS,
  SET_PER_PAGE,
  FETCH_META_MODEL_PRESPECTIVE_SUCCESS,
  SET_AVAILABLE_ACTION,
  SET_CONNECTION_DATA,
  FETCH_DROPDOWN_DATA_SUCCESS,
  RESET_RESPONSE,
  UPDATE_MODEL_PRESPECTIVES_SUCCESS
}

export const actionCreators = {
  setCurrentPage: createAction(SET_CURRENT_PAGE),
  setAddAgreementSettings: createAction(SET_ADD_AGREEMENT_SETTINGS),
  setPerPage: createAction(SET_PER_PAGE),
  setAvailableAction: createAction(SET_AVAILABLE_ACTION),
  setConnectionData: createAction(SET_CONNECTION_DATA),
  resetResponse: createAction(RESET_RESPONSE)
}

export const initialState = {
  agreements: '',
  agreementsSummary: '',
  currentPage: 1,
  perPage: 10,
  addAgreementResponse: '',
  addAgreementSettings: {
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
    [FETCH_AGREEMENTS_SUCCESS]: (state, action) => ({
        ...state,
        agreements: action.payload
    }),
    [FETCH_AGREEMENTS_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      agreementsSummary: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
    ...state,
    currentPage: action.payload
    }),
    [SET_ADD_AGREEMENT_SETTINGS]: (state, action) => ({
      ...state,
      addAgreementSettings: action.payload
    }),
    [SET_PER_PAGE]: (state, action) => ({
      ...state,
      perPage: action.payload
    }),
    [ADD_AGREEMENT_SUCCESS]: (state, action) => ({
      ...state,
      addAgreementResponse: action.payload
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
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      addAgreementResponse: '',
      updateComponentResponse: '',
      deleteComponentResponse: '',
      dropdownData: ''
    }),
    [UPDATE_MODEL_PRESPECTIVES_SUCCESS]: (state, action) => ({
      ...state,
      addAgreementResponse: action.payload
    })
  },
  initialState
)

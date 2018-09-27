import { createAction, handleActions } from 'redux-actions'
import {FETCH_AGREEMENTS_SUCCESS, ADD_AGREEMENT_SUCCESS, FETCH_AGREEMENTS_SUMMARY_SUCCESS} from '../../sagas/agreement/agreementSaga'
// Name Spaced Action Types
const SET_CURRENT_PAGE = 'AgreementsReducer/SET_CURRENT_PAGE'
const SET_ADD_AGREEMENT_SETTINGS = 'AgreementsReducer/SET_ADD_AGREEMENT_SETTINGS'

export const actions = {
    FETCH_AGREEMENTS_SUCCESS,
    FETCH_AGREEMENTS_SUMMARY_SUCCESS,
    SET_CURRENT_PAGE,
    SET_ADD_AGREEMENT_SETTINGS,
    ADD_AGREEMENT_SUCCESS
}

export const actionCreators = {
    setCurrentPage: createAction(SET_CURRENT_PAGE),
    setAddAgreementSettings: createAction(SET_ADD_AGREEMENT_SETTINGS)
}

export const initialState = {
  agreements: '',
  agreementsSummary: '',
  currentPage: 1,
  addAgreementResponse: '',
  addAgreementSettings: {
    isAddModalOpen: false,
    isDeleteModalOpen: false,
    isUpdateModalOpen: false,
    isConfirmationModalOpen: false
  }
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
    [ADD_AGREEMENT_SUCCESS]: (state, action) => ({
      ...state,
      addAgreementResponse: action.payload
    })
  },
  initialState
)

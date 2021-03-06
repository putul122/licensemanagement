import {createAction, handleActions} from 'redux-actions'
import {
  FETCH_META_MODEL_PRESPECTIVE_SUCCESS,
  FETCH_MODEL_PRESPECTIVES_SUCCESS,
  UPDATE_MODEL_PRESPECTIVES_SUCCESS,
  FETCH_ALL_MODEL_PRESPECTIVES_SUCCESS,
  UPDATE_ALL_MODEL_PRESPECTIVES_SUCCESS
} from '../../sagas/model/modelSaga'
const SET_CURRENT_PAGE = 'sheetsReducer/SET_CURRENT_PAGE'
const RESET_RESPONSE = 'sheetsReducer/RESET_RESPONSE'
const SET_PER_PAGE = 'sheetsReducer/SET_PER_PAGE'
const SET_PERSPECTIVES_DATA = 'sheetsReducer/SET_PERSPECTIVES_DATA'
const SET_MODAL_PERSPECTIVES_DATA = 'sheetsReducer/SET_MODAL_PERSPECTIVES_DATA'
const SET_MODAL_SETTING = 'sheetsReducer/SET_MODAL_SETTING'

export const actions = {
  FETCH_META_MODEL_PRESPECTIVE_SUCCESS,
  SET_CURRENT_PAGE,
  FETCH_MODEL_PRESPECTIVES_SUCCESS,
  FETCH_ALL_MODEL_PRESPECTIVES_SUCCESS,
  UPDATE_ALL_MODEL_PRESPECTIVES_SUCCESS,
  RESET_RESPONSE,
  SET_PER_PAGE,
  SET_PERSPECTIVES_DATA,
  SET_MODAL_SETTING,
  UPDATE_MODEL_PRESPECTIVES_SUCCESS,
  SET_MODAL_PERSPECTIVES_DATA
}

export const actionCreators = {
  setCurrentPage: createAction(SET_CURRENT_PAGE),
  resetResponse: createAction(RESET_RESPONSE),
  setPerPage: createAction(SET_PER_PAGE),
  setPerspectivesData: createAction(SET_PERSPECTIVES_DATA),
  setModalPerspectivesData: createAction(SET_MODAL_PERSPECTIVES_DATA),
  setModalSetting: createAction(SET_MODAL_SETTING)
}

export const initialState = {
   modelPrespectives: '',
   copyModelPrespectives: '',
   modelPrespectiveData: '',
   exportAllData: '',
   currentPage: 1,
   perPage: 10,
   metaModelPerspective: '',
   updateMetaModelPerspectiveResponse: '',
   perspectives: [],
   modalSettings: {
    isExportAllModalOpen: false,
    isImportAllModalOpen: false,
    isExportModalOpen: false,
    isImportModalOpen: false,
    selectedMetaModel: null,
    columnRow: [],
    enterFileName: '',
    fileData: [],
    apiData: [],
    updateResponse: null,
    isFileLoading: false,
    isImportButtonEnabled: false,
    exportValidationClass: 'form-group m-form__group row',
    exportAllPayload: '',
    isConfirmPressed: false,
    formData: null
  }
}

export default handleActions(
  {
    [FETCH_META_MODEL_PRESPECTIVE_SUCCESS]: (state, action) => ({
      ...state,
      metaModelPerspective: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    }),
    [FETCH_MODEL_PRESPECTIVES_SUCCESS]: (state, action) => ({
      ...state,
      modelPrespectiveData: action.payload
    }),
    [FETCH_ALL_MODEL_PRESPECTIVES_SUCCESS]: (state, action) => ({
      ...state,
      exportAllData: action.payload
    }),
    [SET_PER_PAGE]: (state, action) => ({
      ...state,
      perPage: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      updateMetaModelPerspectiveResponse: '',
      modelPrespectiveData: '',
      exportAllData: ''
    }),
    [SET_PERSPECTIVES_DATA]: (state, action) => ({
      ...state,
      perspectives: action.payload
    }),
    [SET_MODAL_SETTING]: (state, action) => ({
      ...state,
      modalSettings: action.payload
    }),
    [UPDATE_MODEL_PRESPECTIVES_SUCCESS]: (state, action) => ({
      ...state,
      updateMetaModelPerspectiveResponse: action.payload
    }),
    [UPDATE_ALL_MODEL_PRESPECTIVES_SUCCESS]: (state, action) => ({
      ...state,
      updateMetaModelPerspectiveResponse: action.payload
    }),
    [SET_MODAL_PERSPECTIVES_DATA]: (state, action) => ({
      ...state,
      modelPrespectives: action.payload.data,
      copyModelPrespectives: action.payload.copyData
    })
  },
  initialState
)

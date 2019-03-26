import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_SOFTWARES = 'saga/software/FETCH_SOFTWARES'
export const FETCH_SOFTWARES_SUCCESS = 'saga/software/FETCH_SOFTWARES_SUCCESS'
export const FETCH_SOFTWARES_FAILURE = 'saga/software/FETCH_SOFTWARES_FAILURE'
export const FETCH_SOFTWARES_SUMMARY = 'saga/software/FETCH_SOFTWARES_SUMMARY'
export const FETCH_SOFTWARES_SUMMARY_SUCCESS = 'saga/software/FETCH_SOFTWARES_SUMMARY_SUCCESS'
export const FETCH_SOFTWARES_SUMMARY_FAILURE = 'saga/software/FETCH_SOFTWARES_SUMMARY_FAILURE'
export const FETCH_SOFTWARE_BY_ID = 'saga/software/FETCH_SOFTWARE_BY_ID'
export const FETCH_SOFTWARE_BY_ID_SUCCESS = 'saga/software/FETCH_SOFTWARE_BY_ID_SUCCESS'
export const FETCH_SOFTWARE_BY_ID_FAILURE = 'saga/software/FETCH_SOFTWARE_BY_ID_FAILURE'
export const FETCH_SOFTWARE_PROPERTIES = 'saga/software/FETCH_SOFTWARE_PROPERTIES'
export const FETCH_SOFTWARE_PROPERTIES_SUCCESS = 'saga/software/FETCH_SOFTWARE_PROPERTIES_SUCCESS'
export const FETCH_SOFTWARE_PROPERTIES_FAILURE = 'saga/software/FETCH_SOFTWARE_PROPERTIES_FAILURE'
export const FETCH_SOFTWARE_RELATIONSHIPS = 'saga/software/FETCH_SOFTWARE_RELATIONSHIPS'
export const FETCH_SOFTWARE_RELATIONSHIPS_SUCCESS = 'saga/software/FETCH_SOFTWARE_RELATIONSHIPS_SUCCESS'
export const FETCH_SOFTWARE_RELATIONSHIPS_FAILURE = 'saga/software/FETCH_SOFTWARE_RELATIONSHIPS_FAILURE'
export const FETCH_SOFTWARE_AGREEMENTS = 'saga/software/FETCH_SOFTWARE_AGREEMENTS'
export const FETCH_SOFTWARE_AGREEMENTS_SUCCESS = 'saga/software/FETCH_SOFTWARE_AGREEMENTS_SUCCESS'
export const FETCH_SOFTWARE_AGREEMENTS_FAILURE = 'saga/software/FETCH_SOFTWARE_AGREEMENTS_FAILURE'
export const ADD_SOFTWARE = 'saga/software/ADD_SOFTWARE'
export const ADD_SOFTWARE_SUCCESS = 'saga/software/ADD_SOFTWARE_SUCCESS'
export const ADD_SOFTWARE_FAILURE = 'saga/software/ADD_SOFTWARE_FAILURE'
export const DELETE_SOFTWARE = 'saga/software/DELETE_SOFTWARE'
export const DELETE_SOFTWARE_SUCCESS = 'saga/software/DELETE_SOFTWARE_SUCCESS'
export const DELETE_SOFTWARE_FAILURE = 'saga/software/DELETE_SOFTWARE_FAILURE'
export const UPDATE_SOFTWARE = 'saga/software/UPDATE_SOFTWARE'
export const UPDATE_SOFTWARE_SUCCESS = 'saga/software/UPDATE_SOFTWARE_SUCCESS'
export const UPDATE_SOFTWARE_FAILURE = 'saga/software/UPDATE_SOFTWARE_FAILURE'
export const actionCreators = {
  fetchSoftwares: createAction(FETCH_SOFTWARES),
  fetchSoftwaresSuccess: createAction(FETCH_SOFTWARES_SUCCESS),
  fetchSoftwaresFailure: createAction(FETCH_SOFTWARES_FAILURE),
  fetchSoftwaresSummary: createAction(FETCH_SOFTWARES_SUMMARY),
  fetchSoftwaresSummarySuccess: createAction(FETCH_SOFTWARES_SUMMARY_SUCCESS),
  fetchSoftwaresSummaryFailure: createAction(FETCH_SOFTWARES_SUMMARY_FAILURE),
  fetchSoftwareById: createAction(FETCH_SOFTWARE_BY_ID),
  fetchSoftwareByIdSuccess: createAction(FETCH_SOFTWARE_BY_ID_SUCCESS),
  fetchSoftwareByIdFailure: createAction(FETCH_SOFTWARE_BY_ID_FAILURE),
  fetchSoftwareProperties: createAction(FETCH_SOFTWARE_PROPERTIES),
  fetchSoftwarePropertiesSuccess: createAction(FETCH_SOFTWARE_PROPERTIES_SUCCESS),
  fetchSoftwarePropertiesFailure: createAction(FETCH_SOFTWARE_PROPERTIES_FAILURE),
  fetchSoftwareRelationships: createAction(FETCH_SOFTWARE_RELATIONSHIPS),
  fetchSoftwareRelationshipsSuccess: createAction(FETCH_SOFTWARE_RELATIONSHIPS_SUCCESS),
  fetchSoftwareRelationshipsFailure: createAction(FETCH_SOFTWARE_RELATIONSHIPS_FAILURE),
  fetchSoftwareAgreement: createAction(FETCH_SOFTWARE_AGREEMENTS),
  fetchSoftwareAgreementSuccess: createAction(FETCH_SOFTWARE_AGREEMENTS_SUCCESS),
  fetchSoftwareAgreementFailure: createAction(FETCH_SOFTWARE_AGREEMENTS_FAILURE),
  addSoftware: createAction(ADD_SOFTWARE),
  addSoftwareSuccess: createAction(ADD_SOFTWARE_SUCCESS),
  addSoftwareFailure: createAction(ADD_SOFTWARE_FAILURE),
  deleteSoftware: createAction(DELETE_SOFTWARE),
  deleteSoftwareSuccess: createAction(DELETE_SOFTWARE_SUCCESS),
  deleteSoftwareFailure: createAction(DELETE_SOFTWARE_FAILURE),
  updateSoftware: createAction(UPDATE_SOFTWARE),
  updateSoftwareSuccess: createAction(UPDATE_SOFTWARE_SUCCESS),
  updateSoftwareFailure: createAction(UPDATE_SOFTWARE_FAILURE)
}

export default function * watchSuppliers () {
  yield [
      takeLatest(FETCH_SOFTWARES, getSoftwares),
      takeLatest(FETCH_SOFTWARES_SUMMARY, getSoftwaresSummary),
      takeLatest(FETCH_SOFTWARE_BY_ID, getSoftwareById),
      takeLatest(FETCH_SOFTWARE_PROPERTIES, getSoftwareProperties),
      takeLatest(FETCH_SOFTWARE_RELATIONSHIPS, getSoftwareRelationships),
      takeLatest(FETCH_SOFTWARE_AGREEMENTS, getSoftwareAgreements),
      takeLatest(ADD_SOFTWARE, addSoftware),
      takeLatest(UPDATE_SOFTWARE, updateSoftwareData),
      takeLatest(DELETE_SOFTWARE, deleteSoftware)
  ]
}

export function * addSoftware (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const software = yield call(
      axios.post,
      api.addSoftware,
      action.payload
    )
    yield put(actionCreators.addSoftwareSuccess(software.data))
  } catch (error) {
    yield put(actionCreators.addSoftwareFailure(error))
  }
}

export function * updateSoftwareData (action) {
  console.log('track agreement data api call', action)
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const software = yield call(
      axios.patch,
      api.updateComponent(action.payload),
      action.payload.agreement
    )
    yield put(actionCreators.updateSoftwareSuccess(software.data))
  } catch (error) {
    yield put(actionCreators.updateSoftwareFailure(error))
  }
}

export function * deleteSoftware (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const deleteSoftware = yield call(
      axios.delete,
      api.deleteSoftware(action.payload.id)
     )
    yield put(actionCreators.deleteSoftwareSuccess(deleteSoftware.data))
  } catch (error) {
    yield put(actionCreators.deleteSoftwareFailure(error))
  }
}

export function * getSoftwareProperties (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const softwareProperties = yield call(
      axios.get,
      api.getSoftwareProperties(action.payload.software_id)
    )
    yield put(actionCreators.fetchSoftwarePropertiesSuccess(softwareProperties.data))
  } catch (error) {
    yield put(actionCreators.fetchSoftwarePropertiesFailure(error))
  }
}

export function * getSoftwareRelationships (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const softwareRelationships = yield call(
      axios.get,
      api.getSoftwareRelationships(action.payload.software_id)
    )
    yield put(actionCreators.fetchSoftwareRelationshipsSuccess(softwareRelationships.data))
  } catch (error) {
    yield put(actionCreators.fetchSoftwareRelationshipsFailure(error))
  }
}

export function * getSoftwares (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const softwares = yield call(
      axios.get,
      api.getSoftwares,
      {params: action.payload}
    )
    yield put(actionCreators.fetchSoftwaresSuccess(softwares.data))
  } catch (error) {
    yield put(actionCreators.fetchSoftwaresFailure(error))
  }
}

export function * getSoftwaresSummary (action) {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
      const softwaresSummary = yield call(
        axios.get,
        api.getSoftwareSummary,
        {params: action.payload}
      )
      yield put(actionCreators.fetchSoftwaresSummarySuccess(softwaresSummary.data))
    } catch (error) {
      yield put(actionCreators.fetchSoftwaresSummaryFailure(error))
    }
  }

  export function * getSoftwareById (action) {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
      const software = yield call(
        axios.get,
        api.getSoftware,
        {params: action.payload}
      )
      yield put(actionCreators.fetchSoftwareByIdSuccess(software.data))
    } catch (error) {
      yield put(actionCreators.fetchSoftwareByIdFailure(error))
    }
  }

  export function * getSoftwareAgreements (action) {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
      const softwareAgreements = yield call(
        axios.get,
        api.getSoftwareAgreements,
        {params: action.payload}
      )
      yield put(actionCreators.fetchSoftwareAgreementSuccess(softwareAgreements.data))
    } catch (error) {
      yield put(actionCreators.fetchSoftwareAgreementFailure(error))
    }
  }

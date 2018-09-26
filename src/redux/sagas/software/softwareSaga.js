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
  fetchSoftwareAgreementFailure: createAction(FETCH_SOFTWARE_AGREEMENTS_FAILURE)
}

export default function * watchSuppliers () {
  yield [
      takeLatest(FETCH_SOFTWARES, getSoftwares),
      takeLatest(FETCH_SOFTWARES_SUMMARY, getSoftwaresSummary),
      takeLatest(FETCH_SOFTWARE_BY_ID, getSoftwareById),
      takeLatest(FETCH_SOFTWARE_PROPERTIES, getSoftwareProperties),
      takeLatest(FETCH_SOFTWARE_RELATIONSHIPS, getSoftwareRelationships),
      takeLatest(FETCH_SOFTWARE_AGREEMENTS, getSoftwareAgreements)
  ]
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
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
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
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
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
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
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
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
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

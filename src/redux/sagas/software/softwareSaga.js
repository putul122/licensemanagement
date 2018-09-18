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
export const FETCH_SOFTWARE_BY_ID = 'saga/application/FETCH_SOFTWARE_BY_ID'
export const FETCH_SOFTWARE_BY_ID_SUCCESS = 'saga/application/FETCH_SOFTWARE_BY_ID_SUCCESS'
export const FETCH_SOFTWARE_BY_ID_FAILURE = 'saga/application/FETCH_SOFTWARE_BY_ID_FAILURE'

export const actionCreators = {
  fetchSoftwares: createAction(FETCH_SOFTWARES),
  fetchSoftwaresSuccess: createAction(FETCH_SOFTWARES_SUCCESS),
  fetchSoftwaresFailure: createAction(FETCH_SOFTWARES_FAILURE),
  fetchSoftwaresSummary: createAction(FETCH_SOFTWARES_SUMMARY),
  fetchSoftwaresSummarySuccess: createAction(FETCH_SOFTWARES_SUMMARY_SUCCESS),
  fetchSoftwaresSummaryFailure: createAction(FETCH_SOFTWARES_SUMMARY_FAILURE),
  fetchSoftwareById: createAction(FETCH_SOFTWARE_BY_ID),
  fetchSoftwareByIdSuccess: createAction(FETCH_SOFTWARE_BY_ID_SUCCESS),
  fetchSoftwareByIdFailure: createAction(FETCH_SOFTWARE_BY_ID_FAILURE)
}

export default function * watchSuppliers () {
  yield [
      takeLatest(FETCH_SOFTWARES, getSoftwares),
      takeLatest(FETCH_SOFTWARES_SUMMARY, getSoftwaresSummary),
      takeLatest(FETCH_SOFTWARE_BY_ID, getSoftwareById)
  ]
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
        api.getSoftwareSummary
        // action.payload
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

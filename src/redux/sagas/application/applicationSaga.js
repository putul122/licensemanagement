import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_APPLICATIONS = 'saga/dashboard/FETCH_APPLICATIONS'
export const FETCH_APPLICATIONS_SUCCESS = 'saga/dashboard/FETCH_APPLICATIONS_SUCCESS'
export const FETCH_APPLICATIONS_FAILURE = 'saga/dashboard/FETCH_APPLICATIONS_FAILURE'
export const FETCH_APPLICATIONS_SUMMARY = 'saga/dashboard/FETCH_APPLICATIONS_SUMMARY'
export const FETCH_APPLICATIONS_SUMMARY_SUCCESS = 'saga/dashboard/FETCH_APPLICATIONS_SUMMARY_SUCCESS'
export const FETCH_APPLICATIONS_SUMMARY_FAILURE = 'saga/dashboard/FETCH_APPLICATIONS_SUMMARY_FAILURE'

export const actionCreators = {
  fetchApplications: createAction(FETCH_APPLICATIONS),
  fetchApplicationsSuccess: createAction(FETCH_APPLICATIONS_SUCCESS),
  fetchApplicationsFailure: createAction(FETCH_APPLICATIONS_FAILURE),
  fetchApplicationsSummary: createAction(FETCH_APPLICATIONS_SUMMARY),
  fetchApplicationsSummarySuccess: createAction(FETCH_APPLICATIONS_SUMMARY_SUCCESS),
  fetchApplicationsSummaryFailure: createAction(FETCH_APPLICATIONS_SUMMARY_FAILURE)
}

export default function * watchApplications () {
  yield [
      takeLatest(FETCH_APPLICATIONS, getApplications),
      takeLatest(FETCH_APPLICATIONS_SUMMARY, getApplicationsSummary)
  ]
}

export function * getApplications (action) {
  try {
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
    const applications = yield call(
      axios.get,
      api.getApplications
      // action.payload
    )
    yield put(actionCreators.fetchApplicationsSuccess(applications.data))
  } catch (error) {
    yield put(actionCreators.fetchApplicationsFailure(error))
  }
}

export function * getApplicationsSummary (action) {
    try {
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
      const applicationsSummary = yield call(
        axios.get,
        api.getApplicationsSummary
        // action.payload
      )
      yield put(actionCreators.fetchApplicationsSummarySuccess(applicationsSummary.data))
    } catch (error) {
      yield put(actionCreators.fetchApplicationsSummaryFailure(error))
    }
  }

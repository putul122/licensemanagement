import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_AGREEMENTS = 'saga/dashboard/FETCH_AGREEMENTS'
export const FETCH_AGREEMENTS_SUCCESS = 'saga/dashboard/FETCH_AGREEMENTS_SUCCESS'
export const FETCH_AGREEMENTS_FAILURE = 'saga/dashboard/FETCH_AGREEMENTS_FAILURE'
export const FETCH_AGREEMENTS_SUMMARY = 'saga/dashboard/FETCH_AGREEMENTS_SUMMARY'
export const FETCH_AGREEMENTS_SUMMARY_SUCCESS = 'saga/dashboard/FETCH_AGREEMENTS_SUMMARY_SUCCESS'
export const FETCH_AGREEMENTS_SUMMARY_FAILURE = 'saga/dashboard/FETCH_AGREEMENTS_SUMMARY_FAILURE'

export const actionCreators = {
  fetchAgreements: createAction(FETCH_AGREEMENTS),
  fetchAgreementsSuccess: createAction(FETCH_AGREEMENTS_SUCCESS),
  fetchAgreementsFailure: createAction(FETCH_AGREEMENTS_FAILURE),
  fetchAgreementsSummary: createAction(FETCH_AGREEMENTS_SUMMARY),
  fetchAgreementsSummarySuccess: createAction(FETCH_AGREEMENTS_SUMMARY_SUCCESS),
  fetchAgreementsSummaryFailure: createAction(FETCH_AGREEMENTS_SUMMARY_FAILURE)
}

export default function * watchAgreements () {
  yield [
      takeLatest(FETCH_AGREEMENTS, getAgreements),
      takeLatest(FETCH_AGREEMENTS_SUMMARY, getAgreementsSummary)
  ]
}

export function * getAgreements (action) {
  try {
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
    const agreements = yield call(
      axios.get,
      api.getAgreements
      // action.payload
    )
    yield put(actionCreators.fetchAgreementsSuccess(agreements.data))
  } catch (error) {
    yield put(actionCreators.fetchAgreementsFailure(error))
  }
}

export function * getAgreementsSummary (action) {
    try {
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
      const agreementsSummary = yield call(
        axios.get,
        api.getAgreementsSummary
        // action.payload
      )
      yield put(actionCreators.fetchAgreementsSummarySuccess(agreementsSummary.data))
    } catch (error) {
      yield put(actionCreators.fetchAgreementsSummaryFailure(error))
    }
  }

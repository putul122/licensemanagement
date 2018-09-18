import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_AGREEMENTS = 'saga/agreement/FETCH_AGREEMENTS'
export const FETCH_AGREEMENTS_SUCCESS = 'saga/agreement/FETCH_AGREEMENTS_SUCCESS'
export const FETCH_AGREEMENTS_FAILURE = 'saga/agreement/FETCH_AGREEMENTS_FAILURE'
export const FETCH_AGREEMENTS_SUMMARY = 'saga/agreement/FETCH_AGREEMENTS_SUMMARY'
export const FETCH_AGREEMENTS_SUMMARY_SUCCESS = 'saga/agreement/FETCH_AGREEMENTS_SUMMARY_SUCCESS'
export const FETCH_AGREEMENTS_SUMMARY_FAILURE = 'saga/agreement/FETCH_AGREEMENTS_SUMMARY_FAILURE'
export const FETCH_AGREEMENT_BY_ID = 'saga/agreement/FETCH_AGREEMENT_BY_ID'
export const FETCH_AGREEMENT_BY_ID_SUCCESS = 'saga/agreement/FETCH_AGREEMENT_BY_ID_SUCCESS'
export const FETCH_AGREEMENT_BY_ID_FAILURE = 'saga/agreement/FETCH_AGREEMENT_BY_ID_FAILURE'

export const actionCreators = {
  fetchAgreements: createAction(FETCH_AGREEMENTS),
  fetchAgreementsSuccess: createAction(FETCH_AGREEMENTS_SUCCESS),
  fetchAgreementsFailure: createAction(FETCH_AGREEMENTS_FAILURE),
  fetchAgreementsSummary: createAction(FETCH_AGREEMENTS_SUMMARY),
  fetchAgreementsSummarySuccess: createAction(FETCH_AGREEMENTS_SUMMARY_SUCCESS),
  fetchAgreementsSummaryFailure: createAction(FETCH_AGREEMENTS_SUMMARY_FAILURE),
  fetchSupplierById: createAction(FETCH_AGREEMENT_BY_ID),
  fetchSupplierByIdSuccess: createAction(FETCH_AGREEMENT_BY_ID_SUCCESS),
  fetchSupplierByIdFailure: createAction(FETCH_AGREEMENT_BY_ID_FAILURE)
}

export default function * watchAgreements () {
  yield [
      takeLatest(FETCH_AGREEMENTS, getAgreements),
      takeLatest(FETCH_AGREEMENTS_SUMMARY, getAgreementsSummary),
      takeLatest(FETCH_AGREEMENT_BY_ID, getAgreementById)
  ]
}

export function * getAgreements (action) {
  try {
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
    const agreements = yield call(
      axios.get,
      api.getAgreements,
      {params: action.payload}
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

export function * getAgreementById (action) {
  try {
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
    const agreement = yield call(
      axios.get,
      api.getAgreementById(action.payload.id)
      // action.payload
    )
    yield put(actionCreators.fetchSupplierByIdSuccess(agreement.data))
  } catch (error) {
    yield put(actionCreators.fetchSupplierByIdFailure(error))
  }
}

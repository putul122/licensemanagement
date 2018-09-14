import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_SUPPLIERS = 'saga/dashboard/FETCH_SUPPLIERS'
export const FETCH_SUPPLIERS_SUCCESS = 'saga/dashboard/FETCH_SUPPLIERS_SUCCESS'
export const FETCH_SUPPLIERS_FAILURE = 'saga/dashboard/FETCH_SUPPLIERS_FAILURE'
export const FETCH_SUPPLIERS_SUMMARY = 'saga/dashboard/FETCH_SUPPLIERS_SUMMARY'
export const FETCH_SUPPLIERS_SUMMARY_SUCCESS = 'saga/dashboard/FETCH_SUPPLIERS_SUMMARY_SUCCESS'
export const FETCH_SUPPLIERS_SUMMARY_FAILURE = 'saga/dashboard/FETCH_SUPPLIERS_SUMMARY_FAILURE'

export const actionCreators = {
  fetchSuppliers: createAction(FETCH_SUPPLIERS),
  fetchSuppliersSuccess: createAction(FETCH_SUPPLIERS_SUCCESS),
  fetchSuppliersFailure: createAction(FETCH_SUPPLIERS_FAILURE),
  fetchSuppliersSummary: createAction(FETCH_SUPPLIERS_SUMMARY),
  fetchSuppliersSummarySuccess: createAction(FETCH_SUPPLIERS_SUMMARY_SUCCESS),
  fetchSuppliersSummaryFailure: createAction(FETCH_SUPPLIERS_SUMMARY_FAILURE)
}

export default function * watchSuppliers () {
  yield [
      takeLatest(FETCH_SUPPLIERS, getSuppliers),
      takeLatest(FETCH_SUPPLIERS_SUMMARY, getSuppliersSummary)
  ]
}

export function * getSuppliers (action) {
  try {
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
    const suppliers = yield call(
      axios.get,
      api.getSuppliers,
      {params: action.payload}
    )
    yield put(actionCreators.fetchSuppliersSuccess(suppliers.data))
  } catch (error) {
    yield put(actionCreators.fetchSuppliersFailure(error))
  }
}

export function * getSuppliersSummary (action) {
    try {
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
      const suppliersSummary = yield call(
        axios.get,
        api.getSuppliersSummary
        // action.payload
      )
      yield put(actionCreators.fetchSuppliersSummarySuccess(suppliersSummary.data))
    } catch (error) {
      yield put(actionCreators.fetchSuppliersSummaryFailure(error))
    }
  }

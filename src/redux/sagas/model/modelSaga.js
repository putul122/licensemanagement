import axios from 'axios'
// import httpAdapter from 'axios/lib/adapters/http'
// import fs from 'fs'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'
// const OUTPUT = 'output.json'
// const output = fs.createWriteStream(OUTPUT)
// Saga action strings
export const FETCH_META_MODEL_PRESPECTIVE = 'saga/Model/FETCH_META_MODEL_PRESPECTIVE'
export const FETCH_META_MODEL_PRESPECTIVE_SUCCESS = 'saga/Model/FETCH_META_MODEL_PRESPECTIVE_SUCCESS'
export const FETCH_META_MODEL_PRESPECTIVE_FAILURE = 'saga/Model/FETCH_META_MODEL_PRESPECTIVE_FAILURE'
export const FETCH_MODEL_PRESPECTIVES = 'saga/Model/FETCH_MODEL_PRESPECTIVES'
export const FETCH_MODEL_PRESPECTIVES_SUCCESS = 'saga/Model/FETCH_MODEL_PRESPECTIVES_SUCCESS'
export const FETCH_MODEL_PRESPECTIVES_FAILURE = 'saga/Model/FETCH_MODEL_PRESPECTIVES_FAILURE'
export const UPDATE_MODEL_PRESPECTIVES = 'saga/Model/UPDATE_MODEL_PRESPECTIVES'
export const UPDATE_MODEL_PRESPECTIVES_SUCCESS = 'saga/Model/UPDATE_MODEL_PRESPECTIVES_SUCCESS'
export const UPDATE_MODEL_PRESPECTIVES_FAILURE = 'saga/Model/UPDATE_MODEL_PRESPECTIVES_FAILURE'

export const actionCreators = {
  fetchMetaModelPrespective: createAction(FETCH_META_MODEL_PRESPECTIVE),
  fetchMetaModelPrespectiveSuccess: createAction(FETCH_META_MODEL_PRESPECTIVE_SUCCESS),
  fetchMetaModelPrespectiveFailure: createAction(FETCH_META_MODEL_PRESPECTIVE_FAILURE),
  fetchModelPrespectives: createAction(FETCH_MODEL_PRESPECTIVES),
  fetchModelPrespectivesSuccess: createAction(FETCH_MODEL_PRESPECTIVES_SUCCESS),
  fetchModelPrespectivesFailure: createAction(FETCH_MODEL_PRESPECTIVES_FAILURE),
  updateModelPrespectives: createAction(UPDATE_MODEL_PRESPECTIVES),
  updateModelPrespectivesSuccess: createAction(UPDATE_MODEL_PRESPECTIVES_SUCCESS),
  updateModelPrespectivesFailure: createAction(UPDATE_MODEL_PRESPECTIVES_FAILURE)
}

export default function * watchModel () {
  yield [
    takeLatest(FETCH_META_MODEL_PRESPECTIVE, getMetaModelPrespective),
    takeLatest(FETCH_MODEL_PRESPECTIVES, getModelPerspectives),
    takeLatest(UPDATE_MODEL_PRESPECTIVES, updateModelPrespectives)
  ]
}

export function * getMetaModelPrespective (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const metaModelPrespective = yield call(
      axios.get,
      api.getMetaModelPerspective(action.payload)
    )
    yield put(actionCreators.fetchMetaModelPrespectiveSuccess(metaModelPrespective.data))
  } catch (error) {
    yield put(actionCreators.fetchMetaModelPrespectiveFailure(error))
  }
}

export function * getModelPerspectives (action) {
  try {
      console.log(action)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    axios.defaults.headers.common['responseType'] = 'stream'
    // axios.adapter = httpAdapter
    const modelPrespectives = yield call(
      axios.get,
      api.getModelPerspectives,
      {params: action.payload}
    )
    // modelPrespectives.data.pipe(console.log('modelPrespectives.data', modelPrespectives.data))
    // const stream = modelPrespectives.data
    // stream.on('data', (chunk /* chunk is an ArrayBuffer */) => {
    //     output.write(new Buffer(chunk))
    //     console.log('chunk', chunk)
    //     console.log('output', output)
    // })
    // stream.on('end', () => {
    //     output.end()
    //     console.log('output end', output)
    // })
    console.log('modelPrespectives', modelPrespectives)
    yield put(actionCreators.fetchModelPrespectivesSuccess(modelPrespectives.data))
  } catch (error) {
    yield put(actionCreators.fetchModelPrespectivesFailure(error))
  }
}

export function * updateModelPrespectives (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const modelPrespectives = yield call(
      axios.patch,
      api.updateModelPerspectives(action.payload.metaModelPerspectiveId),
      action.payload.data
    )
    yield put(actionCreators.updateModelPrespectivesSuccess(modelPrespectives.data))
  } catch (error) {
    yield put(actionCreators.updateModelPrespectivesFailure(error))
  }
}

import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_TASKS = 'saga/tasks/FETCH_TASKS'
export const FETCH_TASKS_SUCCESS = 'saga/tasks/FETCH_TASKS_SUCCESS'
export const FETCH_TASKS_FAILURE = 'saga/tasks/FETCH_TASKS_FAILURE'
export const FETCH_TASK_BY_ID = 'saga/tasks/FETCH_TASK_BY_ID'
export const FETCH_TASK_BY_ID_SUCCESS = 'saga/tasks/FETCH_TASK_BY_ID_SUCCESS'
export const FETCH_TASK_BY_ID_FAILURE = 'saga/tasks/FETCH_TASK_BY_ID_FAILURE'
export const UPDATE_TASK = 'saga/tasks/UPDATE_TASK'
export const UPDATE_TASK_SUCCESS = 'saga/tasks/UPDATE_TASK_SUCCESS'
export const UPDATE_TASK_FAILURE = 'saga/tasks/UPDATE_TASK_FAILURE'
export const FETCH_TASK_PROPERTIES = 'saga/tasks/FETCH_TASK_PROPERTIES'
export const FETCH_TASK_PROPERTIES_SUCCESS = 'saga/tasks/FETCH_TASK_PROPERTIES_SUCCESS'
export const FETCH_TASK_PROPERTIES_FAILURE = 'saga/tasks/FETCH_TASK_PROPERTIES_FAILURE'

export const actionCreators = {
  fetchTasks: createAction(FETCH_TASKS),
  fetchTasksSuccess: createAction(FETCH_TASKS_SUCCESS),
  fetchTasksFailure: createAction(FETCH_TASKS_FAILURE),
  fetchTaskById: createAction(FETCH_TASK_BY_ID),
  fetchTaskByIdSuccess: createAction(FETCH_TASK_BY_ID_SUCCESS),
  fetchTaskByIdFailure: createAction(FETCH_TASK_BY_ID_FAILURE),
  updateTask: createAction(UPDATE_TASK),
  updateTaskSuccess: createAction(UPDATE_TASK_SUCCESS),
  updateTaskFailure: createAction(UPDATE_TASK_FAILURE),
  fetchTaskProperties: createAction(FETCH_TASK_PROPERTIES),
  fetchTaskPropertiesSuccess: createAction(FETCH_TASK_PROPERTIES_SUCCESS),
  fetchTaskPropertiesFailure: createAction(FETCH_TASK_PROPERTIES_FAILURE)
}

export default function * watchTasks () {
  yield [
      takeLatest(FETCH_TASKS, getTasks),
      takeLatest(FETCH_TASK_BY_ID, getTaskById),
      takeLatest(UPDATE_TASK, updateTask),
      takeLatest(FETCH_TASK_PROPERTIES, getTaskProperty)
    ]
}

export function * getTaskProperty (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const taskProperties = yield call(
      axios.get,
      api.getTaskProperties(action.payload.id)
    )
    yield put(actionCreators.fetchTaskPropertiesSuccess(taskProperties.data))
  } catch (error) {
    yield put(actionCreators.fetchTaskPropertiesFailure(error))
  }
}

export function * getTasks (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const tasks = yield call(
      axios.get,
      api.getTasks,
      {params: action.payload}
    )
    yield put(actionCreators.fetchTasksSuccess(tasks.data))
  } catch (error) {
    yield put(actionCreators.fetchTasksFailure(error))
  }
}

export function * getTaskById (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const task = yield call(
      axios.get,
      api.getReviewTemplate,
      {params: action.payload}
    )
    yield put(actionCreators.fetchTaskByIdSuccess(task.data))
  } catch (error) {
    yield put(actionCreators.fetchTaskByIdFailure(error))
  }
}

export function * updateTask (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const task = yield call(
      axios.patch,
      api.updateTask(action.payload.id),
      action.payload.data
    )
    yield put(actionCreators.updateTaskSuccess(task.data))
  } catch (error) {
    yield put(actionCreators.updateTaskFailure(error))
  }
}

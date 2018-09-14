import {combineReducers} from 'redux'
import basicReducer from './basicReducer/basicReducerReducer'
import dashboardReducer from './dashboardReducer/dashboardReducerReducer'
import suppliersReducer from './suppliersReducer/suppliersReducerReducer'
export default combineReducers({
    basicReducer,
    dashboardReducer,
    suppliersReducer
})

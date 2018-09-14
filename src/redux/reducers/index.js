import {combineReducers} from 'redux'
import basicReducer from './basicReducer/basicReducerReducer'
import dashboardReducer from './dashboardReducer/dashboardReducerReducer'
import suppliersReducer from './suppliersReducer/suppliersReducerReducer'
import agreementsReducer from './agreementsReducer/agreementsReducerReducer'
export default combineReducers({
    basicReducer,
    dashboardReducer,
    suppliersReducer,
    agreementsReducer
})

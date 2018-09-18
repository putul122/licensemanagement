import {combineReducers} from 'redux'
import basicReducer from './basicReducer/basicReducerReducer'
import dashboardReducer from './dashboardReducer/dashboardReducerReducer'
import suppliersReducer from './suppliersReducer/suppliersReducerReducer'
import supplierDetailReducer from './supplierDetailReducer/supplierDetailReducerReducer'
import applicationDetailReducer from './applicationDetailReducer/applicationDetailReducerReducer'
import softwareDetailReducer from './softwareDetailReducer/softwareDetailReducerReducer'
import agreementsReducer from './agreementsReducer/agreementsReducerReducer'
import applicationsReducer from './applicationsReducer/applicationsReducerReducer'
import softwaresReducer from './softwaresReducer/softwaresReducerReducer'
export default combineReducers({
    basicReducer,
    dashboardReducer,
    suppliersReducer,
    supplierDetailReducer,
    applicationDetailReducer,
    agreementsReducer,
    applicationsReducer,
    softwaresReducer,
    softwareDetailReducer
})

import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Dashboard from '../../components/dashboard/dashboardComponent'
import { actions as sagaActions } from '../../redux/sagas/'
// import { actionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    suppliers: state.dashboardReducer.suppliers,
    suppliersSummary: state.dashboardReducer.suppliersSummary,
    application: state.dashboardReducer.application,
    applicationSummary: state.dashboardReducer.applicationSummary,
    agreements: state.dashboardReducer.agreements,
    entitlements: state.dashboardReducer.entitlements,
    softwareReference: state.dashboardReducer.softwareReference
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchApplicationsSummary: sagaActions.applicationActions.fetchApplicationsSummary,
  fetchAgreementsSummary: sagaActions.agreementActions.fetchAgreementsSummary,
  fetchSuppliersSummary: sagaActions.supplierActions.fetchSuppliersSummary
}

// If you want to use the function mapping
// export const propsMapping = (dispatch, ownProps) => {
//   return {
//     onClick: () => dispatch(actions.starsActions.FETCH_STARS)
//   }
// }

export default compose(
  connect(mapStateToProps, propsMapping),
  lifecycle({
    componentWillMount: function () {
      console.log('my props', this.props)
      this.props.fetchApplicationsSummary && this.props.fetchApplicationsSummary()
      this.props.fetchAgreementsSummary && this.props.fetchAgreementsSummary()
      this.props.fetchSuppliersSummary && this.props.fetchSuppliersSummary()
    }
  })
)(Dashboard)

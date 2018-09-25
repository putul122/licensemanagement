import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Dashboard from '../../components/dashboard/dashboardComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/dashboardReducer/dashboardReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    supplierSummary: state.dashboardReducer.supplierSummary,
    applicationSummary: state.dashboardReducer.applicationSummary,
    agreementSummary: state.dashboardReducer.agreementSummary,
    entitlementSummary: state.dashboardReducer.entitlementSummary,
    softwareSummary: state.dashboardReducer.softwareSummary,
    businessUnits: state.dashboardReducer.businessUnits,
    defaultSelect: state.dashboardReducer.defaultSelect
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchApplicationsSummary: sagaActions.applicationActions.fetchApplicationsSummary,
  fetchAgreementsSummary: sagaActions.agreementActions.fetchAgreementsSummary,
  fetchSuppliersSummary: sagaActions.supplierActions.fetchSuppliersSummary,
  fetchSoftwaresSummary: sagaActions.softwareActions.fetchSoftwaresSummary,
  fetchEntitlementsSummary: sagaActions.entitlementActions.fetchEntitlementsSummary,
  fetchBusinessUnits: sagaActions.basicActions.fetchBusinessUnits,
  setDefaultSelect: actionCreators.setDefaultSelect
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
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      this.props.fetchBusinessUnits && this.props.fetchBusinessUnits()
      this.props.fetchApplicationsSummary && this.props.fetchApplicationsSummary()
      this.props.fetchAgreementsSummary && this.props.fetchAgreementsSummary()
      this.props.fetchSuppliersSummary && this.props.fetchSuppliersSummary()
      this.props.fetchSoftwaresSummary && this.props.fetchSoftwaresSummary()
      this.props.fetchEntitlementsSummary && this.props.fetchEntitlementsSummary()
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      mApp.block('#supplierSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      mApp.block('#agreementSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      mApp.block('#applicationSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      mApp.block('#entitlementSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      mApp.block('#softwareSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      // if (nextProps.businessUnits && this.props.businessUnits === '' && nextProps.businessUnits !== this.props.businessUnits) {
      //   if (nextProps.businessUnits.error_code === null) {
      //     console.log('again run')
      //     let payload = {
      //       'business_unit_id': nextProps.businessUnits.resources[0].id
      //     }
      //     this.props.fetchApplicationsSummary && this.props.fetchApplicationsSummary(payload)
      //     this.props.fetchAgreementsSummary && this.props.fetchAgreementsSummary(payload)
      //     this.props.fetchSuppliersSummary && this.props.fetchSuppliersSummary(payload)
      //     this.props.fetchSoftwaresSummary && this.props.fetchSoftwaresSummary(payload)
      //     this.props.fetchEntitlementsSummary && this.props.fetchEntitlementsSummary(payload)
      //   } else {
      //     this.props.fetchBusinessUnits && this.props.fetchBusinessUnits()
      //   }
      // }
      if (nextProps.supplierSummary && nextProps.supplierSummary !== this.props.supplierSummary) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#supplierSummary')
      }
      if (nextProps.applicationSummary && nextProps.applicationSummary !== this.props.applicationSummary) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#applicationSummary')
      }
      if (nextProps.agreementSummary && nextProps.agreementSummary !== this.props.agreementSummary) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#agreementSummary')
      }
      if (nextProps.entitlementSummary && nextProps.entitlementSummary !== this.props.entitlementSummary) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#entitlementSummary')
      }
      if (nextProps.softwareSummary && nextProps.softwareSummary !== this.props.softwareSummary) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#softwareSummary')
      }
    }
  })
)(Dashboard)

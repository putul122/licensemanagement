import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import EntitlementDetail from '../../components/entitlementDetail/entitlementDetailComponent.js'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/entitlementDetailReducer/entitlementDetailReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    entitlement: state.entitlementDetailReducer.entitlement,
    entitlementSummary: state.entitlementDetailReducer.entitlementSummary,
    entitlementProperties: state.entitlementDetailReducer.entitlementProperties,
    entitlementRelationships: state.entitlementDetailReducer.entitlementRelationships,
    deleteEntitlementResponse: state.entitlementDetailReducer.deleteEntitlementResponse,
    updateEntitlementResponse: state.entitlementDetailReducer.updateEntitlementResponse,
    copiedEntitlementProperties: state.entitlementDetailReducer.copiedEntitlementProperties,
    copiedEntitlementData: state.entitlementDetailReducer.copiedEntitlementData,
    isEditComponent: state.entitlementDetailReducer.isEditComponent,
    entitlementPropertiesPayload: state.entitlementDetailReducer.entitlementPropertiesPayload,
    updateEntitlementSettings: state.entitlementDetailReducer.updateEntitlementSettings,
    updateEntitlementPropertyResponse: state.entitlementDetailReducer.updateEntitlementPropertyResponse
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchEntitlementById: sagaActions.entitlementActions.fetchEntitlementById,
  fetchEntitlementProperties: sagaActions.entitlementActions.fetchEntitlementProperties,
  fetchEntitlementRelationships: sagaActions.entitlementActions.fetchEntitlementRelationships,
  deleteEntitlement: sagaActions.entitlementActions.deleteEntitlement,
  updateEntitlement: sagaActions.entitlementActions.updateEntitlement,
  updateEntitlementProperties: sagaActions.entitlementActions.updateEntitlementProperties,
  resetResponse: actionCreators.resetResponse,
  setUpdateEntitlementSettings: actionCreators.setUpdateEntitlementSettings,
  setEditComponentFlag: actionCreators.setEditComponentFlag,
  pushEntitlementPropertyPayload: actionCreators.pushEntitlementPropertyPayload,
  editEntitlementProperties: actionCreators.editEntitlementProperties,
  copyEntitlementProperties: actionCreators.copyEntitlementProperties,
  copyEntitlementData: actionCreators.copyEntitlementData,
  restoreEntitlementProperties: actionCreators.restoreEntitlementProperties
}

// If you want to use the function mapping
// export const propsMapping = (dispatch, ownProps) => {
//   return {
//     onClick: () => dispatch(actions.starsActions.FETCH_STARS)
//   }
// }
// eslint-disable-next-line
toastr.options = {
  'closeButton': false,
  'debug': false,
  'newestOnTop': false,
  'progressBar': false,
  'positionClass': 'toast-bottom-full-width',
  'preventDuplicates': false,
  'onclick': null,
  'showDuration': '300',
  'hideDuration': '1000',
  'timeOut': '4000',
  'extendedTimeOut': '1000',
  'showEasing': 'swing',
  'hideEasing': 'linear',
  'showMethod': 'fadeIn',
  'hideMethod': 'fadeOut'
}

export default compose(
  connect(mapStateToProps, propsMapping),
  lifecycle({
    componentWillMount: function () {
    let payload = {
      'entitlement_id': this.props.match.params.id
    }
    this.props.fetchEntitlementById && this.props.fetchEntitlementById(payload)
    this.props.fetchEntitlementProperties && this.props.fetchEntitlementProperties(payload)
    this.props.fetchEntitlementRelationships && this.props.fetchEntitlementRelationships(payload)
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.deleteEntitlementResponse && nextProps.deleteEntitlementResponse !== '') {
        if (nextProps.deleteEntitlementResponse.error_code === null) {
          // eslint-disable-next-line
          toastr.success('The Entitlement ' +  nextProps.deleteEntitlementResponse.resources[0].name  +  ' was successfully deleted', 'Zapped!')
          this.props.history.push('/entitlements')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.deleteEntitlementResponse.error_message, nextProps.deleteEntitlementResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.updateEntitlementPropertyResponse && nextProps.updateEntitlementPropertyResponse !== '') {
        if (nextProps.updateEntitlementPropertyResponse.error_code === null) {
          let payload = {
            'entitlement_id': this.props.match.params.id
          }
          this.props.fetchEntitlementById && this.props.fetchEntitlementById(payload)
          // eslint-disable-next-line
          toastr.success('The ' + this.props.entitlement.resources[0].name + ' was successfully updated', 'Good Stuff!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.updateEntitlementPropertyResponse.error_message, nextProps.updateEntitlementPropertyResponse.error_code)
        }
        this.props.resetResponse()
      }
    }
  })
)(EntitlementDetail)

import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import EntitlementDetail from '../../components/entitlementDetail/entitlementDetailComponent.js'
import { actions as sagaActions } from '../../redux/sagas/'

// Global State
export function mapStateToProps (state, props) {
  return {
    entitlement: state.entitlementDetailReducer.entitlement,
    entitlementSummary: state.entitlementDetailReducer.entitlementSummary,
    entitlementProperties: state.entitlementDetailReducer.entitlementProperties,
    entitlementRelationships: state.entitlementDetailReducer.entitlementRelationships
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchEntitlementById: sagaActions.entitlementActions.fetchEntitlementById,
  fetchEntitlementProperties: sagaActions.entitlementActions.fetchEntitlementProperties,
  fetchEntitlementRelationships: sagaActions.entitlementActions.fetchEntitlementRelationships
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
    let payload = {
      'entitlement_id': this.props.match.params.id
    }
    this.props.fetchEntitlementById && this.props.fetchEntitlementById(payload)
    this.props.fetchEntitlementProperties && this.props.fetchEntitlementProperties(payload)
    this.props.fetchEntitlementRelationships && this.props.fetchEntitlementRelationships(payload)
    }
  })
)(EntitlementDetail)

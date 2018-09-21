import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import EntitlementsList from '../../components/entitlements/entitlementsComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/entitlementsReducer/entitlementsReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    entitlementsSummary: state.entitlementsReducer.entitlementsSummary,
    entitlements: state.entitlementsReducer.entitlements,
    currentPage: state.entitlementsReducer.currentPage
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchEntitlementsSummary: sagaActions.entitlementActions.fetchEntitlementsSummary,
  fetchEntitlements: sagaActions.entitlementActions.fetchEntitlements,
  setCurrentPage: actionCreators.setCurrentPage
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
      // eslint-disable-next-line
      // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      let payload = {
        'search': '',
        'page_size': 10,
        'page': 1
      }
      this.props.fetchEntitlements && this.props.fetchEntitlements(payload)
      this.props.fetchEntitlementsSummary && this.props.fetchEntitlementsSummary()
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      mApp && mApp.block('#entitlementSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.entitlements && nextProps.entitlements !== this.props.entitlements) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#entitlementList')
      }
      if (nextProps.entitlementsSummary && nextProps.entitlementsSummary !== this.props.entitlementsSummary) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#entitlementSummary')
      }
    }
  })
)(EntitlementsList)

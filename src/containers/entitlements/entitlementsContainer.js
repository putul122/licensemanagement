import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import EntitlementsList from '../../components/entitlements/entitlementsComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/entitlementsReducer/entitlementsReducerReducer'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    entitlementsSummary: state.entitlementsReducer.entitlementsSummary,
    entitlements: state.entitlementsReducer.entitlements,
    currentPage: state.entitlementsReducer.currentPage,
    addEntitlementResponse: state.entitlementsReducer.addEntitlementResponse,
    modalIsOpen: state.basicReducer.modalIsOpen,
    perPage: state.entitlementsReducer.perPage
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchEntitlementsSummary: sagaActions.entitlementActions.fetchEntitlementsSummary,
  fetchEntitlements: sagaActions.entitlementActions.fetchEntitlements,
  setCurrentPage: actionCreators.setCurrentPage,
  setPerPage: actionCreators.setPerPage,
  addEntitlement: sagaActions.entitlementActions.addEntitlement,
  setModalOpenStatus: basicActionCreators.setModalOpenStatus,
  setDiscussionModalOpenStatus: newDiscussionActionCreators.setDiscussionModalOpenStatus
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
      if (nextProps.addEntitlementResponse && nextProps.addEntitlementResponse !== '') {
        if (nextProps.addEntitlementResponse.error_code === null) {
          let newEntitlementId = nextProps.addEntitlementResponse.resources[0].id
          // eslint-disable-next-line
          toastr.success('We\'ve added the ' +  nextProps.addEntitlementResponse.resources[0].name  +  ' to your model' , 'Nice!')
          this.props.history.push('/entitlements/' + newEntitlementId)
          // eslint-disable-next-line
          location.reload()
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.addEntitlementResponse.error_message, nextProps.addEntitlementResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.perPage && nextProps.perPage !== this.props.perPage) {
        // eslint-disable-next-line
        mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        let payload = {
          'search': '',
          'page_size': nextProps.perPage,
          'page': 1
        }
        this.props.fetchEntitlements && this.props.fetchEntitlements(payload)
      }
    }
  })
)(EntitlementsList)

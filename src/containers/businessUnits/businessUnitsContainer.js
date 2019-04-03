import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import BusinessUnitsList from '../../components/businessUnits/businessUnitsComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/businessUnitsReducer/businessUnitsReducerReducer'
// import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
// import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    // authenticateUser: state.basicReducer.authenticateUser,
    businessUnitsSummary: state.businessUnitsReducer.businessUnitsSummary,
    businessUnits: state.businessUnitsReducer.businessUnits,
    currentPage: state.businessUnitsReducer.currentPage,
    // addEntitlementResponse: state.entitlementsReducer.addEntitlementResponse,
    // modalIsOpen: state.basicReducer.modalIsOpen,
    perPage: state.businessUnitsReducer.perPage
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
//   fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
     fetchBusinessUnitsSummary: sagaActions.businessUnitsActions.fetchBusinessUnitsSummary,
     fetchBusinessUnits: sagaActions.businessUnitsActions.fetchBusinessUnits,
     setCurrentPage: actionCreators.setCurrentPage,
     setPerPage: actionCreators.setPerPage
//   addEntitlement: sagaActions.entitlementActions.addEntitlement,
//   setModalOpenStatus: basicActionCreators.setModalOpenStatus,
//   setDiscussionModalOpenStatus: newDiscussionActionCreators.setDiscussionModalOpenStatus
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
    //   this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
    //   eslint-disable-next-line
      // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      let payload = {
        'details': true,
        'search': '',
        'page_size': 10,
        'page': 1
      }
      this.props.fetchBusinessUnits && this.props.fetchBusinessUnits(payload)
      this.props.fetchBusinessUnitsSummary && this.props.fetchBusinessUnitsSummary()
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      $('[data-toggle="m-tooltip"]').tooltip()
      // eslint-disable-next-line
      mApp && mApp.block('#entitlementSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
    //   if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
    //     if (!nextProps.authenticateUser.resources[0].result) {
    //       this.props.history.push('/')
    //     }
    //   }
      if (nextProps.businessUnits && nextProps.businessUnits !== this.props.businessUnits) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#entitlementList')
      }
      if (nextProps.businessUnitsSummary && nextProps.businessUnitsSummary !== this.props.businessUnitsSummary) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#entitlementSummary')
      }
    //   if (nextProps.addEntitlementResponse && nextProps.addEntitlementResponse !== '') {
    //     if (nextProps.addEntitlementResponse.error_code === null) {
    //       let newEntitlementId = nextProps.addEntitlementResponse.resources[0].id
    //       // eslint-disable-next-line
    //       toastr.success('We\'ve added the ' +  nextProps.addEntitlementResponse.resources[0].name  +  ' to your model' , 'Nice!')
    //       this.props.history.push('/entitlements/' + newEntitlementId)
    //       // eslint-disable-next-line
    //       location.reload()
    //     } else {
    //       // eslint-disable-next-line
    //       toastr.error(nextProps.addEntitlementResponse.error_message, nextProps.addEntitlementResponse.error_code)
    //     }
    //     this.props.resetResponse()
    //   }
      if (nextProps.perPage && nextProps.perPage !== this.props.perPage) {
        this.props.setCurrentPage(1)
        // eslint-disable-next-line
        mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        let payload = {
          'search': '',
          'page_size': nextProps.perPage,
          'page': 1
        }
        this.props.fetchBusinessUnits && this.props.fetchBusinessUnits(payload)
      }
    }
  })
)(BusinessUnitsList)

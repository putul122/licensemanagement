import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ProjectDetail from '../../components/projectDetail/projectDetailComponent'
// import { actions as sagaActions } from '../../redux/sagas/'
// import { actionCreators } from '../../redux/reducers/entitlementsReducer/entitlementsReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {}
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {}

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
    },
    componentDidMount: function () {},
    componentWillReceiveProps: function (nextProps) {
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
    //   if (nextProps.perPage && nextProps.perPage !== this.props.perPage) {
    //     this.props.setCurrentPage(1)
    //     // eslint-disable-next-line
    //     mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    //     let payload = {
    //       'search': '',
    //       'page_size': nextProps.perPage,
    //       'page': 1
    //     }
    //     this.props.fetchEntitlements && this.props.fetchEntitlements(payload)
    //   }
    }
  })
)(ProjectDetail)

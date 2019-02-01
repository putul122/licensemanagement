import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ApplicationActivity from '../../components/applicationActivity/applicationActivityComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/applicationActivityReducer/applicationActivityReducerReducer'
import { actionCreators as componentModalViewActionCreators } from '../../redux/reducers/componentModalViewReducer/componentModalViewReducerReducer'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    isLoggedin: state.loginReducer.isLoggedin,
    activityMessages: state.applicationActivityReducer.activityMessages,
    componentId: state.applicationActivityReducer.componentId,
    currentPage: state.applicationActivityReducer.currentPage
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
    activityMessage: sagaActions.applicationActivityActions.activityMessage,
    setComponentId: actionCreators.setComponentId,
    setCurrentPage: actionCreators.setCurrentPage,
    setModalSettings: componentModalViewActionCreators.setModalSettings,
    setQuickslideFlag: basicActionCreators.setQuickslideFlag
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
      console.log('Activity feed will mount', this.props)
      let payload = {}
      payload.page_size = 100
      payload.page = 1
      this.props.activityMessage && this.props.activityMessage(payload)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      mApp.block('#ActivityFeedMessage', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.notificationReceived) {
        let payload = {}
        payload.page_size = 100
        payload.page = 1
        this.props.activityMessage && this.props.activityMessage(payload)
      }
      if (nextProps.activityMessages && nextProps.activityMessages !== this.props.activityMessages) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#ActivityFeedMessage')
        if (nextProps.activityMessages.error_code !== null) {
          // eslint-disable-next-line
          toastr.error(nextProps.activityMessages.error_message, nextProps.activityMessages.error_code)
        }
      }
    }
  })
)(ApplicationActivity)

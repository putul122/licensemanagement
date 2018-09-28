import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import HandleAzure from '../../components/handleAzure/handleAzureComponent.js'
import { processAdalCallback } from '../../config/adal'
import { actions as sagaActions } from '../../redux/sagas/'
// Global State
export function mapStateToProps (state, props) {
  return {
    client_id: state.basicReducer.client_id,
    client_secret: state.basicReducer.client_secret,
    loggedInresponse: state.loginReducer.loggedInresponse
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
    autoLoginUser: sagaActions.loginActions.autoLoginUser
}

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
      // authContext.logOut()
      processAdalCallback()
    },
    componentDidMount: function () {
        let payload = {
        'client_id': this.props.client_id,
        'client_secret': this.props.client_secret
        }
        this.props.autoLoginUser(payload)
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.loggedInresponse) {
            if (!nextProps.loggedInresponse.error_code) {
              localStorage.setItem('userAccessToken', nextProps.loggedInresponse.resources[0]['access_token'])
              // eslint-disable-next-line
              toastr.success('You are logged in', 'Success !')
              window.location.href = window.location.origin + '/dashboard'
              // this.props.history.push('/dashboard')
            } else {
              // error in login
              // eslint-disable-next-line
              toastr.error(nextProps.loggedInresponse.error_message, nextProps.loggedInresponse.error_code)
              window.location.href = window.location.origin
              // this.props.history.push('/')
            }
        }
    }
  })
)(HandleAzure)

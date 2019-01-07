import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ComponentModalView from '../../components/componentModalView/componentModalViewComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/componentModalViewReducer/componentModalViewReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    componentTypeComponentData: state.componentModalViewReducer.componentTypeComponentData,
    componentTypeComponentProperties: state.componentModalViewReducer.componentTypeComponentProperties,
    componentTypeComponentRelationships: state.componentModalViewReducer.componentTypeComponentRelationships,
    isModalOpen: state.componentModalViewReducer.isModalOpen,
    showTabs: state.componentModalViewReducer.showTabs
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
    fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
    setCurrentTab: actionCreators.setCurrentTab,
    setModalSettings: actionCreators.setModalSettings,
    fetchcomponentTypeComponentProperties: sagaActions.componentModalViewActions.fetchcomponentTypeComponentProperties,
    fetchcomponentTypeComponentRelationships: sagaActions.componentModalViewActions.fetchcomponentTypeComponentRelationships
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
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
    },
    componentDidMount: function () {
        console.log('component did mount')
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
            this.props.history.push('/')
        }
      }
      if (nextProps.discussionMessages && nextProps.discussionMessages !== '' && nextProps.discussionMessages !== this.props.discussionMessages) {
        if (nextProps.discussionMessages.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.discussionMessages.error_message, nextProps.discussionMessages.error_source)
        }
      }
    }
  })
)(ComponentModalView)

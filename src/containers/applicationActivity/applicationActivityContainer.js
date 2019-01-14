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
    componentId: state.applicationActivityReducer.componentId
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
    activityMessage: sagaActions.applicationActivityActions.activityMessage,
    setComponentId: actionCreators.setComponentId,
    setModalSettings: componentModalViewActionCreators.setModalSettings,
    setQuickslideFlag: basicActionCreators.setQuickslideFlag
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
      console.log('Activity feed will mount', this.props)
      let payload = {}
      payload.page_size = 100
      payload.page = 1
      this.props.activityMessage && this.props.activityMessage(payload)
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.notificationReceived) {
        let payload = {}
        payload.page_size = 100
        payload.page = 1
        this.props.activityMessage && this.props.activityMessage(payload)
      }
    }
  })
)(ApplicationActivity)

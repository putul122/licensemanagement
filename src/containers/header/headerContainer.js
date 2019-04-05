import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Header from '../../components/headerComponent/headerComponent.js'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    isQuickSlideOpen: state.basicReducer.isQuickSlideOpen,
    notificationFlag: state.basicReducer.notificationFlag,
    isLoginSlideOpen: state.basicReducer.isLoginSlideOpen,
    updateNotificationViewStatusResponse: state.basicReducer.updateNotificationViewStatusResponse
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  setQuickslideFlag: actionCreators.setQuickslideFlag,
  setNotificationFlag: actionCreators.setNotificationFlag,
  setLoginslideFlag: actionCreators.setLoginslideFlag,
  resetNotificationResponse: actionCreators.resetNotificationResponse,
  updateNotificationViewStatus: sagaActions.basicActions.updateNotificationViewStatus
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
    componentDidMount: function () {},
    componentWillReceiveProps (nextProps) {
      if (nextProps.isQuickSlideOpen && nextProps.isQuickSlideOpen !== this.props.isQuickSlideOpen) {
        if (nextProps.isQuickSlideOpen) {
          if (this.props.notificationFlag) {
            console.log('call me')
            console.log(this.props)
          }
        }
      }
      if (nextProps.updateNotificationViewStatusResponse && nextProps.updateNotificationViewStatusResponse !== '' && nextProps.updateNotificationViewStatusResponse !== this.props.updateNotificationViewStatusResponse) {
        if (nextProps.updateNotificationViewStatusResponse.result_code === 0) {
          console.log('call me')
          console.log(nextProps)
          // this.props.resetNotificationResponse()
          this.props.setNotificationFlag && this.props.setNotificationFlag(false)
        }
      }
    }
  })
)(Header)

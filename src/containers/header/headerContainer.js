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
    notificationIndicator: state.basicReducer.notificationIndicator,
    isLoginSlideOpen: state.basicReducer.isLoginSlideOpen,
    updateNotificationViewStatusResponse: state.basicReducer.updateNotificationViewStatusResponse,
    isSearchSlideOpen: state.basicReducer.isSearchSlideOpen
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  setQuickslideFlag: actionCreators.setQuickslideFlag,
  setNotificationFlag: actionCreators.setNotificationFlag,
  setNotificationIndicator: actionCreators.setNotificationIndicator,
  setLoginslideFlag: actionCreators.setLoginslideFlag,
  setSearchSlideFlag: actionCreators.setSearchSlideFlag,
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
    componentDidUpdate: function () {
      // eslint-disable-next-line
      var tooltips = $('.tooltip').not('.in')
      if (tooltips) {
        tooltips.remove()
      }
      // eslint-disable-next-line
      $('[data-toggle="m-tooltip"]').tooltip()
    },
    componentWillReceiveProps (nextProps) {
      if (nextProps.updateNotificationViewStatusResponse && nextProps.updateNotificationViewStatusResponse !== '' && nextProps.updateNotificationViewStatusResponse !== this.props.updateNotificationViewStatusResponse) {
        if (nextProps.updateNotificationViewStatusResponse.result_code === 0) {
          // this.props.resetNotificationResponse()
          this.props.setNotificationFlag && this.props.setNotificationFlag(false)
        }
      }
    }

  })
)(Header)

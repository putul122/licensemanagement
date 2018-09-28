import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import LandingPage from '../../components/landingPage/landingPageComponent'
import { actions as sagaActions } from '../../redux/sagas/'
// import { authContext } from '../../config/adal'
// Global State
export function mapStateToProps (state, props) {
  return {
    client_id: state.basicReducer.client_id,
    client_secret: state.basicReducer.client_secret,
    clientAccessToken: state.basicReducer.clientAccessToken
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchClientAccessToken: sagaActions.basicActions.fetchClientAccessToken
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
      // authContext.logOut()
      let payload = {
        'client_id': this.props.client_id,
        'client_secret': this.props.client_secret
      }
      this.props.fetchClientAccessToken && this.props.fetchClientAccessToken(payload)
    },
    componentDidMount: function () {
      console.log('component did mount landing', this.props)
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.clientAccessToken && nextProps.clientAccessToken !== this.props.clientAccessToken) {
        localStorage.setItem('clientAccessToken', nextProps.clientAccessToken.resources[0]['access_token'])
      }
    }
  })
)(LandingPage)

import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ApplicationView from '../../components/applicationviewComponent/applicationviewComponent.js'
// import { actions as sagaActions } from '../../redux/sagas/'
import '../../redux/reducers/applicationviewReducer/applicationviewReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    // appSummary: state.applicationviewReducer.appSummary
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  //  fetchApplicationSummary: sagaActions.ApplicationSummaryActions.fetchApplicationSummary
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
    componentDidMount: function () {
    // this.props.fetchApplicationSummary && this.props.fetchApplicationSummary()
    console.log('component did mount lifecycle application View model', this.props)
    }
  })
)(ApplicationView)

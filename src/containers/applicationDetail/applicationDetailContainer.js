import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ApplicationDetail from '../../components/applicationDetail/applicationDetailComponent.js'
import { actions as sagaActions } from '../../redux/sagas/'
import '../../redux/reducers/applicationsReducer/applicationsReducerReducer'
// import '../../redux/reducers/applicationviewReducer/applicationviewReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    applicationbyId: state.applicationDetailReducer.applicationbyId
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchApplicationById: sagaActions.applicationActions.fetchApplicationById
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
    console.log('component will mount', this.props)
    let payload = {
      'application_id': this.props.match.params.id
    }
    this.props.fetchApplicationById && this.props.fetchApplicationById(payload)
    }
  })
)(ApplicationDetail)

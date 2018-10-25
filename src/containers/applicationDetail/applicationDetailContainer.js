import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ApplicationDetail from '../../components/applicationDetail/applicationDetailComponent.js'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators as applicationDetailActionCreators } from '../../redux/reducers/applicationDetailReducer/applicationDetailReducerReducer'
import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    applicationbyId: state.applicationDetailReducer.applicationbyId,
    applicationProperties: state.applicationDetailReducer.applicationProperties,
    applicationRelationships: state.applicationDetailReducer.applicationRelationships,
    showTabs: state.applicationDetailReducer.showTabs

   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchApplicationById: sagaActions.applicationActions.fetchApplicationById,
  fetchApplicationProperties: sagaActions.applicationActions.fetchApplicationProperties,
  fetchApplicationRelationships: sagaActions.applicationActions.fetchApplicationRelationships,
  setCurrentTab: applicationDetailActionCreators.setCurrentTab,
  setDiscussionModalOpenStatus: newDiscussionActionCreators.setDiscussionModalOpenStatus
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
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      let payload = {
        'application_id': this.props.match.params.id
      }
      this.props.fetchApplicationById && this.props.fetchApplicationById(payload)
      this.props.fetchApplicationProperties && this.props.fetchApplicationProperties(payload)
      this.props.fetchApplicationRelationships && this.props.fetchApplicationRelationships(payload)
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
    }
  })
)(ApplicationDetail)

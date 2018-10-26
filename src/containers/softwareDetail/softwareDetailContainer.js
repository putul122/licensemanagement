import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import SoftwareView from '../../components/softwareDetail/softwareDetailComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'
import { actionCreators as softwareDetailActionCreators } from '../../redux/reducers/softwareDetailReducer/softwareDetailReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    softwarebyId: state.softwareDetailReducer.softwarebyId,
    softwareProperties: state.softwareDetailReducer.softwareProperties,
    softwareRelationships: state.softwareDetailReducer.softwareRelationships,
    showTabs: state.softwareDetailReducer.showTabs
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchSoftwareById: sagaActions.softwareActions.fetchSoftwareById,
  fetchSoftwareProperties: sagaActions.softwareActions.fetchSoftwareProperties,
  fetchSoftwareRelationships: sagaActions.softwareActions.fetchSoftwareRelationships,
  setDiscussionModalOpenStatus: newDiscussionActionCreators.setDiscussionModalOpenStatus,
  setCurrentTab: softwareDetailActionCreators.setCurrentTab
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
        'software_id': this.props.match.params.id
      }
      this.props.fetchSoftwareById && this.props.fetchSoftwareById(payload)
      this.props.fetchSoftwareProperties && this.props.fetchSoftwareProperties(payload)
      this.props.fetchSoftwareRelationships && this.props.fetchSoftwareRelationships(payload)
      }
    // componentDidMount: function () {
    // //   this.props.fetchBasic && this.props.fetchBasic()
    // }
  })
)(SoftwareView)

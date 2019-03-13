import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import SoftwareView from '../../components/softwareDetail/softwareDetailComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'
import { actionCreators as softwareDetailActionCreators } from '../../redux/reducers/softwareDetailReducer/softwareDetailReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    softwarebyId: state.softwareDetailReducer.softwarebyId,
    softwareProperties: state.softwareDetailReducer.softwareProperties,
    softwareRelationships: state.softwareDetailReducer.softwareRelationships,
    showTabs: state.softwareDetailReducer.showTabs
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
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
      console.log('component will mount', this.props)
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      let payload = {
        'software_id': this.props.match.params.id
      }
      this.props.fetchSoftwareById && this.props.fetchSoftwareById(payload)
      this.props.fetchSoftwareProperties && this.props.fetchSoftwareProperties(payload)
      this.props.fetchSoftwareRelationships && this.props.fetchSoftwareRelationships(payload)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      $('[data-toggle="m-tooltip"]').tooltip()
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.softwarebyId && nextProps.softwarebyId !== this.props.softwarebyId) {
        // eslint-disable-next-line
        // mApp && mApp.unblockPage()
        if (nextProps.softwarebyId.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.softwarebyId.error_message, nextProps.softwarebyId.error_code)
          this.props.history.push('/softwares')
        }
      }
      if (nextProps.softwareRelationships && nextProps.softwareRelationships !== this.props.softwareRelationships) {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.softwareRelationships.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.softwareRelationships.error_message, nextProps.softwareRelationships.error_code)
          this.props.history.push('/softwares')
        }
      }
    }
  })
)(SoftwareView)

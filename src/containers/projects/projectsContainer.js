import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ProjectsList from '../../components/projects/projectsComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/projectsReducer/projectsReducerReducer'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    projectsSummary: state.projectsReducer.projectsSummary,
    projects: state.projectsReducer.projects,
    currentPage: state.projectsReducer.currentPage,
    createProjectResponse: state.projectsReducer.createProjectResponse,
    modalIsOpen: state.basicReducer.modalIsOpen,
    perPage: state.projectsReducer.perPage
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchProjectsSummary: sagaActions.projectActions.fetchProjectsSummary,
  fetchProjects: sagaActions.projectActions.fetchProjects,
  setCurrentPage: actionCreators.setCurrentPage,
  setPerPage: actionCreators.setPerPage,
  createProject: sagaActions.projectActions.createProject,
  setModalOpenStatus: basicActionCreators.setModalOpenStatus,
  setDiscussionModalOpenStatus: newDiscussionActionCreators.setDiscussionModalOpenStatus
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
// eslint-disable-next-line
export default compose(
  connect(mapStateToProps, propsMapping),
  lifecycle({
    componentWillMount: function () {
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
    //   // eslint-disable-next-line
    //   // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      let payload = {
        'search': '',
        'page_size': this.props.perPage,
        'page': 1
      }
      this.props.fetchProjects && this.props.fetchProjects(payload)
      this.props.fetchProjectsSummary && this.props.fetchProjectsSummary()
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      mApp && mApp.block('#entitlementSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.projects && nextProps.projects !== this.props.projects) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#entitlementList')
      }
      if (nextProps.projectsSummary && nextProps.projectsSummary !== this.props.entitlementsSummary) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#entitlementSummary')
      }
      if (nextProps.createProjectResponse && nextProps.createProjectResponse !== '') {
        if (nextProps.createProjectResponse.error_code === null) {
          let newProjectId = nextProps.createProjectResponse.resources[0].id
          // eslint-disable-next-line
          toastr.success('We\'ve added the ' +  nextProps.createProjectResponse.resources[0].name  +  ' to your model' , 'Nice!')
          this.props.history.push('/projects/' + newProjectId)
          // eslint-disable-next-line
          location.reload()
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.createProjectResponse.error_message, nextProps.createProjectResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.perPage && nextProps.perPage !== this.props.perPage) {
        this.props.setCurrentPage(1)
        // eslint-disable-next-line
        mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        let payload = {
          'search': '',
          'page_size': nextProps.perPage,
          'page': 1
        }
        this.props.fetchProjects && this.props.fetchProjects(payload)
      }
    }
  })
)(ProjectsList)

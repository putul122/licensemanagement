import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ProjectDetail from '../../components/projectDetail/projectDetailComponent'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
import { actionCreators as projectsActionCreators } from '../../redux/reducers/projectDetailReducer/projectDetailReducerReducer'
import { actions as sagaActions } from '../../redux/sagas/'
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    modalIsOpen: state.basicReducer.modalIsOpen,
    modalDeleteProjectIsOpen: state.projectDetailReducer.modalDeleteProjectIsOpen,
    entitlementActionSettings: state.projectDetailReducer.entitlementActionSettings,
    projectData: state.projectDetailReducer.projectData,
    projectEntitlements: state.projectDetailReducer.projectEntitlements,
    projectProperties: state.projectDetailReducer.projectProperties,
    isEditComponent: state.projectDetailReducer.isEditComponent,
    projectPropertiesPayload: state.projectDetailReducer.projectPropertiesPayload,
    copiedProjectProperties: state.projectDetailReducer.copiedProjectProperties,
    copiedProjectData: state.projectDetailReducer.copiedProjectData,
    updateProjectResponse: state.projectDetailReducer.updateProjectResponse
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  setModalOpenStatus: basicActionCreators.setModalOpenStatus,
  setDeleteProjectModalStatus: projectsActionCreators.setDeleteProjectModalStatus,
  setEntitlementActionSettings: projectsActionCreators.setEntitlementActionSettings,
  fetchProjectById: sagaActions.projectActions.fetchProjectById,
  fetchProjectEntitlements: sagaActions.projectActions.fetchProjectEntitlements,
  fetchProjectProperties: sagaActions.projectActions.fetchProjectProperties,
  updateProject: sagaActions.projectActions.updateProject,
  updateProjectProperties: sagaActions.projectActions.updateProjectProperties,
  setEditComponentFlag: projectsActionCreators.setEditComponentFlag,
  pushComponentPropertyPayload: projectsActionCreators.pushComponentPropertyPayload,
  editComponentProperties: projectsActionCreators.editComponentProperties,
  copyProjectProperties: projectsActionCreators.copyProjectProperties,
  copyProjectData: projectsActionCreators.copyProjectData,
  restoreProjectProperties: projectsActionCreators.restoreProjectProperties,
  resetResponse: projectsActionCreators.resetResponse
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
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      let projectId = this.props.match.params.id
      let payload = {'project_id': projectId}
      this.props.fetchProjectById && this.props.fetchProjectById(payload)
      this.props.fetchProjectEntitlements && this.props.fetchProjectEntitlements(payload)
      this.props.fetchProjectProperties && this.props.fetchProjectProperties(projectId)
      // eslint-disable-next-line
      // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentDidMount: function () {},
    componentWillReceiveProps: function (nextProps) {
      let payload = {
        'project_id': this.props.match.params.id
      }
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.projectData && nextProps.projectData !== this.props.projectData) {
        if (nextProps.projectData.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.projectData.error_message, nextProps.projectData.error_code)
          this.props.history.push('/projects')
        }
      }
      if (nextProps.updateProjectResponse && nextProps.updateProjectResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.updateProjectResponse.error_code === null) {
          this.props.fetchProjectById && this.props.fetchProjectById(payload)
          // eslint-disable-next-line
          toastr.success('The ' + this.props.projectData.resources[0].name + ' was successfully updated', 'Good Stuff!')
        } else {
          let payload = {}
          payload.property = JSON.parse(JSON.stringify(this.props.copiedProjectProperties))
          payload.project = JSON.parse(JSON.stringify(this.props.copiedProjectData))
          this.props.restoreProjectProperties(payload)
          // eslint-disable-next-line
          toastr.error(nextProps.updateProjectResponse.error_message, nextProps.updateProjectResponse.error_code)
        }
        this.props.resetResponse()
      }
    //   if (nextProps.perPage && nextProps.perPage !== this.props.perPage) {
    //     this.props.setCurrentPage(1)
    //     // eslint-disable-next-line
    //     mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    //     let payload = {
    //       'search': '',
    //       'page_size': nextProps.perPage,
    //       'page': 1
    //     }
    //     this.props.fetchEntitlements && this.props.fetchEntitlements(payload)
    //   }
    }
  })
)(ProjectDetail)

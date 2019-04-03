import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Tasks from '../../components/tasks/tasksComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/tasksReducer/tasksReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    tasks: state.tasksReducer.tasks,
    currentPage: state.tasksReducer.currentPage,
    perPage: state.tasksReducer.perPage,
    taskProperties: state.tasksReducer.taskProperties,
    actionSettings: state.tasksReducer.actionSettings,
    updateTaskResponse: state.tasksReducer.updateTaskResponse
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchTasks: sagaActions.taskActions.fetchTasks,
  fetchTaskProperties: sagaActions.taskActions.fetchTaskProperties,
  updateTask: sagaActions.taskActions.updateTask,
  setCurrentPage: actionCreators.setCurrentPage,
  setPerPage: actionCreators.setPerPage,
  resetResponse: actionCreators.resetResponse,
  setActionSettings: actionCreators.setActionSettings
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
      let payload = {
        'search': '',
        'page_size': this.props.perPage,
        'page': 1
      }
      this.props.fetchTasks && this.props.fetchTasks(payload)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
     mApp && mApp.block('#tasksList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      console.log('nextProps', nextProps)
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.taskProperties && nextProps.taskProperties !== '') {
        if (nextProps.taskProperties.error_code === null) {
          // eslint-disable-next-line
          mApp && mApp.unblockPage()
          let actionSettings = {...nextProps.actionSettings}
          actionSettings.taskProperties = nextProps.taskProperties.resources
          nextProps.setActionSettings(actionSettings)
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.taskProperties.error_message, nextProps.taskProperties.error_code)
        }
        nextProps.resetResponse()
      }
      if (nextProps.tasks && nextProps.tasks !== this.props.tasks) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#tasksList')
        // mApp && mApp.unblockPage()
      }
      if (nextProps.updateTaskResponse && nextProps.updateTaskResponse !== '') {
        if (nextProps.updateTaskResponse.error_code === null) {
          // eslint-disable-next-line
          mApp && mApp.unblockPage()
          let actionSettings = {...nextProps.actionSettings}
          actionSettings.isNotificationModalOpen = false
          actionSettings.selectedTask = null
          actionSettings.taskProperties = null
          nextProps.setActionSettings(actionSettings)
          // eslint-disable-next-line
          toastr.success('Task submitted successfully.')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.updateTaskResponse.error_message, nextProps.updateTaskResponse.error_code)
        }
        nextProps.resetResponse()
      }
      if (nextProps.perPage && nextProps.perPage !== this.props.perPage) {
        // eslint-disable-next-line
        mApp.block('#tasksList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        let payload = {
          'search': '',
          'page_size': nextProps.perPage,
          'page': 1
        }
        this.props.fetchTasks && this.props.fetchTasks(payload)
      }
    }
  })
)(Tasks)

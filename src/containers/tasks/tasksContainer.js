import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Tasks from '../../components/tasks/tasksComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/tasksReducer/tasksReducerReducer'
// import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    tasks: state.tasksReducer.tasks,
    currentPage: state.tasksReducer.currentPage,
    perPage: state.tasksReducer.perPage
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchTasks: sagaActions.taskActions.fetchTasks,
  setCurrentPage: actionCreators.setCurrentPage,
  setPerPage: actionCreators.setPerPage
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
      // eslint-disable-next-line
      // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // this.props.fetchTemplates && this.props.fetchTemplates()
      // let breadcrumb = {
      //   title: 'Tasks',
      //   items: [
      //     {
      //       name: 'Home',
      //       href: '/home',
      //       separator: false
      //     },
      //     {
      //       separator: true
      //     },
      //     {
      //       name: 'Tasks',
      //       href: '/tasks',
      //       separator: false
      //     }
      //   ]
      // }
      // this.props.setBreadcrumb && this.props.setBreadcrumb(breadcrumb)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
     mApp && mApp.block('#tasksList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      // if (nextProps.addAgreementResponse && nextProps.addAgreementResponse !== '') {
      //   if (nextProps.addAgreementResponse.error_code === null) {
      //     let newAgreementId = nextProps.addAgreementResponse.resources[0].id
      //     // eslint-disable-next-line
      //     mApp && mApp.unblockPage()
      //     // eslint-disable-next-line
      //     toastr.success('We\'ve added the ' +  nextProps.addAgreementResponse.resources[0].name  +  ' to your model' , 'Nice!')
      //     this.props.history.push('/agreements/' + newAgreementId)
      //     // location.reload()
      //   } else {
      //     // eslint-disable-next-line
      //     toastr.error(nextProps.addAgreementResponse.error_message, nextProps.addAgreementResponse.error_code)
      //   }
      //   this.props.resetResponse()
      // }
      if (nextProps.tasks && nextProps.tasks !== this.props.tasks) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#tasksList')
        // mApp && mApp.unblockPage()
      }
      // if (nextProps.perPage && nextProps.perPage !== this.props.perPage) {
      //   // eslint-disable-next-line
      //   mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      //   let payload = {
      //     'search': '',
      //     'page_size': nextProps.perPage,
      //     'page': 1
      //   }
      //   this.props.fetchAgreements && this.props.fetchAgreements(payload)
      // }
    }
  })
)(Tasks)

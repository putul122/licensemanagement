import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ApplicationList from '../../components/applications/applicationsComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/applicationsReducer/applicationsReducerReducer'
import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    applicationSummary: state.applicationsReducer.applicationSummary,
    application: state.applicationsReducer.application,
    applicationSoftwares: state.applicationsReducer.applicationSoftwares,
    currentPage: state.applicationsReducer.currentPage,
    expandSettings: state.applicationsReducer.expandSettings,
    businessUnits: state.applicationsReducer.businessUnits,
    businessUnitId: state.applicationsReducer.businessUnitId,
    defaultSelect: state.applicationsReducer.defaultSelect,
    perPage: state.applicationsReducer.perPage
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchApplicationsSummary: sagaActions.applicationActions.fetchApplicationsSummary,
  fetchApplications: sagaActions.applicationActions.fetchApplications,
  fetchApplicationSoftwares: sagaActions.applicationActions.fetchApplicationSoftwares,
  setCurrentPage: actionCreators.setCurrentPage,
  setPerPage: actionCreators.setPerPage,
  setbusinessUnitId: actionCreators.setbusinessUnitId,
  setExpandSettings: actionCreators.setExpandSettings,
  resetResponse: actionCreators.resetResponse,
  fetchBusinessUnits: sagaActions.basicActions.fetchBusinessUnits,
  setDefaultSelect: actionCreators.setDefaultSelect,
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
        // 'business_unit_id': 254460,
        'search': '',
        'page_size': this.props.perPage,
        'page': 1
      }
      this.props.fetchApplications && this.props.fetchApplications(payload)
      this.props.fetchApplicationsSummary && this.props.fetchApplicationsSummary()
      this.props.fetchBusinessUnits && this.props.fetchBusinessUnits()
    },
    componentDidMount: function () {
     // eslint-disable-next-line
     mApp && mApp.block('#applicationSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
     // eslint-disable-next-line
     mApp && mApp.block('#applicationList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      console.log('****', nextProps)
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.application && nextProps.application !== this.props.application) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#applicationList')
      }
      if (nextProps.applicationSummary && nextProps.applicationSummary !== this.props.applicationSummary) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#applicationSummary')
      }
      if (nextProps.applicationSoftwares && nextProps.applicationSoftwares !== this.props.applicationSummary) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#applicationList')
      }
      if (nextProps.perPage && nextProps.perPage !== this.props.perPage) {
        // eslint-disable-next-line
        mApp.block('#applicationList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        let payload = {
          'search': '',
          'page_size': nextProps.perPage,
          'page': 1
        }
        this.props.fetchApplications && this.props.fetchApplications(payload)
      }
      // if (nextProps.businessUnits && nextProps.businessUnits !== this.props.businessUnits) {
      //   // eslint-disable-next-line
      //   mApp.block('#applicationList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      //   let payload = {
      //     'business_unit_id': nextProps.businessUnits.resources[0].id,
      //     'search': '',
      //     'page_size': 10,
      //     'page': 1
      //   }
      //   this.props.fetchApplications && this.props.fetchApplications(payload)
      // }
    }
  })
)(ApplicationList)

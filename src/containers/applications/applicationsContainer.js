import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ApplicationList from '../../components/applications/applicationsComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/applicationsReducer/applicationsReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    applicationSummary: state.applicationsReducer.applicationSummary,
    application: state.applicationsReducer.application,
    currentPage: state.applicationsReducer.currentPage
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchApplicationsSummary: sagaActions.applicationActions.fetchApplicationsSummary,
  fetchApplications: sagaActions.applicationActions.fetchApplications,
  setCurrentPage: actionCreators.setCurrentPage
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
      console.log('my props', this.props)
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      let payload = {
        'search': '',
        'page_size': 10,
        'page': 1
      }
      this.props.fetchApplications && this.props.fetchApplications(payload)
      this.props.fetchApplicationsSummary && this.props.fetchApplicationsSummary()
    },
    componentDidMount: function () {
      // // eslint-disable-next-line
      // mApp && mApp.unblockPage()
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.application && nextProps.application !== this.props.application) {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
      }
    }
  })
)(ApplicationList)

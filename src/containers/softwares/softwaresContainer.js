import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import SoftwareList from '../../components/softwares/softwareComponent.js'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/softwaresReducer/softwaresReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    software: state.softwaresReducer.software,
    softwareSummary: state.softwaresReducer.softwareSummary,
    softwareAgreements: state.softwaresReducer.softwareAgreements,
    currentPage: state.softwaresReducer.currentPage,
    expandSettings: state.softwaresReducer.expandSettings
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchSoftwaresSummary: sagaActions.softwareActions.fetchSoftwaresSummary,
  fetchSoftwares: sagaActions.softwareActions.fetchSoftwares,
  fetchSoftwareAgreement: sagaActions.softwareActions.fetchSoftwareAgreement,
  setCurrentPage: actionCreators.setCurrentPage,
  setExpandSettings: actionCreators.setExpandSettings,
  resetResponse: actionCreators.resetResponse
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
        'search': '',
        'page_size': 10,
        'page': 1
      }
      this.props.fetchSoftwares && this.props.fetchSoftwares(payload)
      this.props.fetchSoftwaresSummary && this.props.fetchSoftwaresSummary()
    },
    componentDidMount: function () {
       // eslint-disable-next-line
       mApp && mApp.block('#softwareSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
       // eslint-disable-next-line
       mApp && mApp.block('#softwareList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.software && nextProps.software !== this.props.software) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#softwareList')
      }
      if (nextProps.softwareSummary && nextProps.softwareSummary !== this.props.softwareSummary) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#softwareSummary')
      }
      if (nextProps.softwareAgreements && nextProps.softwareAgreements !== this.props.softwareSummary) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#softwareList')
      }
    }
  })
)(SoftwareList)

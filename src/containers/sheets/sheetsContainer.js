import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Sheets from '../../components/sheets/sheetsComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/sheetsReducer/sheetsReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    perspectives: state.sheetsReducer.perspectives,
    metaModelPerspective: state.sheetsReducer.metaModelPerspective,
    modelPrespectives: state.sheetsReducer.modelPrespectives,
    modalSettings: state.sheetsReducer.modalSettings,
    updateMetaModelPerspectiveResponse: state.sheetsReducer.updateMetaModelPerspectiveResponse,
    currentPage: state.sheetsReducer.currentPage,
    perPage: state.sheetsReducer.perPage
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchMetaModelPrespective: sagaActions.modelActions.fetchMetaModelPrespective,
  fetchModelPrespectives: sagaActions.modelActions.fetchModelPrespectives,
  updateModelPrespectives: sagaActions.modelActions.updateModelPrespectives,
  setCurrentPage: actionCreators.setCurrentPage,
  setPerPage: actionCreators.setPerPage,
  setModalSetting: actionCreators.setModalSetting,
  resetResponse: actionCreators.resetResponse,
  setPerspectivesData: actionCreators.setPerspectivesData
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
      console.log('my props', this.props)
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      let appPackage = JSON.parse(localStorage.getItem('packages'))
      let perspectives = appPackage.resources[0].perspectives
      perspectives = perspectives.map(function (data, index) {
        data.label = data.key
        return data
      })
      console.log('perspectives', perspectives)
      this.props.setPerspectivesData(perspectives)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      // mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
     },
     componentWillReceiveProps: function (nextProps) {
      console.log('component will receive props', nextProps)
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.modelPrespectives && nextProps.modelPrespectives !== this.props.modelPrespectives) {
        console.log('why disable', nextProps)
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
      }
      if (nextProps.perPage && nextProps.perPage !== this.props.perPage) {
        console.log(nextProps.perPage, this.props.perPage)
        this.props.setCurrentPage(1)
      }
      if (nextProps.updateMetaModelPerspectiveResponse && nextProps.updateMetaModelPerspectiveResponse !== '') {
        this.props.resetResponse()
        let modalSettings = {...this.props.modalSettings, 'updateResponse': nextProps.updateMetaModelPerspectiveResponse}
        this.props.setModalSetting(modalSettings)
      }
    }
  })
)(Sheets)

import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ComponentModalView from '../../components/componentModalView/componentModalViewComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/componentModalViewReducer/componentModalViewReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    componentTypeComponentData: state.componentModalViewReducer.componentTypeComponentData,
    componentTypeComponentProperties: state.componentModalViewReducer.componentTypeComponentProperties,
    componentTypeComponentRelationships: state.componentModalViewReducer.componentTypeComponentRelationships,
    modalSettings: state.componentModalViewReducer.modalSettings,
    showTabs: state.componentModalViewReducer.showTabs
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
    fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
    setCurrentTab: actionCreators.setCurrentTab,
    setModalSettings: actionCreators.setModalSettings,
    resetResponse: actionCreators.resetResponse,
    fetchcomponentTypeComponentProperties: sagaActions.componentModalViewActions.fetchcomponentTypeComponentProperties,
    fetchcomponentTypeComponentRelationships: sagaActions.componentModalViewActions.fetchcomponentTypeComponentRelationships,
    fetchComponentTypeComponent: sagaActions.componentModalViewActions.fetchComponentTypeComponent
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
      console.log('this will components', this.props)
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
    },
    componentDidMount: function () {
        console.log('component did mount')
    },
    componentWillReceiveProps: function (nextProps) {
      console.log('this will receicve props components', nextProps)
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
            this.props.history.push('/')
        }
      }
      if (nextProps.componentTypeComponentProperties && nextProps.componentTypeComponentProperties !== '' && nextProps.componentTypeComponentProperties !== this.props.componentTypeComponentProperties) {
        if (nextProps.componentTypeComponentProperties.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.componentTypeComponentProperties.error_message, nextProps.componentTypeComponentProperties.error_source)
          let modalSettings = JSON.parse(JSON.stringify(this.props.modalSettings))
          modalSettings.isModalOpen = false
          nextProps.setModalSettings(modalSettings)
        }
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
      }
      if (nextProps.componentTypeComponentRelationships && nextProps.componentTypeComponentRelationships !== '' && nextProps.componentTypeComponentRelationships !== this.props.componentTypeComponentRelationships) {
        if (nextProps.componentTypeComponentRelationships.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.componentTypeComponentRelationships.error_message, nextProps.componentTypeComponentRelationships.error_source)
          let modalSettings = JSON.parse(JSON.stringify(this.props.modalSettings))
          modalSettings.isModalOpen = false
          nextProps.setModalSettings(modalSettings)
        }
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
      }
      if (nextProps.componentTypeComponentData && nextProps.componentTypeComponentData !== '' && nextProps.componentTypeComponentData !== this.props.componentTypeComponentData) {
        if (nextProps.componentTypeComponentData.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.componentTypeComponentData.error_message, nextProps.componentTypeComponentData.error_source)
          let modalSettings = JSON.parse(JSON.stringify(this.props.modalSettings))
          modalSettings.isModalOpen = false
          nextProps.setModalSettings(modalSettings)
        }
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
      }
      if (nextProps.componentId && nextProps.modalSettings.callAPI) {
        console.log('call api')
        // eslint-disable-next-line
        mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        this.props.fetchcomponentTypeComponentProperties && this.props.fetchcomponentTypeComponentProperties(nextProps.componentId)
        this.props.fetchcomponentTypeComponentRelationships && this.props.fetchcomponentTypeComponentRelationships(nextProps.componentId)
        this.props.fetchComponentTypeComponent && this.props.fetchComponentTypeComponent(nextProps.componentId)
        let modalSettings = JSON.parse(JSON.stringify(nextProps.modalSettings))
        modalSettings.callAPI = false
        console.log('modla se4tting', modalSettings)
        nextProps.setModalSettings(modalSettings)
      } else {
        console.log('not call api')
      }
    }
  })
)(ComponentModalView)

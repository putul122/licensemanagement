import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import AgreementDetail from '../../components/agreementDetail/agreementDetailComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/agreementDetailReducer/agreementDetailReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  console.log('state', state)
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    agreement: state.agreementDetailReducer.agreement,
    agreementProperties: state.agreementDetailReducer.agreementProperties,
    agreementRelationships: state.agreementDetailReducer.agreementRelationships,
    agreementEntitlements: state.agreementDetailReducer.agreementEntitlements,
    addAgreementSettings: state.agreementDetailReducer.addAgreementSettings,
    relationshipActionSettings: state.agreementDetailReducer.relationshipActionSettings,
    deleteAgreementResponse: state.agreementDetailReducer.deleteAgreementResponse,
    updateAgreementResponse: state.agreementDetailReducer.updateAgreementResponse,
    isEditComponent: state.agreementDetailReducer.isEditComponent,
    agreementPropertiesPayload: state.agreementDetailReducer.agreementPropertiesPayload,
    copiedAgreementProperties: state.agreementDetailReducer.copiedAgreementProperties,
    copiedAgreementData: state.agreementDetailReducer.copiedAgreementData,
    relationshipProperty: state.agreementDetailReducer.relationshipProperty,
    relationshipPropertyPayload: state.agreementDetailReducer.relationshipPropertyPayload,
    addNewConnectionSettings: state.agreementDetailReducer.addNewConnectionSettings,
    componentTypeComponentConstraints: state.agreementDetailReducer.componentTypeComponentConstraints,
    componentTypeComponents: state.agreementDetailReducer.componentTypeComponents,
    updateRelationshipResponse: state.agreementDetailReducer.updateRelationshipResponse,
    updateRelationshipPropertyResponse: state.agreementDetailReducer.updateRelationshipPropertyResponse,
    deleteRelationshipResponse: state.agreementDetailReducer.deleteRelationshipResponse
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchAgreementById: sagaActions.agreementActions.fetchAgreementById,
  fetchAgreementEntitlements: sagaActions.agreementActions.fetchAgreementEntitlements,
  fetchAgreementProperties: sagaActions.agreementActions.fetchAgreementProperties,
  fetchAgreementRelationships: sagaActions.agreementActions.fetchAgreementRelationships,
  deleteAgreement: sagaActions.agreementActions.deleteAgreement,
  updateAgreementProperties: sagaActions.agreementActions.updateAgreementProperties,
  fetchRelationshipProperty: sagaActions.agreementActions.fetchRelationshipProperty,
  updateRelationshipProperty: sagaActions.agreementActions.updateRelationshipProperty,
  deleteComponentRelationship: sagaActions.agreementActions.deleteComponentRelationship,
  fetchComponentConstraints: sagaActions.agreementActions.fetchComponentConstraints,
  fetchComponentTypeComponents: sagaActions.agreementActions.fetchComponentTypeComponents,
  updateComponentTypeComponentRelationships: sagaActions.agreementActions.updateComponentTypeComponentRelationships,
  setAddAgreementSettings: actionCreators.setAddAgreementSettings,
  setRelationshipActionSettings: actionCreators.setRelationshipActionSettings,
  resetResponse: actionCreators.resetResponse,
  setEditComponentFlag: actionCreators.setEditComponentFlag,
  pushComponentPropertyPayload: actionCreators.pushComponentPropertyPayload,
  editComponentProperties: actionCreators.editComponentProperties,
  copyAgreementProperties: actionCreators.copyAgreementProperties,
  copyAgreementData: actionCreators.copyAgreementData,
  restoreAgreementProperties: actionCreators.restoreAgreementProperties,
  editComponentRelationshipProperties: actionCreators.editComponentRelationshipProperties,
  resetComponentRelationshipProperties: actionCreators.resetComponentRelationshipProperties,
  editComponentRelationshipPropertyPayload: actionCreators.editComponentRelationshipPropertyPayload,
  setAddConnectionSettings: actionCreators.setAddConnectionSettings,
  resetUpdateRelationshipResponse: actionCreators.resetUpdateRelationshipResponse
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
        'agreement_id': this.props.match.params.id
      }
      this.props.fetchAgreementById && this.props.fetchAgreementById(payload)
      this.props.fetchAgreementEntitlements && this.props.fetchAgreementEntitlements(payload)
      this.props.fetchAgreementProperties && this.props.fetchAgreementProperties(payload)
      this.props.fetchAgreementRelationships && this.props.fetchAgreementRelationships(payload)
      this.props.fetchComponentConstraints && this.props.fetchComponentConstraints(payload)
      // this.props.fetchComponentTypeComponents && this.props.fetchComponentTypeComponents(payload)
    },
    componentDidMount: function () {
      console.log('component did mount')
      // eslint-disable-next-line
      // mApp && mApp.block('#supplier', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.deleteAgreementResponse && nextProps.deleteAgreementResponse !== '') {
        if (nextProps.deleteAgreementResponse.error_code === null) {
          // eslint-disable-next-line
          toastr.success('The Agreement ' +  nextProps.deleteAgreementResponse.resources[0].name  +  ' was successfully deleted', 'Zapped!')
          this.props.history.push('/agreements')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.deleteAgreementResponse.error_message, nextProps.deleteAgreementResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.updateAgreementResponse && nextProps.updateAgreementResponse !== '') {
        if (nextProps.updateAgreementResponse.error_code === null) {
          // eslint-disable-next-line
          toastr.success('The ' + this.props.agreement.resources[0].name + ' was successfully updated', 'Good Stuff!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.updateAgreementResponse.error_message, nextProps.updateAgreementResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.relationshipActionSettings && nextProps.relationshipActionSettings !== this.props.relationshipActionSettings) {
        if (nextProps.relationshipActionSettings.isModalOpen) {
          if (nextProps.relationshipActionSettings.actionType === 'edit') {
            // eslint-disable-next-line
            mApp && mApp.block('#relationshipPropertyContent .modal-content', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
            let payload = {}
            payload.componentId = this.props.match.params.id
            payload.relationshipType = nextProps.relationshipActionSettings.selectedObject.relationship_type
            payload.relationshipId = nextProps.relationshipActionSettings.relationshipId
            this.props.fetchRelationshipProperty(payload)
          }
        }
      }
      if (nextProps.componentTypeComponents && nextProps.componentTypeComponents !== this.props.componentTypeComponents) {
        let settingPayload = {...this.props.addNewConnectionSettings, 'isWaitingForApiResponse': false}
        this.props.setAddConnectionSettings(settingPayload)
      }
      if (nextProps.updateRelationshipResponse !== '') {
        if (nextProps.updateRelationshipResponse.result_code !== 1) {
          let payload = {
            'agreement_id': this.props.match.params.id
          }
          this.props.fetchAgreementRelationships && this.props.fetchAgreementRelationships(payload)
          // eslint-disable-next-line
          toastr.success('We\'ve added the new relationships to the ' + this.props.agreement.resources[0].name + '', 'Connecting the dots!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.updateRelationshipResponse.error_message, nextProps.updateRelationshipResponse.error_code)
        }
        this.props.resetUpdateRelationshipResponse()
      }
      if (nextProps.updateRelationshipPropertyResponse !== '') {
        if (nextProps.updateRelationshipPropertyResponse.result_code !== 1) {
          // eslint-disable-next-line
          toastr.success('Successfully updated relationship ' + this.props.relationshipActionSettings.relationshipText + ': ' + this.props.relationshipActionSettings.componentName, 'Updated!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.updateRelationshipResponse.error_message, nextProps.updateRelationshipResponse.error_code)
        }
        this.props.resetUpdateRelationshipResponse()
        let settingPayload = {...this.props.relationshipActionSettings, 'isModalOpen': false}
        this.props.setRelationshipActionSettings(settingPayload)
      }
      if (nextProps.deleteRelationshipResponse !== '') {
        if (nextProps.deleteRelationshipResponse.result_code !== 1) {
          let payload = {
            'agreement_id': this.props.match.params.id
          }
          this.props.fetchAgreementRelationships && this.props.fetchAgreementRelationships(payload)
          // eslint-disable-next-line
          toastr.success('Successfully deleted relationship ' + this.props.relationshipActionSettings.relationshipText + ': ' + this.props.relationshipActionSettings.componentName + '', 'Disconnected')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.deleteRelationshipResponse.error_message, nextProps.deleteRelationshipResponse.error_code)
        }
        this.props.resetUpdateRelationshipResponse()
        let settingPayload = {...this.props.relationshipActionSettings, 'isModalOpen': false}
        this.props.setRelationshipActionSettings(settingPayload)
      }
    }
  })
)(AgreementDetail)

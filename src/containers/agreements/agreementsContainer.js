import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import _ from 'lodash'
import Agreements from '../../components/agreements/agreementsComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/agreementsReducer/agreementsReducerReducer'
import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    agreements: state.agreementsReducer.agreements,
    agreementsSummary: state.agreementsReducer.agreementsSummary,
    currentPage: state.agreementsReducer.currentPage,
    addAgreementSettings: state.agreementsReducer.addAgreementSettings,
    addAgreementResponse: state.agreementsReducer.addAgreementResponse,
    perPage: state.agreementsReducer.perPage,
    connectionData: state.agreementsReducer.connectionData,
    availableAction: state.agreementsReducer.availableAction,
    metaModelPerspective: state.agreementsReducer.metaModelPerspective,
    dropdownData: state.agreementsReducer.dropdownData
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchAgreements: sagaActions.agreementActions.fetchAgreements,
  fetchAgreementsSummary: sagaActions.agreementActions.fetchAgreementsSummary,
  fetchMetaModelPrespective: sagaActions.modelActions.fetchMetaModelPrespective,
  // fetchModelPrespectives: sagaActions.modelActions.fetchModelPrespectives,
  fetchDropdownData: sagaActions.basicActions.fetchDropdownData,
  addAgreement: sagaActions.agreementActions.addAgreement,
  setCurrentPage: actionCreators.setCurrentPage,
  setPerPage: actionCreators.setPerPage,
  setAddAgreementSettings: actionCreators.setAddAgreementSettings,
  setDiscussionModalOpenStatus: newDiscussionActionCreators.setDiscussionModalOpenStatus,
  setConnectionData: actionCreators.setConnectionData,
  setAvailableAction: actionCreators.setAvailableAction,
  resetResponse: actionCreators.resetResponse,
  updateModelPrespectives: sagaActions.modelActions.updateModelPrespectives
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
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      let payload = {
        'search': '',
        'page_size': this.props.perPage,
        'page': 1
      }
      this.props.fetchAgreements && this.props.fetchAgreements(payload)
      this.props.fetchAgreementsSummary && this.props.fetchAgreementsSummary()
      let appPackage = JSON.parse(localStorage.getItem('packages'))
      let perspectives = appPackage.resources[0].perspectives
      let perspectiveObj = _.find(perspectives, function (obj) {
        return (obj.key === 'Agreement_Create' && obj.role_key === 'Create')
      })
      let perspectiveId = perspectiveObj.perspective
      let metaPayload = {}
      metaPayload.id = perspectiveId
      metaPayload.data = {'view_key': perspectiveObj.view_key}
      this.props.fetchMetaModelPrespective && this.props.fetchMetaModelPrespective(metaPayload)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      $('[data-toggle="m-tooltip"]').tooltip()
      // eslint-disable-next-line
      mApp && mApp.block('#agreementSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.addAgreementResponse && nextProps.addAgreementResponse !== '') {
        let addAgreementSettings = {...nextProps.addAgreementSettings}
        addAgreementSettings.createResponse = nextProps.addAgreementResponse
        nextProps.setAddAgreementSettings(addAgreementSettings)
        let payload = {
          'search': '',
          'page_size': this.props.perPage,
          'page': 1
        }
        this.props.fetchAgreements && this.props.fetchAgreements(payload)
        nextProps.resetResponse()
        // if (nextProps.addAgreementResponse.error_code === null) {
        //   let newAgreementId = nextProps.addAgreementResponse.resources[0].id
        //   // eslint-disable-next-line
        //   mApp && mApp.unblockPage()
        //   // eslint-disable-next-line
        //   toastr.success('We\'ve added the ' +  nextProps.addAgreementResponse.resources[0].name  +  ' to your model' , 'Nice!')
        //   this.props.history.push('/agreements/' + newAgreementId)
        //   // location.reload()
        // } else {
        //   // eslint-disable-next-line
        //   toastr.error(nextProps.addAgreementResponse.error_message, nextProps.addAgreementResponse.error_code)
        // }
        // this.props.resetResponse()
      }
      if (nextProps.agreementsSummary && nextProps.agreementsSummary !== this.props.agreementsSummary) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#agreementSummary')
        // mApp && mApp.unblockPage()
      }
      if (nextProps.agreements && nextProps.agreements !== this.props.agreements) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#agreementList')
        // mApp && mApp.unblockPage()
      }
      if (nextProps.perPage && nextProps.perPage !== this.props.perPage) {
        this.props.setCurrentPage(1)
        // eslint-disable-next-line
        mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        let payload = {
          'search': '',
          'page_size': nextProps.perPage,
          'page': 1
        }
        this.props.fetchAgreements && this.props.fetchAgreements(payload)
      }
      if (nextProps.metaModelPerspective && nextProps.metaModelPerspective !== '' && nextProps.availableAction.toProcess) {
        if (nextProps.metaModelPerspective.resources[0].crude) {
          let availableAction = {...nextProps.availableAction}
          let crude = nextProps.crude
          let mask = nextProps.metaModelPerspective.resources[0].crude
          let labelParts = nextProps.metaModelPerspective.resources[0].parts
          let connectionData = {}
          connectionData.operation = {
            toCallApi: true,
            isComplete: false,
            processIndex: 0
          }
          connectionData.selectedValues = []
          let cData = []
          let customerProperty = []
          for (let option in crude) {
            if (crude.hasOwnProperty(option)) {
              if (mask & crude[option]) {
                availableAction[option] = true
              }
            }
          }
          labelParts.forEach(function (data, index) {
            if (data.standard_property === null && data.type_property === null) {
              let obj = {}
              obj.name = data.name
              if (data.constraint_inverted) {
                obj.componentId = data.constraint.component_type.id
              } else {
                obj.componentId = data.constraint.target_component_type.id
              }
              obj.data = null
              obj.processed = false
              obj.partIndex = index
              obj.max = data.constraint.max
              obj.min = data.constraint.min
              cData.push(obj)
              connectionData.selectedValues.push(null)
            }
            if (data.standard_property === null && data.type_property !== null) {
              data.partIndex = index
              customerProperty.push(data)
            }
          })
          connectionData.data = cData
          connectionData.customerProperty = customerProperty
          connectionData.selectOption = []
          nextProps.setConnectionData(connectionData)
          availableAction['toProcess'] = false
          nextProps.setAvailableAction(availableAction)
        }
      }
      if (nextProps.connectionData !== '' && nextProps.connectionData.operation.toCallApi && !nextProps.connectionData.operation.isComplete) {
        console.log('nextProps.connectionData', nextProps.connectionData)
        let connectionData = {...nextProps.connectionData}
        let processIndex = nextProps.connectionData.operation.processIndex
        let totalLength = nextProps.connectionData.data.length
        if (processIndex < totalLength) {
          let processData = nextProps.connectionData.data[processIndex]
          nextProps.fetchDropdownData && nextProps.fetchDropdownData(processData.componentId)
          connectionData.operation.processIndex = processIndex + 1
          connectionData.operation.toCallApi = false
        }
        if (processIndex === totalLength) {
          connectionData.operation.isComplete = true
        }
        nextProps.setConnectionData(connectionData)
      }
      if (nextProps.dropdownData !== '') {
        console.log('nextProps.dropdownData', nextProps.dropdownData)
        if (nextProps.dropdownData.error_code === null) {
          let connectionData = {...nextProps.connectionData}
          connectionData.selectOption.push(nextProps.dropdownData.resources)
          connectionData.operation.toCallApi = true
          nextProps.setConnectionData(connectionData)
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.dropdownData.error_message, nextProps.dropdownData.error_code)
        }
        this.props.resetResponse()
      }
    }
  })
)(Agreements)

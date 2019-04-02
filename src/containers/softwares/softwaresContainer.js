import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import SoftwareList from '../../components/softwares/softwareComponent.js'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/softwaresReducer/softwaresReducerReducer'
import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'
import _ from 'lodash'
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    software: state.softwaresReducer.software,
    softwareSummary: state.softwaresReducer.softwareSummary,
    softwareAgreements: state.softwaresReducer.softwareAgreements,
    currentPage: state.softwaresReducer.currentPage,
    expandSettings: state.softwaresReducer.expandSettings,
    perPage: state.softwaresReducer.perPage,
    connectionData: state.softwaresReducer.connectionData,
    availableAction: state.softwaresReducer.availableAction,
    metaModelPerspective: state.softwaresReducer.metaModelPerspective,
    dropdownData: state.softwaresReducer.dropdownData,
    addSettings: state.softwaresReducer.addSettings,
    addSoftwareResponse: state.softwaresReducer.addSoftwareResponse
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchSoftwaresSummary: sagaActions.softwareActions.fetchSoftwaresSummary,
  fetchSoftwares: sagaActions.softwareActions.fetchSoftwares,
  fetchSoftwareAgreement: sagaActions.softwareActions.fetchSoftwareAgreement,
  setCurrentPage: actionCreators.setCurrentPage,
  setPerPage: actionCreators.setPerPage,
  setExpandSettings: actionCreators.setExpandSettings,
  resetResponse: actionCreators.resetResponse,
  setDiscussionModalOpenStatus: newDiscussionActionCreators.setDiscussionModalOpenStatus,
  setConnectionData: actionCreators.setConnectionData,
  setAvailableAction: actionCreators.setAvailableAction,
  updateModelPrespectives: sagaActions.modelActions.updateModelPrespectives,
  setAddSettings: actionCreators.setAddSettings,
  fetchMetaModelPrespective: sagaActions.modelActions.fetchMetaModelPrespective,
  fetchDropdownData: sagaActions.basicActions.fetchDropdownData,
  addSoftware: sagaActions.softwareActions.addSoftware
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
      console.log('comp will mountct', this.props)
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      let payload = {
        'search': '',
        'page_size': this.props.perPage,
        'page': 1
      }
      this.props.fetchSoftwares && this.props.fetchSoftwares(payload)
      this.props.fetchSoftwaresSummary && this.props.fetchSoftwaresSummary()
      let appPackage = JSON.parse(localStorage.getItem('packages'))
      let perspectives = appPackage.resources[0].perspectives
      let perspectiveObj = _.find(perspectives, function (obj) {
        return (obj.key === 'Software_Create' && obj.role_key === 'Create')
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
      mApp && mApp.block('#softwareSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      mApp && mApp.block('#softwareList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentDidUpdate: function () {
      // eslint-disable-next-line
      $('[data-toggle="m-tooltip"]').tooltip()
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
      if (nextProps.perPage && nextProps.perPage !== this.props.perPage) {
        this.props.setCurrentPage(1)
        // eslint-disable-next-line
        mApp.block('#softwareList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        let payload = {
          'search': '',
          'page_size': nextProps.perPage,
          'page': 1
        }
        this.props.fetchSoftwares && this.props.fetchSoftwares(payload)
      }
      if (nextProps.addSoftwareResponse && nextProps.addSoftwareResponse !== '') {
        let addSettings = {...nextProps.addSettings}
        addSettings.createResponse = nextProps.addSoftwareResponse
        nextProps.setAddSettings(addSettings)
        let payload = {
          'search': '',
          'page_size': this.props.perPage,
          'page': 1
        }
        this.props.fetchSoftwares && this.props.fetchSoftwares(payload)
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
)(SoftwareList)

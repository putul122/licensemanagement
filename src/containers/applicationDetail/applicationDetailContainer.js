import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import moment from 'moment'
import ApplicationDetail from '../../components/applicationDetail/applicationDetailComponent.js'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators as applicationDetailActionCreators } from '../../redux/reducers/applicationDetailReducer/applicationDetailReducerReducer'
import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'
import _ from 'lodash'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    applicationbyId: state.applicationDetailReducer.applicationbyId,
    applicationProperties: state.applicationDetailReducer.applicationProperties,
    applicationRelationships: state.applicationDetailReducer.applicationRelationships,
    showTabs: state.applicationDetailReducer.showTabs,
    metaModelPrespective: state.applicationDetailReducer.metaModelPrespective,
    modelPrespective: state.applicationDetailReducer.modelPrespective,
    applicationRelationshipData: state.applicationDetailReducer.applicationRelationshipData,
    responseProcessed: state.applicationDetailReducer.responseProcessed,
    entitlements: state.applicationDetailReducer.entitlements,
    allEntitlements: state.applicationDetailReducer.allEntitlements,
    suppliers: state.applicationDetailReducer.suppliers,
    agreements: state.applicationDetailReducer.agreements,
    softwares: state.applicationDetailReducer.softwares,
    perPage: state.applicationDetailReducer.perPage,
    currentPage: state.applicationDetailReducer.currentPage,
    applicationEntitlements: state.applicationDetailReducer.applicationEntitlements,
    applicationSoftwares: state.applicationDetailReducer.applicationSoftwares,
    linkActionSettings: state.applicationDetailReducer.linkActionSettings,
    addLinkResponse: state.applicationDetailReducer.addLinkResponse,
    updateLinkResponse: state.applicationDetailReducer.updateLinkResponse,
    removeLinkResponse: state.applicationDetailReducer.removeLinkResponse
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchApplicationById: sagaActions.applicationActions.fetchApplicationById,
  // fetchApplicationProperties: sagaActions.applicationActions.fetchApplicationProperties,
  fetchApplicationRelationships: sagaActions.applicationActions.fetchApplicationRelationships,
  fetchMetaModelPrespective: sagaActions.modelActions.fetchMetaModelPrespective,
  fetchComponentModelPrespectives: sagaActions.modelActions.fetchComponentModelPrespectives,
  setCurrentTab: applicationDetailActionCreators.setCurrentTab,
  resetResponse: applicationDetailActionCreators.resetResponse,
  setApplicationProperty: applicationDetailActionCreators.setApplicationProperty,
  setDiscussionModalOpenStatus: newDiscussionActionCreators.setDiscussionModalOpenStatus,
  setApplicationRelationship: applicationDetailActionCreators.setApplicationRelationship,
  setResponseProcessed: applicationDetailActionCreators.setResponseProcessed,
  fetchEntitlementsBySupplierAgreement: sagaActions.entitlementActions.fetchEntitlementsBySupplierAgreement,
  fetchEntitlements: sagaActions.entitlementActions.fetchEntitlements,
  fetchSoftwares: sagaActions.softwareActions.fetchSoftwares,
  fetchAgreements: sagaActions.agreementActions.fetchAgreements,
  fetchSuppliers: sagaActions.supplierActions.fetchSuppliers,
  fetchApplicationEntitlements: sagaActions.applicationActions.fetchApplicationEntitlements,
  fetchApplicationSoftwares: sagaActions.applicationActions.fetchApplicationSoftwares,
  addLink: sagaActions.applicationActions.addLink,
  updateLink: sagaActions.applicationActions.updateLink,
  deleteLink: sagaActions.applicationActions.deleteLink,
  setCurrentPage: applicationDetailActionCreators.setCurrentPage,
  setLinkActionSettings: applicationDetailActionCreators.setLinkActionSettings
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
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      let payload = {
        'application_id': this.props.match.params.id
      }
      let appPackage = JSON.parse(localStorage.getItem('packages'))
      let perspectives = appPackage.resources[0].perspectives
      let metaModelPrespectiveId = _.result(_.find(perspectives, function (obj) {
        return obj.key === 'Application' && obj.view_key === null
    }), 'perspective')
      console.log('perspectives', perspectives, metaModelPrespectiveId)
      let modelPayload = {}
      modelPayload.componentId = this.props.match.params.id
      modelPayload.metaModelPerspectiveId = metaModelPrespectiveId
      let metaPayload = {}
      metaPayload.id = metaModelPrespectiveId
      this.props.fetchMetaModelPrespective && this.props.fetchMetaModelPrespective(metaPayload)
      this.props.fetchComponentModelPrespectives && this.props.fetchComponentModelPrespectives(modelPayload)
      this.props.fetchApplicationById && this.props.fetchApplicationById(payload)
      // this.props.fetchApplicationProperties && this.props.fetchApplicationProperties(payload)
      this.props.fetchApplicationRelationships && this.props.fetchApplicationRelationships(payload)
      this.props.fetchSoftwares && this.props.fetchSoftwares({})
      this.props.fetchEntitlements && this.props.fetchEntitlements({})
      this.props.fetchEntitlementsBySupplierAgreement && this.props.fetchEntitlementsBySupplierAgreement({})
      this.props.fetchAgreements && this.props.fetchAgreements({})
      this.props.fetchSuppliers && this.props.fetchSuppliers({})
      let listPayload = {
        'application_id': this.props.match.params.id,
        'search': '',
        'page_size': this.props.perPage,
        'page': 1
      }
      this.props.fetchApplicationEntitlements && this.props.fetchApplicationEntitlements(listPayload)
      this.props.fetchApplicationSoftwares && this.props.fetchApplicationSoftwares(listPayload)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      $('[data-toggle="m-tooltip"]').tooltip()
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.applicationbyId && nextProps.applicationbyId !== this.props.applicationbyId) {
        // eslint-disable-next-line
        // mApp && mApp.unblockPage()
        if (nextProps.applicationbyId.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.applicationbyId.error_message, nextProps.applicationbyId.error_code)
          this.props.history.push('/applications')
        }
      }
      // if (nextProps.applicationRelationships && nextProps.applicationRelationships !== this.props.applicationRelationships && !nextProps.responseProcessed.applicationRelationships) {
      //   // eslint-disable-next-line
      //   mApp && mApp.unblockPage()
      //   let responseProcessed = {...nextProps.responseProcessed}
      //   if (nextProps.applicationRelationships.error_code) {
      //     // eslint-disable-next-line
      //     toastr.error(nextProps.applicationRelationships.error_message, nextProps.applicationRelationships.error_code)
      //     this.props.history.push('/applications')
      //   } else {
      //     let counter = 0
      //     let applicationRelationshipData = nextProps.applicationRelationships.resources.map(function (data, index) {
      //       data.isDisplay = true
      //       data.displayIndex = counter++
      //       return data
      //     })
      //     nextProps.setApplicationRelationship(applicationRelationshipData)
      //   }
      //   responseProcessed.applicationRelationships = true
      //   nextProps.setResponseProcessed(responseProcessed)
      // }
      if (nextProps.metaModelPrespective && nextProps.modelPrespective && nextProps.modelPrespective !== '' && nextProps.metaModelPrespective !== '' && !nextProps.responseProcessed.metaModelPrespective && !nextProps.responseProcessed.modelPrespective) {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        let responseProcessed = {...nextProps.responseProcessed}
        if (nextProps.metaModelPrespective.error_code === null && nextProps.modelPrespective.error_code === null) {
          let labelParts = nextProps.metaModelPrespective.resources[0].parts
          let applicationProperties = []
          let applicationRelationships = []
          if (nextProps.modelPrespective.resources[0].parts) {
            nextProps.modelPrespective.resources[0].parts.forEach(function (partData, ix) {
              if (labelParts[ix].standard_property !== null && labelParts[ix].type_property === null) { // Standard Property
                let value = partData.value
                let obj = {}
                obj.name = labelParts[ix].name
                obj.value = value
                applicationProperties.push(obj)
              } else if (labelParts[ix].standard_property === null && labelParts[ix].type_property !== null) { // below are Customer Property
                let value = ''
                if (labelParts[ix].type_property.property_type.key === 'Integer') {
                  value = partData.value !== null ? partData.value.int_value : ''
                } else if (labelParts[ix].type_property.property_type.key === 'Decimal') {
                  value = partData.value !== null ? partData.value.float_value : ''
                } else if (labelParts[ix].type_property.property_type.key === 'Text') {
                  value = partData.value !== null ? partData.value.text_value : ''
                } else if (labelParts[ix].type_property.property_type.key === 'DateTime') {
                  value = partData.value !== null ? moment(partData.value.date_time_value).format('DD MMM YYYY') : ''
                } else if (labelParts[ix].type_property.property_type.key === 'Boolean') {
                  value = partData.value !== null ? partData.value.boolean_value : ''
                } else if (labelParts[ix].type_property.property_type.key === 'List') {
                  value = partData.value !== null ? partData.value.value_set_value.name : ''
                } else {
                  value = partData.value !== null ? partData.value.other_value : ''
                }
                let obj = {}
                obj.name = labelParts[ix].name
                obj.value = value
                applicationProperties.push(obj)
              } else if (labelParts[ix].standard_property === null && labelParts[ix].type_property === null) { // Connection Property
                let componentType = labelParts[ix].constraint.component_type
                let targetComponentType = labelParts[ix].constraint.target_component_type
                let connectionType = labelParts[ix].constraint.connection_type
                if (partData.value) {
                  partData.value.forEach(function (data, index) {
                    data.connection = JSON.parse(JSON.stringify(data))
                    data.connection.connection_type = connectionType
                    data.component.component_type = componentType
                    data.target_component.component_type = targetComponentType
                    applicationRelationships.push(data)
                  })
                }
              }
            })
          }
          nextProps.setApplicationProperty(applicationProperties)
          let counter = 0
          let applicationRelationshipData = applicationRelationships.map(function (data, index) {
            data.isDisplay = true
            data.displayIndex = counter++
            return data
          })
          nextProps.setApplicationRelationship(applicationRelationshipData)
          console.log('applicationRelationshipData', applicationRelationshipData)
        } else {
          if (nextProps.metaModelPrespective.error_code) {
            // eslint-disable-next-line
            toastr.error(nextProps.metaModelPrespective.error_message, nextProps.metaModelPrespective.error_code)
            this.props.history.push('/applications')
          }
          if (nextProps.modelPrespective.error_code) {
            // eslint-disable-next-line
            toastr.error(nextProps.modelPrespective.error_message, nextProps.modelPrespective.error_code)
            this.props.history.push('/applications')
          }
        }
        responseProcessed.metaModelPrespective = true
        responseProcessed.modelPrespective = true
        nextProps.setResponseProcessed(responseProcessed)
      }
      if (nextProps.entitlements && nextProps.entitlements !== '') {
        // eslint-disable-next-line
        // mApp && mApp.unblockPage()
        if (nextProps.entitlements.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.entitlements.error_message, nextProps.entitlements.error_code)
        }
      }
      if (nextProps.suppliers && nextProps.suppliers !== '') {
        // eslint-disable-next-line
        // mApp && mApp.unblockPage()
        if (nextProps.suppliers.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.suppliers.error_message, nextProps.suppliers.error_code)
        }
      }
      if (nextProps.agreements && nextProps.agreements !== '') {
        // eslint-disable-next-line
        // mApp && mApp.unblockPage()
        if (nextProps.agreements.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.agreements.error_message, nextProps.agreements.error_code)
        }
      }
      if (nextProps.softwares && nextProps.softwares !== '') {
        // eslint-disable-next-line
        // mApp && mApp.unblockPage()
        if (nextProps.softwares.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.softwares.error_message, nextProps.softwares.error_code)
        }
      }
      if (nextProps.applicationEntitlements && nextProps.applicationEntitlements !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.applicationEntitlements.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.applicationEntitlements.error_message, nextProps.applicationEntitlements.error_code)
        }
      }
      if (nextProps.applicationSoftwares && nextProps.applicationSoftwares !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.applicationSoftwares.error_code) {
          // eslint-disable-next-line
          toastr.error(nextProps.applicationSoftwares.error_message, nextProps.applicationSoftwares.error_code)
        }
      }
      if (nextProps.addLinkResponse && nextProps.addLinkResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        // let linkActionSettings = {...nextProps.linkActionSettings}
        if (nextProps.addLinkResponse.error_code === null) {
          let listPayload = {
            'application_id': this.props.match.params.id,
            'search': '',
            'page_size': this.props.perPage,
            'page': 1
          }
          // eslint-disable-next-line
          mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
          if (nextProps.showTabs.parentTab === 'Entitlements') {
            this.props.fetchApplicationEntitlements && this.props.fetchApplicationEntitlements(listPayload)
          } else if (nextProps.showTabs.parentTab === 'Software') {
            this.props.fetchApplicationSoftwares && this.props.fetchApplicationSoftwares(listPayload)
          }
          // eslint-disable-next-line
          toastr.success('The Link successfully added in Application ' + nextProps.showTabs.parentTab, 'Good Stuff!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.addLinkResponse.error_message, nextProps.addLinkResponse.error_code)
        }
        this.props.resetResponse()
        let linkActionSettings = {...nextProps.linkActionSettings,
          'isLinkDeleteModalOpen': false,
          'isLinkUpdateModalOpen': false,
          'isLinkModalOpen': false,
          'entitlementSelected': null,
          'licenseCount': 0}
        nextProps.setLinkActionSettings(linkActionSettings)
      }
      if (nextProps.updateLinkResponse && nextProps.updateLinkResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        // let linkActionSettings = {...props.linkActionSettings}
        if (nextProps.updateLinkResponse.error_code === null) {
          let listPayload = {
            'application_id': this.props.match.params.id,
            'search': '',
            'page_size': this.props.perPage,
            'page': 1
          }
          // eslint-disable-next-line
          mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
          if (nextProps.showTabs.parentTab === 'Entitlements') {
            this.props.fetchApplicationEntitlements && this.props.fetchApplicationEntitlements(listPayload)
          } else if (nextProps.showTabs.parentTab === 'Software') {
            this.props.fetchApplicationSoftwares && this.props.fetchApplicationSoftwares(listPayload)
          }
          // eslint-disable-next-line
          toastr.success('The Link successfully updated in Application ' + nextProps.showTabs.parentTab, 'Good Stuff!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.updateLinkResponse.error_message, nextProps.updateLinkResponse.error_code)
        }
        this.props.resetResponse()
        let linkActionSettings = {...nextProps.linkActionSettings,
          'isLinkDeleteModalOpen': false,
          'isLinkUpdateModalOpen': false,
          'isLinkModalOpen': false,
          'entitlementSelected': null,
          'licenseCount': 0}
        nextProps.setLinkActionSettings(linkActionSettings)
      }
      if (nextProps.removeLinkResponse && nextProps.removeLinkResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        // let linkActionSettings = {...nextProps.linkActionSettings}
        if (nextProps.removeLinkResponse.error_code === null) {
          let listPayload = {
            'application_id': this.props.match.params.id,
            'search': '',
            'page_size': this.props.perPage,
            'page': 1
          }
          // eslint-disable-next-line
          mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
          if (nextProps.showTabs.parentTab === 'Entitlements') {
            this.props.fetchApplicationEntitlements && this.props.fetchApplicationEntitlements(listPayload)
          } else if (nextProps.showTabs.parentTab === 'Software') {
            this.props.fetchApplicationSoftwares && this.props.fetchApplicationSoftwares(listPayload)
          }
          // eslint-disable-next-line
          toastr.success('The Link was successfully removed in Application ' + nextProps.showTabs.parentTab, 'Good Stuff!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.removeLinkResponse.error_message, nextProps.removeLinkResponse.error_code)
        }
        this.props.resetResponse()
        let linkActionSettings = {...nextProps.linkActionSettings,
          'isLinkDeleteModalOpen': false,
          'isLinkUpdateModalOpen': false,
          'isLinkModalOpen': false,
          'selectedObject': null,
          'licenseCount': 0}
        nextProps.setLinkActionSettings(linkActionSettings)
      }
    }
  })
)(ApplicationDetail)

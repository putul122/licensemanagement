import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
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
    responseProcessed: state.applicationDetailReducer.responseProcessed
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
  setResponseProcessed: applicationDetailActionCreators.setResponseProcessed
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
        return obj.key === 'Application'
    }), 'perspective')
      console.log('perspectives', perspectives, metaModelPrespectiveId)
      let modelPayload = {}
      modelPayload.componentId = this.props.match.params.id
      modelPayload.metaModelPerspectiveId = metaModelPrespectiveId
      this.props.fetchMetaModelPrespective && this.props.fetchMetaModelPrespective(metaModelPrespectiveId)
      this.props.fetchComponentModelPrespectives && this.props.fetchComponentModelPrespectives(modelPayload)
      this.props.fetchApplicationById && this.props.fetchApplicationById(payload)
      // this.props.fetchApplicationProperties && this.props.fetchApplicationProperties(payload)
      this.props.fetchApplicationRelationships && this.props.fetchApplicationRelationships(payload)
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
                  value = partData.value !== null ? partData.value.date_time_value : ''
                } else if (labelParts[ix].type_property.property_type.key === 'Boolean') {
                  value = partData.value !== null ? partData.value.boolean_value : ''
                } else if (labelParts[ix].type_property.property_type.key === 'List') {
                  value = partData.value !== null ? partData.value.value_set_value : ''
                } else {
                  value = partData.value !== null ? partData.value.other_value : ''
                }
                let obj = {}
                obj.name = labelParts[ix].name
                obj.value = value
                applicationProperties.push(obj)
              } else if (labelParts[ix].standard_property === null && labelParts[ix].type_property === null) { // Connection Property
                if (partData.value) {
                  partData.value.forEach(function (data, index) {
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
    }
  })
)(ApplicationDetail)

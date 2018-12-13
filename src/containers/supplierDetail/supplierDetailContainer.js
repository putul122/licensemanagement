import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import SupplierDetail from '../../components/supplierDetail/supplierDetailComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import _ from 'lodash'
import { actionCreators } from '../../redux/reducers/supplierDetailReducer/supplierDetailReducerReducer'
import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    supplier: state.supplierDetailReducer.supplier,
    supplierApplications: state.supplierDetailReducer.supplierApplications,
    supplierSoftwares: state.supplierDetailReducer.supplierSoftwares,
    supplierAgreements: state.supplierDetailReducer.supplierAgreements,
    supplierDetails: state.supplierDetailReducer.supplierDetails,
    currentPage: state.supplierDetailReducer.currentPage,
    activeTab: state.supplierDetailReducer.activeTab,
    supplierProperties: state.supplierDetailReducer.supplierProperties,
    supplierPropertySettings: state.supplierDetailReducer.supplierPropertySettings,
    updateSupplierPropertyResponse: state.supplierDetailReducer.updateSupplierPropertyResponse
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchSupplierById: sagaActions.supplierActions.fetchSupplierById,
  fetchSupplierAgreements: sagaActions.supplierActions.fetchSupplierAgreements,
  fetchSupplierSoftwares: sagaActions.supplierActions.fetchSupplierSoftwares,
  fetchSupplierProperties: sagaActions.supplierActions.fetchSupplierProperties,
  fetchSupplierApplications: sagaActions.supplierActions.fetchSupplierApplications,
  updateSupplierProperties: sagaActions.supplierActions.updateSupplierProperties,
  setCurrentPage: actionCreators.setCurrentPage,
  setActiveTab: actionCreators.setActiveTab,
  setSupplierPropertySettings: actionCreators.setSupplierPropertySettings,
  setSupplierDetails: actionCreators.setSupplierDetails,
  resetResponse: actionCreators.resetResponse,
  setDiscussionModalOpenStatus: newDiscussionActionCreators.setDiscussionModalOpenStatus
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
        'supplier_id': this.props.match.params.id
      }
      this.props.fetchSupplierById && this.props.fetchSupplierById(payload)
      this.props.fetchSupplierAgreements && this.props.fetchSupplierAgreements(payload)
      this.props.fetchSupplierSoftwares && this.props.fetchSupplierSoftwares(payload)
      this.props.fetchSupplierApplications && this.props.fetchSupplierApplications(payload)
      this.props.fetchSupplierProperties && this.props.fetchSupplierProperties(payload)
      // this.props.fetchPackage && this.props.fetchPackage()
      },
    componentDidMount: function () {
      // eslint-disable-next-line
      mApp && mApp.block('#supplier', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      console.log('Next Props', nextProps)
      let appPackage = JSON.parse(localStorage.getItem('packages'))
      console.log('*****', appPackage)
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.supplier && nextProps.supplier !== this.props.supplier) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#supplier')
      }
      if (nextProps.supplierProperties && nextProps.supplierProperties !== '' && nextProps.supplierProperties !== this.props.supplierProperties) {
        if (nextProps.supplierProperties.error_code === null) {
          let supplierDetails = []
          let processProperty = function (property, type) {
            let propertyType = property.property_type
            let obj = {}
            obj.name = type
            obj.typeProperty = property.type_property
            if (propertyType.key === 'Integer') {
              obj.value = property.int_value
              obj.valueType = 'int_value'
            } else if (propertyType.key === 'Decimal') {
              obj.value = property.float_value
              obj.valueType = 'float_value'
            } else if (propertyType.key === 'Text') {
              obj.value = property.text_value
              obj.valueType = 'text_value'
            } else if (propertyType.key === 'DateTime') {
              obj.value = property.date_time_value
              obj.valueType = 'date_time_value'
            } else if (propertyType.key === 'Boolean') {
              obj.value = property.boolean_value
              obj.valueType = 'boolean_value'
            } else if (propertyType.key === 'List') {
              obj.value = property.value_set_value
              obj.valueType = 'value_set_value'
            } else {
              obj.value = property.other_value
              obj.valueType = 'other_value'
            }
            supplierDetails.push(obj)
          }
          let appPackage = JSON.parse(localStorage.getItem('packages'))
          let componentTypeProperties = appPackage.resources[0].component_type_properties
          let personNameTypeProperty = _.result(_.find(componentTypeProperties, function (obj) {
            return obj.key === 'Supplier~Person Name'
          }), 'component_type_property')
          let departmentNameTypeProperty = _.result(_.find(componentTypeProperties, function (obj) {
            return obj.key === 'Supplier~Department Name'
          }), 'component_type_property')
          let functionTypeProperty = _.result(_.find(componentTypeProperties, function (obj) {
            return obj.key === 'Supplier~Function'
          }), 'component_type_property')
          let productTypeProperty = _.result(_.find(componentTypeProperties, function (obj) {
            return obj.key === 'Supplier~Product'
          }), 'component_type_property')
          let emailTypeProperty = _.result(_.find(componentTypeProperties, function (obj) {
            return obj.key === 'Supplier~Email'
          }), 'component_type_property')
          let cellNumberTypeProperty = _.result(_.find(componentTypeProperties, function (obj) {
            return obj.key === 'Supplier~Cell Number'
          }), 'component_type_property')
          if (nextProps.supplierProperties.resources.length > 0) {
            nextProps.supplierProperties.resources.forEach(function (data, index) {
              console.log('data-------------', data)
              let personNameProperty = _.find(data.properties, function (obj) {
                return obj.type_property === personNameTypeProperty
              })
              if (personNameProperty) {
                processProperty(personNameProperty, 'person_name')
              }
              let departmentNameProperty = _.find(data.properties, function (obj) {
                return obj.type_property === departmentNameTypeProperty
              })
              if (departmentNameProperty) {
                processProperty(departmentNameProperty, 'department_name')
              }
              let functionProperty = _.find(data.properties, function (obj) {
                return obj.type_property === functionTypeProperty
              })
              if (functionProperty) {
                processProperty(functionProperty, 'function')
              }
              let productProperty = _.find(data.properties, function (obj) {
                return obj.type_property === productTypeProperty
              })
              if (productProperty) {
                processProperty(productProperty, 'product')
              }
              let emailProperty = _.find(data.properties, function (obj) {
                return obj.type_property === emailTypeProperty
              })
              if (emailProperty) {
                processProperty(emailProperty, 'email')
              }
              let cellNumberProperty = _.find(data.properties, function (obj) {
                return obj.type_property === cellNumberTypeProperty
              })
              if (cellNumberProperty) {
                processProperty(cellNumberProperty, 'cell_number')
              }
            })
            console.log('supplierDetails -----', supplierDetails)
            this.props.setSupplierDetails(supplierDetails)
          }
         } else {
          // eslint-disable-next-line
          toastr.error(nextProps.supplierProperties.error_message, nextProps.supplierProperties.error_code)
        }
      }
      if (nextProps.supplierDetails && nextProps.supplierDetails !== '' && nextProps.supplierDetails !== this.props.supplierDetails && this.props.supplierDetails === '') {
        console.log('this will execute only one time')
        let supplierPropertySettings = {...this.props.supplierPropertySettings}
        nextProps.supplierDetails.forEach(function (property, index) {
          if (property.name === 'department_name') {
            supplierPropertySettings.department_name = property.value
          }
          if (property.name === 'person_name') {
            supplierPropertySettings.person_name = property.value
          }
          if (property.name === 'function') {
            supplierPropertySettings.function = property.value
          }
          if (property.name === 'email') {
            supplierPropertySettings.email = property.value
          }
          if (property.name === 'product') {
            supplierPropertySettings.product = property.value
          }
          if (property.name === 'cell_number') {
            supplierPropertySettings.cell_number = property.value
          }
        })
        this.props.setSupplierPropertySettings(supplierPropertySettings)
      }
      if (nextProps.updateSupplierPropertyResponse && nextProps.updateSupplierPropertyResponse !== '' && nextProps.updateSupplierPropertyResponse !== this.props.updateSupplierPropertyResponse) {
        nextProps.resetResponse()
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        console.log('update response', nextProps.updateSupplierPropertyResponse)
        if (nextProps.updateSupplierPropertyResponse.error_code === null) {
          let payload = {
            'supplier_id': this.props.match.params.id
          }
          this.props.fetchSupplierProperties && this.props.fetchSupplierProperties(payload)
          // eslint-disable-next-line
          toastr.success('Successfully updated Supplier ' +  nextProps.supplier.resources[0].name + ' property', 'Nice!')
          this.props.setSupplierPropertySettings([])
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.updateSupplierPropertyResponse.error_message, nextProps.updateSupplierPropertyResponse.error_code)
        }
      }
    }
  })
)(SupplierDetail)

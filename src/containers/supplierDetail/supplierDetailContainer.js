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
    currentPage: state.supplierDetailReducer.currentPage,
    activeTab: state.supplierDetailReducer.activeTab,
    supplierProperties: state.supplierDetailReducer.supplierProperties,
    supplierPropertiesSettings: state.supplierDetailReducer.supplierPropertiesSettings,
    updateSupplierPropertyResponse: state.supplierDetailReducer.updateSupplierPropertyResponse,
    supplierPropertiesPayload: state.supplierDetailReducer.supplierPropertiesPayload
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
  setSupplierProperties: actionCreators.setSupplierProperties,
  editSupplierProperties: actionCreators.editSupplierProperties,
  setDiscussionModalOpenStatus: newDiscussionActionCreators.setDiscussionModalOpenStatus
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
      if (nextProps.supplierProperties && nextProps.supplierProperties !== '') {
        if (nextProps.supplierProperties.error_code === null) {
          let appPackage = JSON.parse(localStorage.getItem('packages'))
          console.log('*****', appPackage)
          let componentTypeProperties = appPackage.resources[0].component_type_properties
          let propertyId = _.result(_.find(componentTypeProperties, function (obj) {
            return obj.key === 'Supplier~Department Name'
          }), 'component_type_property')
          console.log('*&*&*', propertyId)
          // console.log('****ID name', propertyId.name)
          // this.props.fetchSupplierProperties && this.props.fetchSupplierProperties(propertyId)
         } else {
          // eslint-disable-next-line
          toastr.error(nextProps.supplierProperties.error_message, nextProps.supplierProperties.error_code)
        }
      }
    }
  })
)(SupplierDetail)

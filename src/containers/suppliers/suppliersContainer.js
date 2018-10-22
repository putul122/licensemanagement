import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Suppliers from '../../components/suppliers/suppliersComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/suppliersReducer/suppliersReducerReducer'
import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    suppliers: state.suppliersReducer.suppliers,
    suppliersSummary: state.suppliersReducer.suppliersSummary,
    supplierSoftwares: state.suppliersReducer.supplierSoftwares,
    currentPage: state.suppliersReducer.currentPage,
    expandSettings: state.suppliersReducer.expandSettings,
    perPage: state.suppliersReducer.perPage
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchSuppliers: sagaActions.supplierActions.fetchSuppliers,
  fetchSuppliersSummary: sagaActions.supplierActions.fetchSuppliersSummary,
  fetchSupplierSoftwares: sagaActions.supplierActions.fetchSupplierSoftwares,
  setCurrentPage: actionCreators.setCurrentPage,
  setExpandSettings: actionCreators.setExpandSettings,
  resetResponse: actionCreators.resetResponse,
  setPerPage: actionCreators.setPerPage,
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
      // eslint-disable-next-line
      // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      let payload = {
        'search': '',
        'page_size': 10,
        'page': 1
      }
      this.props.fetchSuppliers && this.props.fetchSuppliers(payload)
      this.props.fetchSuppliersSummary && this.props.fetchSuppliersSummary()
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      mApp && mApp.block('#supplierSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      mApp && mApp.block('#supplierList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.suppliers && nextProps.suppliers !== this.props.suppliers) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#supplierList')
      }
      if (nextProps.suppliersSummary && nextProps.suppliersSummary !== this.props.suppliersSummary) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#supplierSummary')
      }
      if (nextProps.supplierSoftwares && nextProps.supplierSoftwares !== this.props.suppliersSummary) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#supplierList')
      }
      if (nextProps.perPage && nextProps.perPage !== this.props.perPage) {
        // eslint-disable-next-line
        mApp.block('#supplierList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        let payload = {
          'search': '',
          'page_size': nextProps.perPage,
          'page': 1
        }
        this.props.fetchSuppliers && this.props.fetchSuppliers(payload)
      }
    }
  })
)(Suppliers)

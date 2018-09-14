import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Suppliers from '../../components/suppliers/suppliersComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/suppliersReducer/suppliersReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    suppliers: state.suppliersReducer.suppliers,
    suppliersSummary: state.suppliersReducer.suppliersSummary,
    currentPage: state.suppliersReducer.currentPage
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchSuppliers: sagaActions.supplierActions.fetchSuppliers,
  fetchSuppliersSummary: sagaActions.supplierActions.fetchSuppliersSummary,
  setCurrentPage: actionCreators.setCurrentPage
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
      console.log('my props', this.props)
      let payload = {
        'search': '',
        'page_size': 10,
        'page': 1
      }
      this.props.fetchSuppliers && this.props.fetchSuppliers(payload)
      this.props.fetchSuppliersSummary && this.props.fetchSuppliersSummary()
    }
  })
)(Suppliers)

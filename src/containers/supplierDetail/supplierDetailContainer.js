import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import SupplierDetail from '../../components/supplierDetail/supplierDetailComponent'
import { actions as sagaActions } from '../../redux/sagas/'
// import { actionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    supplier: state.supplierDetailReducer.supplier,
    supplierApplications: state.supplierDetailReducer.supplierApplications,
    supplierSoftwares: state.supplierDetailReducer.supplierSoftwares,
    supplierAgreements: state.supplierDetailReducer.supplierAgreements
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchSupplierById: sagaActions.supplierActions.fetchSupplierById,
  fetchSupplierAgreements: sagaActions.supplierActions.fetchSupplierAgreements,
  fetchSupplierSoftwares: sagaActions.supplierActions.fetchSupplierSoftwares,
  fetchSupplierApplications: sagaActions.supplierActions.fetchSupplierApplications
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
      let payload = {
        'supplier_id': this.props.match.params.id
      }
      this.props.fetchSupplierById && this.props.fetchSupplierById(payload)
      this.props.fetchSupplierAgreements && this.props.fetchSupplierAgreements(payload)
      this.props.fetchSupplierSoftwares && this.props.fetchSupplierSoftwares(payload)
      this.props.fetchSupplierApplications && this.props.fetchSupplierApplications(payload)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      mApp && mApp.block('#supplier', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.supplier && nextProps.supplier !== this.props.supplier) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#supplier')
      }
    }
  })
)(SupplierDetail)

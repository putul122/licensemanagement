import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Agreements from '../../components/agreements/agreementsComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/agreementsReducer/agreementsReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    agreements: state.agreementsReducer.agreements,
    agreementsSummary: state.agreementsReducer.agreementsSummary,
    currentPage: state.agreementsReducer.currentPage
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchAgreements: sagaActions.agreementActions.fetchAgreements,
  fetchAgreementsSummary: sagaActions.agreementActions.fetchAgreementsSummary,
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
      // eslint-disable-next-line
      // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      let payload = {
        'search': '',
        'page_size': 10,
        'page': 1
      }
      this.props.fetchAgreements && this.props.fetchAgreements(payload)
      this.props.fetchAgreementsSummary && this.props.fetchAgreementsSummary()
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      mApp && mApp.block('#agreementSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
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
    }
  })
)(Agreements)

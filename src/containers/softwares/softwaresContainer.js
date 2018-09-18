import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import SoftwareList from '../../components/softwares/softwareComponent.js'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/softwaresReducer/softwaresReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    software: state.softwaresReducer.software,
    softwareSummary: state.softwaresReducer.softwareSummary,
    currentPage: state.softwaresReducer.currentPage
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchSoftwaresSummary: sagaActions.softwareActions.fetchSoftwaresSummary,
  fetchSoftwares: sagaActions.softwareActions.fetchSoftwares,
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
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      let payload = {
        'search': '',
        'page_size': 10,
        'page': 1
      }
      this.props.fetchSoftwares && this.props.fetchSoftwares(payload)
      this.props.fetchSoftwaresSummary && this.props.fetchSoftwaresSummary()
    },
    componentDidMount: function () {
      // // eslint-disable-next-line
      // mApp && mApp.unblockPage()
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.software && nextProps.software !== this.props.software) {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
      }
    }
  })
)(SoftwareList)

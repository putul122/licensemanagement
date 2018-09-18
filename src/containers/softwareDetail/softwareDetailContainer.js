import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import SoftwareView from '../../components/softwareDetail/softwareDetailComponent'
import { actions as sagaActions } from '../../redux/sagas/'
// import { actionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    softwarebyId: state.softwareDetailReducer.softwarebyId
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchSoftwareById: sagaActions.softwareActions.fetchSoftwareById
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
      console.log('component will mount', this.props)
      let payload = {
        'id': this.props.match.params.id
      }
      this.props.fetchSoftwareById && this.props.fetchSoftwareById(payload)
      }
    // componentDidMount: function () {
    // //   this.props.fetchBasic && this.props.fetchBasic()
    // }
  })
)(SoftwareView)

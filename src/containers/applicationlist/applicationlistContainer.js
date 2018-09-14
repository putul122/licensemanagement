import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ApplicationList from '../../components/applicationlistComponent/applicationlistComponent'
// import { actions as sagaActions } from '../../redux/sagas/'
// import { actionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
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
    componentDidMount: function () {
    //   this.props.fetchBasic && this.props.fetchBasic()
    }
  })
)(ApplicationList)

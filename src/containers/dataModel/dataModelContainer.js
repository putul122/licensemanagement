import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import DataModel from '../../components/dataModel/dataModelComponent'
import { actionCreators } from '../../redux/reducers/dataModelReducer/dataModelReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    // startNode: state.dataModelReducer.startNode,
    // relationships: state.dataModelReducer.relationships,
    zoomStatus: state.dataModelReducer.zoomStatus
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  setZoomStatus: actionCreators.setZoomStatus
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
    },
    componentDidMount: function () {
        console.log('component did mount', this.props)
    },
    componentWillReceiveProps: function (nextProps) {
        console.log('com will receive props', nextProps)
    }
  })
)(DataModel)

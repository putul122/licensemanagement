import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import NewDiscussion from '../../components/newDiscussion/newDiscussionComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    isDiscussionModalOpen: state.newDiscussionReducer.isDiscussionModalOpen,
    accountArtefactsData: state.newDiscussionReducer.accountArtefactsData,
    modelArtefactsData: state.newDiscussionReducer.modelArtefactsData,
    formattedAccounts: state.newDiscussionReducer.formattedAccounts,
    formattedModels: state.newDiscussionReducer.formattedModels,
    formattedTags: state.newDiscussionReducer.formattedTags,
    newMessage: state.newDiscussionReducer.newMessage,
    createDiscussionResponse: state.newDiscussionReducer.createDiscussionResponse
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  setDiscussionModalOpenStatus: actionCreators.setDiscussionModalOpenStatus,
  fetchAccountArtefacts: sagaActions.discussionActions.fetchAccountArtefacts,
  fetchModelArtefacts: sagaActions.discussionActions.fetchModelArtefacts,
  fetchDiscussions: sagaActions.discussionActions.fetchDiscussions,
  setFormattedAccountData: actionCreators.setFormattedAccountData,
  setFormattedModelData: actionCreators.setFormattedModelData,
  setMessageData: actionCreators.setMessageData,
  setReplySettings: actionCreators.setReplySettings,
  createDiscussion: sagaActions.discussionActions.createDiscussion,
  resetCreateDiscussionResponse: actionCreators.resetCreateDiscussionResponse
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
      console.log('new dis comp will mount', this.props)
      let initialPayload = {
        'search': '',
        page_size: 100,
        page: 1
      }
      this.props.fetchAccountArtefacts && this.props.fetchAccountArtefacts(initialPayload)
      this.props.fetchModelArtefacts && this.props.fetchModelArtefacts(initialPayload)
    },
    componentDidMount: function () {
        console.log('component did mount')
    },
    componentWillReceiveProps: function (nextProps) {
      console.log('next props new discussion', nextProps)
      if (nextProps.accountArtefactsData && nextProps.accountArtefactsData !== this.props.accountArtefactsData) {
        if (nextProps.accountArtefactsData.result_code === 0) {
          let accountsData = nextProps.accountArtefactsData.resources.map(function (account, index) {
            let obj = {}
            obj.id = account.id
            obj.display = account.name.trim()
            return obj
          })
          // accountsData.shift()
          this.props.setFormattedAccountData && this.props.setFormattedAccountData(accountsData)
        }
      }
      if (nextProps.modelArtefactsData && nextProps.modelArtefactsData !== this.props.modelArtefactsData) {
        if (nextProps.modelArtefactsData.result_code === 0) {
          let modelData = nextProps.modelArtefactsData.resources.map(function (model, index) {
            let obj = {}
            obj.id = model.id
            obj.display = model.name.trim()
            return obj
          })
          this.props.setFormattedModelData && this.props.setFormattedModelData(modelData)
        }
      }
      if (nextProps.createDiscussionResponse && nextProps.createDiscussionResponse !== '' && nextProps.createDiscussionResponse !== this.props.createDiscussionResponse) {
        if (nextProps.createDiscussionResponse.error_code === null) {
          let newDiscussionname = nextProps.createDiscussionResponse.resources[0].name
          let payload = {
            'context_type_key': this.props.type,
            'context_id': this.props.contextId
          }
          this.props.fetchDiscussions && this.props.fetchDiscussions(payload)
          // eslint-disable-next-line
          toastr.success('Discussion ' +  newDiscussionname +  ' created on ' + this.props.name , ' Talk about it!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.createDiscussionResponse.error_message, nextProps.createDiscussionResponse.error_code)
        }
        nextProps.resetCreateDiscussionResponse()
      }
    }
  })
)(NewDiscussion)

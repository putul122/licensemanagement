import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Discusson from '../../components/discussion/discussionComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import _ from 'lodash'
import { actionCreators } from '../../redux/reducers/discussionReducer/discussionReducerReducer'
import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    discussionSlide: state.discussionReducer.discussionSlide,
    hideSlideAction: state.discussionReducer.hideSlideAction,
    discussions: state.discussionReducer.discussions,
    discussionMessages: state.discussionReducer.discussionMessages,
    discussionId: state.discussionReducer.discussionId,
    artefactAccounts: state.discussionReducer.artefactAccounts,
    artefactModels: state.discussionReducer.artefactModels,
    formattedAccounts: state.discussionReducer.formattedAccounts,
    formattedModels: state.discussionReducer.formattedModels,
    formattedTags: state.discussionReducer.formattedTags,
    newMessage: state.discussionReducer.newMessage,
    replySettings: state.discussionReducer.replySettings,
    createMessageResponse: state.discussionReducer.createMessageResponse,
    isAccordianOpen: state.discussionReducer.isAccordianOpen
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  setQuickslideDiscussion: actionCreators.setQuickslideDiscussion,
  setDiscussionId: actionCreators.setDiscussionId,
  fetchDiscussions: sagaActions.discussionActions.fetchDiscussions,
  fetchDiscussionMessages: sagaActions.discussionActions.fetchDiscussionMessages,
  fetchAccountArtefacts: sagaActions.discussionActions.fetchAccountArtefacts,
  fetchModelArtefacts: sagaActions.discussionActions.fetchModelArtefacts,
  replyDiscussionMessages: sagaActions.discussionActions.replyDiscussionMessages,
  setFormattedAccountData: actionCreators.setFormattedAccountData,
  setFormattedModelData: actionCreators.setFormattedModelData,
  setMessageData: actionCreators.setMessageData,
  setReplySettings: actionCreators.setReplySettings,
  setAccordianOpenFlag: actionCreators.setAccordianOpenFlag,
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
      let contextId = ''
      let TypeKey = this.props.TypeKey
      if (this.props.type === 'Component') {
        contextId = this.props.match.params.id
      } else {
        let appPackage = JSON.parse(localStorage.getItem('packages'))
        let componentTypes = appPackage.resources[0].component_types
        let componentId = _.result(_.find(componentTypes, function (obj) {
            return obj.key === TypeKey
        }), 'component_type')
        contextId = componentId
      }
      let payload = {
        'context_type_key': this.props.type,
        'context_id': contextId
      }
      let initialPayload = {
        'search': '',
        page_size: 100,
        page: 1
      }
      this.props.fetchDiscussions && this.props.fetchDiscussions(payload)
      this.props.fetchAccountArtefacts && this.props.fetchAccountArtefacts(initialPayload)
      this.props.fetchModelArtefacts && this.props.fetchModelArtefacts(initialPayload)
    },
    componentDidMount: function () {
        console.log('component did mount')
    },
    componentWillReceiveProps: function (nextProps) {
      console.log('run next props', nextProps)
      if (nextProps.artefactAccounts && nextProps.artefactAccounts !== this.props.artefactAccounts) {
        if (nextProps.artefactAccounts.result_code === 0) {
          let accountsData = nextProps.artefactAccounts.resources.map(function (account, index) {
            let obj = {}
            obj.id = account.id
            obj.display = account.name.trim()
            return obj
          })
          // accountsData.shift()
          this.props.setFormattedAccountData && this.props.setFormattedAccountData(accountsData)
        }
      }
      if (nextProps.artefactModels && nextProps.artefactModels !== this.props.artefactModels) {
        if (nextProps.artefactModels.result_code === 0) {
          let modelData = nextProps.artefactModels.resources.map(function (model, index) {
            let obj = {}
            obj.id = model.id
            obj.display = model.name.trim()
            return obj
          })
          this.props.setFormattedModelData && this.props.setFormattedModelData(modelData)
        }
      }
      if (nextProps.createMessageResponse && nextProps.createMessageResponse !== this.props.createMessageResponse) {
        if (nextProps.createMessageResponse.result_code === 0) {
          let payload = {
            id: this.props.discussionId
          }
          this.props.fetchDiscussionMessages && this.props.fetchDiscussionMessages(payload)
        }
      }
    }
  })
)(Discusson)

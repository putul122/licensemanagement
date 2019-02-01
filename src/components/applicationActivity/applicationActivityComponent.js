import React from 'react'
import styles from './applicationActivityComponent.scss'
import PropTypes from 'prop-types'
import moment from 'moment'
import api from '../../constants'
import _ from 'lodash'
import ComponentModalView from '../../containers/componentModalView/componentModalViewContainer'
// import ReactHtmlParser from 'react-html-parser'
const liStyle = {
  margin: '0 0 6px 0'
}
export default function ApplicationActivity (props) {
  let activityMessages = props.activityMessages.resources ? props.activityMessages.resources : ''
  let activityMessagesList = ''
  let componentId = props.componentId
  let currentPage = props.currentPage
  let nextClass = ''
  let previousClass = ''
  let totalNoPages = 5
  let loadMoreMessages = function (event) {
    event.preventDefault()
    let payload = {
      'page_size': 100 * (currentPage + 1),
      'page': 1
    }
    props.activityMessage(payload)
    // eslint-disable-next-line
    mApp.block('#ActivityFeedMessage', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    props.setCurrentPage(currentPage + 1)
    // eslint-disable-next-line
    // $("html, body").animate({ scrollTop: $("#ActivityFeedMessage").scrollTop() }, 1000)
  }
  let handlePrevious = function (event) {
    event.preventDefault()
    if (currentPage === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    } else {
      let payload = {
        'page_size': 100,
        'page': currentPage - 1
      }
      props.activityMessage(payload)
      // eslint-disable-next-line
      mApp.block('#ActivityFeedMessage', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      props.setCurrentPage(currentPage - 1)
    }
    // eslint-disable-next-line
    $("html, body").animate({ scrollTop: $("#ActivityFeedMessage").scrollTop() }, 1000)
  }
  let handleNext = function (event) {
    event.preventDefault()
    if (currentPage === totalNoPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    } else {
      let payload = {
        'page_size': 100,
        'page': currentPage + 1
      }
      props.activityMessage(payload)
      // eslint-disable-next-line
      mApp.block('#ActivityFeedMessage', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      props.setCurrentPage(currentPage + 1)
    }
    // eslint-disable-next-line
    $("html, body").animate({ scrollTop: $("#ActivityFeedMessage").scrollTop() }, 1000)
  }
  console.log('componentId', componentId, props)
  let parseMessage = function (result) {
    let now = moment()
    activityMessagesList = result.map(function (messageGroup, index) {
      // console.log('------>messag ', index, messageGroup)
      messageGroup = messageGroup.reverse()
      let contextIconlink = messageGroup[0].discussion.context.icon ? api.iconURL + messageGroup[0].discussion.context.icon : api.iconURL1
      // let contextIconlink = messageGroup[0].links.find(function (link) { console.log(link); return link.rel === 'context_icon' })
        let context = messageGroup[0].discussion.context.name
        let discussion = messageGroup[0].discussion.name
        let description = messageGroup[0].discussion.context.description
        let messageList = messageGroup.map(function (message, i) {
          // let userIconlink = message.links.find(function (link) { return link.rel === 'author_avatar' })
          let userIconlink = message.author.icon ? api.iconURL + message.author.icon : api.iconURL18
          let mentionArray = message.name.match(/\[(.*?)\]/g)
          let messageArrayBlock = []
          let testMessage = message.name
          if (mentionArray) {
            mentionArray.forEach(function (data, index) {
              data = data.substring(1, data.length - 1)
              let parts = data.toString().split(':')
              // eslint-disable-next-line
              // let str = `\\@\\[${data}\\]`
              // let reg = new RegExp(str, 'g')
              let match = '@[' + data + ']'
              let test = function (reference, referenceArray) {
                let referenceParts = reference.toString().split(':')
                let referenceId = parseInt(referenceParts[2])
                let artefactType = _.result(_.find(referenceArray, function (obj) {
                  return obj.id === referenceId
                }), 'artefact_type')
                console.log('artefactType', artefactType)
                if (artefactType) {
                  if (artefactType.key === 'Component') {
                    // componentId = referenceId
                    props.setComponentId(referenceId)
                    let payload = {}
                    payload.isModalOpen = true
                    payload.callAPI = true
                    props.setModalSettings(payload)
                    props.setQuickslideFlag(false)
                  } else {
                    // componentId = null
                    props.setComponentId(null)
                  }
                } else {
                  // componentId = null
                  props.setComponentId(null)
                }
              }
              if (parts[1] === 'Mention') {
                let messageParts = testMessage.split(match)
                messageArrayBlock.push((<span key={'m' + i + 'ma' + index}>{messageParts[0]}</span>))
                messageArrayBlock.push((<a href='javascript:void(0);' className='search-term-match'>{'@' + parts[0]}</a>))
                if (messageParts[1].match(/\[(.*?)\]/g) === null) {
                  messageArrayBlock.push((<span>{messageParts[1]}</span>))
                } else {
                  testMessage = messageParts[1]
                }
              } else if (parts[1] === 'Reference') {
                let messageParts = testMessage.split(match)
                parts[0] = parts[0].replace(String.fromCharCode(8261), '[').replace(String.fromCharCode(8262), ']').replace(String.fromCharCode(8285), ':')
                messageArrayBlock.push((<span>{messageParts[0]}</span>))
                messageArrayBlock.push((<a onClick={(event) => { event.preventDefault(); test(data, message.references) }} href='javascript:void(0);' className='search-term-match'>{'#' + parts[0]}</a>))
                if (messageParts[1].match(/\[(.*?)\]/g) === null) {
                  messageArrayBlock.push((<span>{messageParts[1]}</span>))
                } else {
                  testMessage = messageParts[1]
                }
              } else if (parts[1] === 'Tag') {
                let messageParts = testMessage.split(match)
                messageArrayBlock.push((<span>{messageParts[0]}</span>))
                messageArrayBlock.push((<span>{'#' + parts[0] + ''}</span>))
                if (messageParts[1].match(/\[(.*?)\]/g) === null) {
                  messageArrayBlock.push((<span>{messageParts[1]}</span>))
                } else {
                  testMessage = messageParts[1]
                }
              }
            })
          }
          let messageCreated = moment(message.created)
          let differenceInDays = now.diff(messageCreated, 'days')
          let messageTime = ''
          if (differenceInDays === 0) {
            messageTime = moment(message.created).fromNow()
          } else {
            messageTime = moment(message.created).format('MM MMM h:mA')
          }
          // let timeContent = '<span class="pull-right">' + messageTime + '</span>'
          return (<li>
            <img src={userIconlink} alt={message.author.name} /><span style={{'fontSize': '10px'}}> {message.author.name + ' :'} </span>{messageArrayBlock}<span className='pull-right'>{messageTime}</span>
            {props.notificationReceived && message.new && (<span className='m-nav__link-badge m-badge m-badge--dot m-badge--dot-small m-badge--danger pull-right' />)}
          </li>)
        })
      return (
        <li key={index} style={liStyle} >
          <div className={styles.groupspace}>
            <img src={contextIconlink} alt={context} /><div className={styles.tooltip} style={{'fontSize': '14px'}} ><b><a href='javascript:void(0);'>{context}</a></b><span className={styles.tooltiptext}>{description}</span></div>:&nbsp;<a href='javascript:void(0);'>{discussion}</a>
            <ul>
              {messageList}
            </ul>
          </div>
        </li>
      )
    })
  }
  if (activityMessages !== '') {
    let result = []
    let temp = []
    let equal
    for (var i = 0; i < activityMessages.length; i += 1) {
      if (activityMessages[i + 1]) {
        equal = ((activityMessages[i].discussion.context.id === activityMessages[i + 1].discussion.context.id) && (activityMessages[i].discussion.id === activityMessages[i + 1].discussion.id))
        if (equal) {
          temp.push(activityMessages[i])
        } else {
          // Not Equal
          temp.push(activityMessages[i])
          result.push(temp)
          temp = []
        }
      } else {
        // i is last
        temp.push(activityMessages[i])
        result.push(temp)
        // result = result.reverse()
        // console.log('final result -------->', result)
        parseMessage(result)
      }
    }
  }
  if (currentPage === 1) {
    previousClass = 'm-datatable__pager-link--disabled'
  }

  if (currentPage === totalNoPages) {
    nextClass = 'm-datatable__pager-link--disabled'
  }
  return (
    <div id='ActivityFeedMessage' className={styles.activityline}>
      <ul>
        {activityMessagesList}
        <li key={'second_last'} style={liStyle} >
          <div className='float-right' >
            <a href='javascript:void(0);' onClick={loadMoreMessages} title='Next' className={'pull-right '} >...<i className='fa	fa-angle-double-down' /></a>
          </div>
        </li>
        <li key={'last'} className='hidden' style={{'display': 'none'}} >
          <div className='m_datatable m-datatable m-datatable--default'>
            <div className='m-datatable__pager m-datatable--paging-loaded'>
              <ul className='m-datatable__pager-nav' style={{width: '100%'}}>
                <li className='float-left'><a href='javascript:void(0);' onClick={handlePrevious} title='Previous' id='m_blockui_1_5' className={'m-datatable__pager-link m-datatable__pager-link--prev pull-left ' + previousClass} data-page='4'><i className='la la-angle-left' /></a></li>
                <li className='float-right'><a href='javascript:void(0);' onClick={handleNext} title='Next' className={'m-datatable__pager-link m-datatable__pager-link--next pull-right ' + nextClass} data-page='4'><i className='la la-angle-right' /></a></li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
      <ComponentModalView componentId={componentId} />
    </div>
  )
}
ApplicationActivity.propTypes = {
  activityMessages: PropTypes.any,
  // eslint-disable-next-line
  notificationReceived: PropTypes.any,
  componentId: PropTypes.any,
  currentPage: PropTypes.any
}

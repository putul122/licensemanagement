import React from 'react'
import styles from './applicationActivityComponent.scss'
import PropTypes from 'prop-types'
// import _ from 'lodash'
import ReactHtmlParser from 'react-html-parser'
export default function ApplicationActivity (props) {
  console.log('activity message props', props.activityMessages, props.notificationReceived, props)
  let activityMessages = props.activityMessages.resources ? props.activityMessages.resources : ''
  let activityMessagesList = ''
  if (activityMessages !== '') {
    let result = []
    let temp = []
    let equal
    for (var i = 0; i < activityMessages.length; i += 1) {
      // console.log(i)
      if (activityMessages[i] && activityMessages[i + 1] && activityMessages[i].discussion !== null && activityMessages[i].discussion.context !== null && activityMessages[i + 1].discussion.context !== null) {
        if (equal !== ((activityMessages[i] && activityMessages[i + 1] && activityMessages[i].discussion.context.name === activityMessages[i + 1].discussion.context.name) && (activityMessages[i] && activityMessages[i + 1] && activityMessages[i].discussion.name === activityMessages[i + 1].discussion.name))) {
          if (activityMessages[i + 1]) {
            if (equal !== undefined && !equal) {
                result.push(temp)
                temp = []
            }
            if (i + 1 < activityMessages.length) {
              equal = (activityMessages[i].discussion.context.name === activityMessages[i + 1].discussion.context.name && activityMessages[i].discussion.name === activityMessages[i + 1].discussion.name)
            }
          } else {}
        }
        if (i + 1 < activityMessages.length) {
          temp.push(activityMessages[i])
        } else {
          if (equal) {
            temp.push(activityMessages[i])
          } else {
            result.push(temp)
            temp = []
            temp.push(activityMessages[i])
            result.push(temp)
          }
        }
      }
      if (i + 1 === activityMessages.length) {
        // if (temp.length) {
        //   result.push(temp)
        // }
        if (result.length > 0) {
          result = result.reverse()
          // console.log('------>messag full', result)
          activityMessagesList = result.map(function (messageGroup, index) {
            // console.log('------>messag ', index, messageGroup)
            messageGroup = messageGroup.reverse()
            let contextIconlink = messageGroup[0].discussion.context.icon ? 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/' + messageGroup[0].discussion.context.icon : 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/1'
            // console.log('context icon link', contextIconlink)
            //   // let contextIconlink = messageGroup[0].links.find(function (link) { console.log(link); return link.rel === 'context_icon' })
          //   console.log(contextIconlink)
              let context = messageGroup[0].discussion.context.name
              let discussion = messageGroup[0].discussion.name
              let description = messageGroup[0].discussion.context.description
              let messageList = messageGroup.map(function (message, i) {
                // let userIconlink = message.links.find(function (link) { return link.rel === 'author_avatar' })
                let userIconlink = message.author.icon ? 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/' + message.author.icon : 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/18'
                let messageContent = message.name.replace(/<m ix=0>/g, '<a href="javascript:void(0);">@').replace(/<\/m>/g, '</a>')
                .replace(/<r ix=0>/g, '<a href="javascript:void(0);">#').replace(/<\/r>/g, '</a>')
                .replace(/<r ix=1>/g, '<a href="javascript:void(0);">#').replace(/<\/r>/g, '</a>')
                .replace(/<t>/g, ' #').replace(/<\/t>/g, '')
                let mentionArray = message.name.match(/\[(.*?)\]/g)
                if (mentionArray) {
                  mentionArray.forEach(function (data, index) {
                    data = data.substring(1, data.length - 1)
                    let parts = data.toString().split(':')
                    // eslint-disable-next-line
                    let str = `\\@\\[${data}\\]`
                    let reg = new RegExp(str, 'g')
                    if (parts[1] === 'Mention') {
                      messageContent = messageContent.replace(reg, '<a href="javascript:void(0);">@' + parts[0] + '</a>')
                    } else if (parts[1] === 'Reference') {
                      messageContent = messageContent.replace(reg, '<a href="javascript:void(0);">#' + parts[0] + '</a>')
                    } else if (parts[1] === 'Tag') {
                      messageContent = messageContent.replace(reg, '#' + parts[0] + '')
                    }
                  })
                }
                return (<li>
                  <img src={userIconlink} alt={message.author.name} />{ReactHtmlParser(messageContent)}
                  {props.notificationReceived && message.new && (<span className='m-nav__link-badge m-badge m-badge--dot m-badge--dot-small m-badge--danger pull-right' />)}
                </li>)
              })
            return (
              <li key={index} >
                <div className={styles.groupspace}>
                  <img src={contextIconlink} alt={context} /><div className={styles.tooltip}><a href='javascript:void(0);'>{context}</a><span className={styles.tooltiptext}>{description}</span></div>::<a href='javascript:void(0);'>{discussion}</a>
                  <ul>
                    {messageList}
                  </ul>
                </div>
              </li>
            )
          })
        }
      }
    }
  }

  return (
    <div className={styles.activityline}>
      {/* <h2>Activity Feed </h2> */}
      <ul>
        {activityMessagesList}
      </ul>
    </div>
  )
}
ApplicationActivity.propTypes = {
  activityMessages: PropTypes.any,
  notificationReceived: PropTypes.any
}

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'redux-first-router'
import {
  getAuthUser,
  getChannels,
  getIsInitiallyLoaded,
  getPrivateChannels,
  getPublicChannels,
  getUsers,
  getChatChannels,
  getChatSettingByName,
  getCurrentLocationId,
  getDirectMessages,
  getStarredChannels
} from '../../../selectors/index'
import { Button, Input, InputGroup, InputGroupAddon, UncontrolledTooltip } from 'reactstrap'
import { NavLink } from 'redux-first-router-link'
import LoadingComponent from '../../loader/index'
import { updateSelectedModal, updateDetail } from '../../../modules/web/store/actions'
import { markAllReadMessages } from '../../../modules/unread-messages/store/actions'

class Chat extends React.PureComponent {
  static propTypes = {
    authUser: PropTypes.array,
    channels: PropTypes.array,
    directMessages: PropTypes.array,
    starredChannels: PropTypes.array,
    mutedChannels: PropTypes.array,
    privateChannels: PropTypes.array,
    publicChannels: PropTypes.array,
    users: PropTypes.array,
    initiallyLoaded: PropTypes.bool.isRequired,
    updateSelectedModal: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      redirectType: ''
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', this.keypressFunction, false)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.keypressFunction, false)
  }

  keypressFunction = (event) => {
    if ((window.navigator.userAgent.indexOf('Mac') != -1)) {
      // For keyboard shortcuts
      if (event.metaKey && event.keyCode === 191) {
        let params = {name: 'KEYBOARD_DETAILS'}
        this.props.updateDetail(params)
      }
      // For browse DMs
      if (event.metaKey && event.shiftKey && event.keyCode === 75) {
        this.props.updateSelectedModal('DIRECT_MESSAGE_BROWSE')
      }

      //For all unreads
      if (event.metaKey && event.shiftKey && event.keyCode === 65) {
        push('/chat/unreads')
      }
    } else {
      // For keyboard shortcuts
      if (event.ctrlKey && event.keyCode === 191) {
        let params = {name: 'KEYBOARD_DETAILS'}
        this.props.updateDetail(params)
      }
      // For browse DMs
      if (event.ctrlKey && event.shiftKey && event.keyCode === 75) {
        this.props.updateSelectedModal('DIRECT_MESSAGE_BROWSE')
      }

      //For all unreads
      if (event.ctrlKey && event.shiftKey && event.keyCode === 65) {
        push('/chat/unreads')
      }
    }

    //Read all messages
    if (event.keyCode === 27 && event.shiftKey) {
      this.readAllChannels()
    }

    //For Previous channel or DM
    if (event.altKey && event.keyCode === 38 && !event.shiftKey) {
      this.setState({
        redirectType: 'prev'
      })
      this.channelList.click()
    }

    //For Next channel or DM
    if (event.altKey && event.keyCode === 40 && !event.shiftKey) {
      this.setState({
        redirectType: 'next'
      })
      this.channelList.click()
    }

    //Previous unread channel or DM
    if (event.altKey && event.shiftKey && event.keyCode === 38) {
      this.setState({
        redirectType: 'prev-unread'
      })
      this.channelList.click()
    }

    //For Next unread channel or DM
    if (event.altKey && event.shiftKey && event.keyCode === 40) {
      this.setState({
        redirectType: 'next-unread'
      })
      this.channelList.click()
    }
  }

  readAllChannels = () => {
    let markAll = []
    let channels = this.props.channels.concat(this.props.directMessages)
    for (let i = 0; i < channels.length; i++) {
      if (channels[i].unreadCount) {
        markAll.push({id: channels[i].authMember.id, messageId: channels[i].unreadCount})
      }
    }
    if (markAll.length) {
      this.props.markAllReadMessages({all: markAll})
    }
  }

  displayChannels = (channel, muted, stared, separate, direct) => {
    let channels = stared.concat(this.props.privateSeparate == 'TRUE' ? separate : channel)
    channels = channels.concat(muted)
    channels = channels.concat(direct)
    let id = this.props.currentLocationId
    if (id) {
      if (this.state.redirectType == 'next') {
        for (let i = 0; i < channels.length; i++) {
          if (channels[i].id === id) {
            if (i === channels.length - 1) {
              if (channels[0].type) {
                push('/chat/direct-messages/' + channels[0].id)
              } else {
                push('/chat/channels/' + channels[0].id)
              }
            } else {
              if (channels[i + 1].type) {
                push('/chat/direct-messages/' + channels[i + 1].id)
              } else {
                push('/chat/channels/' + channels[i + 1].id)
              }
            }
            break
          }
        }
      }

      if (this.state.redirectType == 'prev') {
        for (let i = 0; i < channels.length; i++) {
          if (channels[i].id === id) {
            if (i === 0) {
              if (channels[channels.length - 1].type) {
                push('/chat/direct-messages/' + channels[channels.length - 1].id)
              } else {
                push('/chat/channels/' + channels[channels.length - 1].id)
              }
            } else {
              if (channels[i - 1].type) {
                push('/chat/direct-messages/' + channels[i - 1].id)
              } else {
                push('/chat/channels/' + channels[i - 1].id)
              }
            }
            break
          }
        }
      }

      if (this.state.redirectType == 'next-unread') {
        for (let i = 0; i < channels.length; i++) {
          if (channels[i].id === id) {
            if (i === channels.length - 1) {
              if (channels[0].unreadCount) {
                if (channels[0].type) {
                  push('/chat/direct-messages/' + channels[0].id)
                } else {
                  push('/chat/channels/' + channels[0].id)
                }
                break
              }
            } else {
              if (channels[i + 1].unreadCount) {
                if (channels[i + 1].type) {
                  push('/chat/direct-messages/' + channels[i + 1].id)
                } else {
                  push('/chat/channels/' + channels[i + 1].id)
                }
                break
              }
            }
          }
        }
      }

      if (this.state.redirectType == 'prev-unread') {
        for (let i = 0; i < channels.length; i++) {
          if (channels[i].id === id) {
            if (i === 0) {
              if (channels[channels.length - 1].unreadCount) {
                if (channels[channels.length - 1].type) {
                  push('/chat/direct-messages/' + channels[channels.length - 1].id)
                } else {
                  push('/chat/channels/' + channels[channels.length - 1].id)
                }
                break
              }
            } else {
              if (channels[i - 1].unreadCount) {
                if (channels[i - 1].type) {
                  push('/chat/direct-messages/' + channels[i - 1].id)
                } else {
                  push('/chat/channels/' + channels[i - 1].id)
                }
                break
              }
            }
          }
        }
      }
    } else {
      if (this.state.redirectType == 'next') {
        if (channels[0].type) {
          push('/chat/direct-messages/' + channels[0].id)
        } else {
          push('/chat/channels/' + channels[0].id)
        }
      }
      if (this.state.redirectType == 'prev') {
        if (channels[channels.length - 1].type) {
          push('/chat/direct-messages/' + channels[channels.length - 1].id)
        } else {
          push('/chat/channels/' + channels[channels.length - 1].id)
        }
      }
      if (this.state.redirectType == 'next-unread') {
        for (let i = 0; i < channels.length; i++) {
          if (channels[i].unreadCount) {
            if (channels[i].type) {
              push('/chat/direct-messages/' + channels[i].id)
            } else {
              push('/chat/channels/' + channels[i].id)
            }
          }
        }
      }
      if (this.state.redirectType == 'prev-unread') {
        for (let i = 0; i < channels.length; i++) {
          if (channels[channels.length - 1].unreadCount) {
            if (channels[i].type) {
              push('/chat/direct-messages/' + channels[i].id)
            } else {
              push('/chat/channels/' + channels[i].id)
            }
          }
        }
      }
    }
  }

  render () {
    if (!this.props.initiallyLoaded) {
      return <LoadingComponent/>
    }
    let channelArray = []
    let sidebarAppearance = this.props.sidebarAppearance
    let channelsList = this.props.channels.map(channel => {
      if (channel.public && channel.authMember.star == 0 && channel.authMember.muted == 0) {
        if (sidebarAppearance != 'Everything' && this.props.currentLocationId !== channel.id) {
          if (channel.unreadCount > 0) {
            channelArray.push({id: channel.id, type: channel.type, unreadCount: channel.unreadCount})
            return <li key={channel.id}><NavLink to={`/chat/channels/${channel.id}`}
                                                 activeClassName={'active'}># {channel.name}</NavLink></li>
          }
        } else {
          channelArray.push({id: channel.id, type: channel.type, unreadCount: channel.unreadCount})
          return <li key={channel.id}><NavLink to={`/chat/channels/${channel.id}`}
                                               activeClassName={'active'}># {channel.name}</NavLink></li>
        }
      } else if (channel.authMember.star == 0 && channel.authMember.muted == 0) {
        if (sidebarAppearance != 'Everything' && this.props.currentLocationId !== channel.id) {
          if (channel.unreadCount > 0) {
            channelArray.push({id: channel.id, type: channel.type, unreadCount: channel.unreadCount})
            return <li key={channel.id}><NavLink to={`/chat/channels/${channel.id}`}
                                                 activeClassName={'active'}><i className={'icons-lock'}/> {channel.name}
            </NavLink></li>
          }
        } else {
          channelArray.push({id: channel.id, type: channel.type, unreadCount: channel.unreadCount})
          return <li key={channel.id}><NavLink to={`/chat/channels/${channel.id}`}
                                               activeClassName={'active'}><i className={'icons-lock'}/> {channel.name}
          </NavLink></li>
        }
      } else {
        return ''
      }
    })

    let staredChannelArray = []
    let List = this.props.starredChannels.map(channel => {
      let channelClassName = ''
      if (channel.authMember !== undefined) {
        if (channel.authMember.muted == 1) {
          channelClassName = 'muted'
        }
      }
      if (channel.public) {
        if (sidebarAppearance == 'Unreads only' && this.props.currentLocationId !== channel.id) {
          if (channel.unreadCount > 0) {
            staredChannelArray.push({id: channel.id, type: channel.type, unreadCount: channel.unreadCount})
            return <li key={channel.id}><NavLink to={`/chat/channels/${channel.id}`}
                                                 activeClassName={'active'}
                                                 className={channelClassName}># {channel.name}</NavLink></li>
          }
        } else {
          staredChannelArray.push({id: channel.id, type: channel.type, unreadCount: channel.unreadCount})
          return <li key={channel.id}><NavLink to={`/chat/channels/${channel.id}`}
                                               activeClassName={'active'}
                                               className={channelClassName}># {channel.name}</NavLink></li>
        }
      } else if (channel.type !== 0) {
        if (sidebarAppearance == 'Unreads only' && this.props.currentLocationId !== channel.id) {
          if (channel.unreadCount > 0) {
            staredChannelArray.push({id: channel.id, type: channel.type, unreadCount: channel.unreadCount})
            return <li key={channel.id}><NavLink to={`/chat/direct-messages/${channel.id}`}
                                                 activeClassName={'active'}><i
              className={'icons-circle'}/> {channel.name}</NavLink></li>
          }
        } else {
          staredChannelArray.push({id: channel.id, type: channel.type, unreadCount: channel.unreadCount})
          return <li key={channel.id}><NavLink to={`/chat/direct-messages/${channel.id}`}
                                               activeClassName={'active'}><i className={'icons-circle'}/> {channel.name}
          </NavLink></li>
        }
      } else {
        if (sidebarAppearance == 'Unreads only' && this.props.currentLocationId !== channel.id) {
          if (channel.unreadCount > 0) {
            staredChannelArray.push({id: channel.id, type: channel.type, unreadCount: channel.unreadCount})
            return <li key={channel.id}><NavLink to={`/chat/channels/${channel.id}`}
                                                 activeClassName={'active'} className={channelClassName}><i
              className={'icons-lock'}/> {channel.name}</NavLink></li>
          }
        } else {
          staredChannelArray.push({id: channel.id, type: channel.type, unreadCount: channel.unreadCount})
          return <li key={channel.id}><NavLink to={`/chat/channels/${channel.id}`}
                                               activeClassName={'active'} className={channelClassName}><i
            className={'icons-lock'}/> {channel.name}</NavLink></li>
        }
      }
    })
    let starredList
    if (this.props.starredChannels.length && List != '') {
      starredList = <ul className={'chat-listing-starred'}>
        <li className={'menu-header'}>
          <a href="javascript:">Starred</a>
        </li>
        {List}
      </ul>
    } else {
      starredList = ''
    }

    let mutedList
    let mutedChannelArray = []
    if (this.props.mutedChannels.length) {
      mutedList = this.props.mutedChannels.map(channel => {
        if (channel.public) {
          if (sidebarAppearance != 'Everything' && this.props.currentLocationId !== channel.id) {
            if (channel.unreadCount > 0) {
              mutedChannelArray.push({id: channel.id, type: channel.type, unreadCount: channel.unreadCount})
              return <li key={channel.id}><NavLink to={`/chat/channels/${channel.id}`}
                                                   activeClassName={'active'}
                                                   className={'muted'}># {channel.name}</NavLink></li>
            }
          } else {
            mutedChannelArray.push({id: channel.id, type: channel.type, unreadCount: channel.unreadCount})
            return <li key={channel.id}><NavLink to={`/chat/channels/${channel.id}`}
                                                 activeClassName={'active'}
                                                 className={'muted'}># {channel.name}</NavLink></li>
          }
        } else {
          if (sidebarAppearance != 'Everything' && this.props.currentLocationId !== channel.id) {
            if (channel.unreadCount > 0) {
              mutedChannelArray.push({id: channel.id, type: channel.type, unreadCount: channel.unreadCount})
              return <li key={channel.id}><NavLink to={`/chat/channels/${channel.id}`}
                                                   activeClassName={'active'} className={'muted'}><i
                className={'icons-lock'}/> {channel.name}</NavLink></li>
            }
          } else {
            mutedChannelArray.push({id: channel.id, type: channel.type, unreadCount: channel.unreadCount})
            return <li key={channel.id}><NavLink to={`/chat/channels/${channel.id}`}
                                                 activeClassName={'active'} className={'muted'}><i
              className={'icons-lock'}/> {channel.name}</NavLink></li>
          }
        }
      })
    } else {
      mutedList = ''
    }

    let separatedChannelArray = []
    let separatedChannelsList = this.props.separatedChannels.map(channel => {
      if (channel.public && channel.authMember.star == 0 && channel.authMember.muted == 0 && channel.type == 0) {
        if (sidebarAppearance != 'Everything' && this.props.currentLocationId !== channel.id) {
          if (channel.unreadCount > 0) {
            separatedChannelArray.push({id: channel.id, type: channel.type, unreadCount: channel.unreadCount})
            return <li key={channel.id}><NavLink to={`/chat/channels/${channel.id}`}
                                                 activeClassName={'active'}># {channel.name}</NavLink></li>
          }
        } else {
          separatedChannelArray.push({id: channel.id, type: channel.type, unreadCount: channel.unreadCount})
          return <li key={channel.id}><NavLink to={`/chat/channels/${channel.id}`}
                                               activeClassName={'active'}># {channel.name}</NavLink></li>
        }
      } else if (channel.authMember.star == 0 && channel.authMember.muted == 0 && channel.type == 0) {
        if (sidebarAppearance != 'Everything' && this.props.currentLocationId !== channel.id) {
          if (channel.unreadCount > 0) {
            separatedChannelArray.push({id: channel.id, type: channel.type, unreadCount: channel.unreadCount})
            return <li key={channel.id}><NavLink to={`/chat/channels/${channel.id}`}
                                                 activeClassName={'active'}><i className={'icons-lock'}/> {channel.name}
            </NavLink></li>
          }
        } else {
          separatedChannelArray.push({id: channel.id, type: channel.type, unreadCount: channel.unreadCount})
          return <li key={channel.id}><NavLink to={`/chat/channels/${channel.id}`}
                                               activeClassName={'active'}><i className={'icons-lock'}/> {channel.name}
          </NavLink></li>
        }
      } else {
        return ''
      }
    })

    let channels = ''
    if (this.props.privateSeparate == 'TRUE') {
      channels = separatedChannelsList
    } else {
      channels = channelsList
    }

    let directMessagesArray = []
    let usersList = <ul className={'chat-listing-direct-messages'}>
      <li className={'menu-header'}><a id={'DirectMessageBtn'} href="javascript:"
                                       onClick={e => this.props.updateSelectedModal('DIRECT_MESSAGE_BROWSE')}>Direct
        Messages</a> <a id={'DirectMessageBtnPlus'} href="javascript:" className={'actions'}
                        onClick={e => this.props.updateSelectedModal('DIRECT_MESSAGE_BROWSE')}><i
        className={'icons-plus'}/></a></li>
      {this.props.directMessages.map(channel => {
        if (channel.authMember.star) {
          return null
        } else if (this.props.authUser.id != channel.userId) {
          if (sidebarAppearance != 'Everything' && this.props.currentLocationId !== channel.id) {
            if (channel.unreadCount > 0) {
              directMessagesArray.push({id: channel.id, type: channel.type, unreadCount: channel.unreadCount})
              return <li key={channel.id}><NavLink to={`/chat/direct-messages/${channel.id}`}
                                                   activeClassName={'active'}><i
                className={'icons-circle'}/>{' '}<span>{channel.name}</span></NavLink></li>
            }
          } else {
            directMessagesArray.push({id: channel.id, type: channel.type, unreadCount: channel.unreadCount})
            return <li key={channel.id}><NavLink to={`/chat/direct-messages/${channel.id}`}
                                                 activeClassName={'active'}><i
              className={'icons-circle'}/>{' '}<span>{channel.name}</span></NavLink></li>
          }
        } else {
          if (sidebarAppearance != 'Everything' && this.props.currentLocationId !== channel.id) {
            if (channel.unreadCount > 0) {
              directMessagesArray.push({id: channel.id, type: channel.type, unreadCount: channel.unreadCount})
              return <li key={channel.id}><NavLink to={`/chat/direct-messages/${channel.id}`}
                                                   activeClassName={'active'}><i
                className={'icons-circle'}/>{' '}<span>{channel.name} (you)</span></NavLink></li>
            }
          } else {
            directMessagesArray.push({id: channel.id, type: channel.type, unreadCount: channel.unreadCount})
            return <li key={channel.id}><NavLink to={`/chat/direct-messages/${channel.id}`}
                                                 activeClassName={'active'}><i
              className={'icons-circle'}/>{' '}<span>{channel.name} (you)</span></NavLink></li>
          }
        }
      })}
    </ul>

    return (
      <div className={'content-main-menu'}>
        {
          this.props.showQuickSwitch == 'TRUE' &&
          <div className={'p-4'}>
            <InputGroup>
              <Input placeholder="Filter Names Below"/>
              <InputGroupAddon addonType="append">
                <Button color={'primary'}><i className={'icons-search'}/></Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
        }
        <ul>
          {
            this.props.showAllUnreads == 'TRUE' &&
            <li key={'unreads'}><NavLink to={'/chat/unreads'} activeClassName={'active'}><i
              className={'icons-list'}/> All Unreads</NavLink></li>
          }
          <li key={'threads'}><NavLink to={'/chat/threads'} activeClassName={'active'}><i className={'icons-chat'}/> All
            Threads</NavLink></li>
        </ul>
        {starredList}
        <ul className={'chat-listing-channels'}>
          <li className={'menu-header'}>
            <a id={'BrowseChannels'} href="javascript:"
               onClick={e => this.props.updateSelectedModal('CHANNEL_BROWSE')}>Channels</a>
            <a id={'ChannelCreateBtn'} href="javascript:"
               className={'actions'}
               onClick={e => this.props.updateSelectedModal('CHANNEL_ADD')}><i
              className={'icons-plus'}/></a>
          </li>
          {channels}
          {mutedList}
        </ul>
        {usersList}
        <span ref={(e) => this.channelList = e}
              onClick={() => this.displayChannels(channelArray, mutedChannelArray, staredChannelArray, separatedChannelArray, directMessagesArray)}></span>
        <UncontrolledTooltip target="BrowseChannels">Browse all channels</UncontrolledTooltip>
        <UncontrolledTooltip target="DirectMessageBtn">Open a direct Message</UncontrolledTooltip>
        <UncontrolledTooltip target="DirectMessageBtnPlus">Open a direct Message</UncontrolledTooltip>
        <UncontrolledTooltip target="ChannelCreateBtn">Create a channel</UncontrolledTooltip>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentLocationId: getCurrentLocationId(state),
    authUser: getAuthUser(state),
    directMessages: sortChannels(getDirectMessages(state)),
    channels: sortChannels(getChatChannels(state)),
    separatedChannels: sortSeparatedChannels(getPrivateChannels(state), getPublicChannels(state)),
    starredChannels: sortStarredChannels(getStarredChannels(state)),
    mutedChannels: sortMutedChannels(getChannels(state)),
    users: sortUsers(getUsers(state)),
    initiallyLoaded: getIsInitiallyLoaded(state),
    privateSeparate: getChatSettingByName(state, 'sidebar_separate_private') || 'TRUE',
    showQuickSwitch: getChatSettingByName(state, 'sidebar_show_quick_switch') || 'FALSE',
    showAllUnreads: getChatSettingByName(state, 'sidebar_show_all_unreads') || 'TRUE',
    sidebarAppearance: getChatSettingByName(state, 'sidebar_appearance') || 'Everything'
  }
}

const sortChannels = (channels) => {
  let updatedList = channels.filter((item) => {
    return item.archivedBy == null
  })
  updatedList.sort((a, b) => {
    let x = a.name.toLowerCase()
    let y = b.name.toLowerCase()
    if (x < y) return -1
    if (x > y) return 1
    return 0
  })
  if (updatedList[0] !== undefined) {
    localStorage.setItem('firstChannel', updatedList[0].id)
  }
  return updatedList
}

const sortStarredChannels = (channels) => {
  let updatedList = channels.filter((item) => {
    if (item.authMember === undefined) {
      return item.archivedBy
    } else {
      return item.archivedBy == null && item.authMember.star == 1
    }
  })
  updatedList.sort((a, b) => {
    let x = a.name.toLowerCase()
    let y = b.name.toLowerCase()
    if (x < y) return -1
    if (x > y) return 1
    return 0
  })
  return updatedList
}

const sortMutedChannels = (channels) => {
  let updatedList = channels.filter((item) => {
    if (item.authMember === undefined) {
      return item.archivedBy
    } else {
      return item.archivedBy == null && item.authMember.muted == 1 && item.authMember.star == 0
    }
  })
  updatedList.sort((a, b) => {
    let x = a.name.toLowerCase()
    let y = b.name.toLowerCase()
    if (x < y) return -1
    if (x > y) return 1
    return 0
  })
  return updatedList
}

const sortSeparatedChannels = (privateChannels, publicChannels) => {
  let p1 = sortChannel(privateChannels)
  let p2 = sortChannel(publicChannels)
  let updatedList = p2.concat(p1)
  return updatedList
}

const sortChannel = (channels) => {
  let updatedList = channels.filter((item) => {
    return item.archivedBy == null
  })
  updatedList.sort((a, b) => {
    let x = a.name.toLowerCase()
    let y = b.name.toLowerCase()
    if (x < y) return -1
    if (x > y) return 1
    return 0
  })
  return updatedList
}

const sortUsers = (users) => {
  let updatedList = users.slice(0)
  updatedList.sort((a, b) => {
    let x = a.name.toLowerCase()
    let y = b.name.toLowerCase()
    if (x < y) return -1
    if (x > y) return 1
    return 0
  })
  return updatedList
}

const mapDispatchToProps = dispatch => {
  return {
    updateSelectedModal: params => dispatch(updateSelectedModal(params)),
    updateDetail: (params) => dispatch(updateDetail(params)),
    markAllReadMessages: (data) => dispatch(markAllReadMessages(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
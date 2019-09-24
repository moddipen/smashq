import { createSelector } from "reselect"
import { denormalize, schema } from "normalizr"
import UserHelper from "../utils/UserHelper"
import createCachedSelector from "re-reselect"

const getStateAlerts = state => state.ui.alerts
const getStatePage = state => state.ui.page
const getStateMenu = state => state.ui.menu
const getStateDetail = state => state.ui.detail
const getStateQuickBar = state => state.ui.quickBar
const getStateIsAuthenticated = state => state.auth.isAuthenticated
const getStateIsEchoSetup = state => state.auth.isEchoSetup
const getStateIsInitiallyLoaded = state => state.auth.initialLoad
const getStateAuthUserId = state => state.auth.userId
const getStateAuthUser = state => state.auth.authUser
const getStateAuthCompanyId = state => state.auth.companyId
const getStateAuthAPIKeys = state => state.auth.apiKeys
const getStateAuthChatSearches = state => state.auth.chatSearches
const getStateAuthCompanyChannels = state => state.auth.companyChannels
const getStatePublicMedia = state => state.auth.media

const getStateChannels = state => state.data.channels
const getStateCompanies = state => state.data.companies
const getStateProfiles = state => state.data.profiles
const getStateUsers = state => state.data.users
const getStateTransactions = state => state.data.wallets.transactions
const getStateChannelMessages = state => state.data.channelMessages
const getStateUnreadChannelMessages = state => state.data.unreadMessages
const getStateThreadChannelMessages = state => state.data.threadMessages
const getStateSearchResults = state => state.data.searchResults
const getStateChatSettings = state => state.data.chatSettings
const getStateMediaDetails = state => state.data.media
const getStateChannelId = state => state.location.payload.id || 0
const getIdToFetch = (state, id) => id
const getChannelToFetch = (channel, id) => channel
const _ = window._

export const getIsEchoSetup = createSelector(
  [getStateIsEchoSetup],
  isEchoSetup => {
    return isEchoSetup || false
  }
)

export const getIsAuthenticated = createSelector(
  [getStateIsAuthenticated],
  isAuthenticated => {
    return isAuthenticated || false
  }
)

export const getAuthUserDetails = createSelector(
  [getStateAuthUser],
  authUser => {
    return authUser || {}
  }
)

export const getAuthUserCoins = createSelector(
  [getStateAuthUser],
  authUser => {
    return authUser.coins || 0
  }
)

export const getIsInitiallyLoaded = createSelector(
  [getStateIsInitiallyLoaded],
  initialLoad => {
    return initialLoad || false
  }
)

export const getCompanyId = createSelector(
  [getStateAuthCompanyId],
  companyId => {
    return companyId || 0
  }
)

export const getApiKeys = createSelector(
  [getStateAuthAPIKeys],
  apiKeys => {
    return apiKeys || {}
  }
)

export const getChatSearches = createSelector(
  [getStateAuthChatSearches],
  chatSearches => {
    return chatSearches || []
  }
)

export const getCompanyChannels = createSelector(
  [getStateAuthCompanyChannels],
  companyChannels => {
    return companyChannels || []
  }
)

export const getPublicMedia = createSelector(
  [getStatePublicMedia],
  media => {
    return media || []
  }
)

export const getDetail = createSelector(
  [getStateDetail],
  detail => {
    return detail || {}
  }
)

export const getPage = createSelector(
  [getStatePage],
  page => {
    return page || {}
  }
)

export const getMenu = createSelector(
  [getStateMenu],
  menu => {
    return menu || {}
  }
)

export const getQuickBar = createSelector(
  [getStateQuickBar],
  quickBar => {
    return quickBar || {}
  }
)

export const getAlerts = createSelector(
  [getStateAlerts],
  alerts => {
    return alerts || []
  }
)

export const getDirectMessages = createSelector(
  [getStateChannels, getStateAuthCompanyId],
  (channels, companyId) => {
    return _.filter(channels, channel => {
      return (
        channel.companyId === companyId &&
        (channel.type === 1 || channel.type === 2)
      )
    })
  }
)

export const getStarredChannels = createSelector(
  [getStateChannels, getStateAuthCompanyId],
  (channels, companyId) => {
    return _.filter(channels, channel => {
      return (
        channel.companyId === companyId &&
        channel.authMember &&
        channel.authMember.star
      )
    })
  }
)

export const getChannels = createSelector(
  [getStateChannels, getStateAuthCompanyId],
  (channels, companyId) => {
    return _.filter(channels, channel => {
      return (
        channel.companyId === companyId &&
        channel.type === 0 &&
        channel.authMember.id !== undefined
      )
    })
  }
)

export const getChatChannels = createSelector(
  [getStateChannels, getStateAuthCompanyId, getStateChannelId],
  (channels, companyId, id) => {
    return _.filter(channels, channel => {
      return (
        channel.companyId === companyId &&
        channel.type === 0 &&
        (channel.authMember.id !== undefined || channel.id === id)
      )
    })
  }
)

export const getCurrentLocationId = createSelector(
  [getStateChannelId],
  id => {
    return id || null
  }
)

export const getChannelMessages = createSelector(
  [getStateChannelMessages, getStateChannelId],
  (channelMessages, id) => {
    return _.filter(channelMessages, message => {
      return message.channelId === id
    })
  }
)

export const getUnreadChannelMessages = createSelector(
  [getStateUnreadChannelMessages],
  channelMessages => {
    return channelMessages
  }
)

export const getThreadChannelMessages = createSelector(
  [getStateThreadChannelMessages],
  channelMessages => {
    return channelMessages
  }
)

export const getSreachResults = createSelector(
  [getStateSearchResults],
  searchResults => {
    return searchResults
  }
)

export const getMediaDetails = createSelector(
  [getStateMediaDetails, getIdToFetch],
  (media, id) => {
    return _.get(media, id, null)
  }
)

export const getChannelById = createSelector(
  [getStateChannels, getIdToFetch],
  (channels, id) => {
    return _.get(channels, id, null)
  }
)

export const getTransactions = createSelector(
  [getStateTransactions],
  transactions => {
    if (Object.values(transactions).length) {
      return Object.values(transactions)
    } else {
      return []
    }
  }
)

export const getSearchUsers = createSelector(
  [getStateUsers],
  users => {
    if (Object.values(users).length) {
      return Object.values(users)
    } else {
      return []
    }
  }
)

export const getUserProfileById = createSelector(
  [getStateUsers, getIdToFetch],
  (users, id) => {
    let user = _.filter(users, user => {
      return user.id === id
    })
    if (user.length) {
      return user[0]
    } else {
      return {}
    }
  }
)

export const getUsers = createSelector(
  [getStateCompanies, getStateUsers, getStateProfiles, getStateAuthCompanyId],
  (companies, users, profiles, companyId) => {
    const company = companies[companyId]
    if (!company) {
      return []
    }
    let companyUsers = denormalize(
      company.users,
      [
        new schema.Entity("users", {
          profiles: [new schema.Entity("profiles")]
        })
      ],
      {
        profiles,
        users
      }
    )
    return companyUsers.map(user => {
      const profile = _.find(user.profiles, profile => {
        return profile.companyId === companyId
      })
      user.name = UserHelper.getNameFromProfile(user, profile)
      return _.omit(user, ["profiles"])
    })
  }
)

export const getAuthUser = createSelector(
  [getStateUsers, getStateProfiles, getStateAuthUserId, getStateAuthCompanyId],
  (users, profiles, userId, companyId) => {
    return getUser(users, profiles, userId, companyId)
  }
)

export const getUserById = createSelector(
  [getStateUsers, getStateProfiles, getIdToFetch, getStateAuthCompanyId],
  (users, profiles, userId, companyId) => {
    return getUser(users, profiles, userId, companyId)
  }
)

function getUser(users, profiles, userId, companyId) {
  let user = _.get(users, userId, null)
  if (user) {
    user = denormalize(
      userId,
      new schema.Entity("users", {
        profiles: [new schema.Entity("profiles")]
      }),
      {
        profiles,
        users
      }
    )
    const profile = _.find(user.profiles, profile => {
      return profile.companyId === companyId
    })
    user.name = UserHelper.getNameFromProfile(user, profile)
    user = _.omit(user, ["profiles"])
  }
  return user
}

export const getAuthUserId = createSelector(
  [getStateAuthUserId],
  id => {
    return id
  }
)

export const getPrivateChannels = createSelector(
  [getStateChannels, getStateAuthCompanyId],
  (channels, companyId) => {
    return _.filter(channels, channel => {
      return channel.companyId === companyId && channel.public == 0
    })
  }
)

export const getPublicChannels = createSelector(
  [getStateChannels, getStateAuthCompanyId],
  (channels, companyId) => {
    return _.filter(channels, channel => {
      return channel.companyId === companyId && channel.public == 1
    })
  }
)

export const getChatSettings = createSelector(
  [getStateUsers, getStateAuthUserId],
  (users, userId) => {
    return _.filter(users, user => {
      return user.id === userId
    })
  }
)

export const getMediaById = createSelector(
  [getChannelToFetch, getIdToFetch],
  (channel, id) => {
    return _.filter(channel.messages, media => {
      return media.id === id
    })
  }
)

export const getChannelMessageById = createSelector(
  [getStateChannelMessages, getIdToFetch],
  (channelMessages, id) => {
    return _.get(channelMessages, id, null)
  }
)

export const getAuthCompany = createSelector(
  [getStateCompanies, getStateAuthCompanyId],
  (companies, id) => {
    return _.get(companies, id, null)
  }
)

export const getChatSettingByName = createCachedSelector(
  [getStateChatSettings, getIdToFetch],
  (settings, name) => {
    let result = _.filter(settings, setting => {
      return setting.name === name
    })
    if (result.length) {
      return result[0].value
    } else {
      return null
    }
  }
)((settings, name) => name)

export const getNotificationsSettingsChannels = createSelector(
  [getStateChannels],
  channels => {
    return _.filter(channels, channel => {
      return (
        channel.authMember.muted !== 0 ||
        channel.authMember.ignore !== 0 ||
        channel.authMember.desktopNotifications !== 0 ||
        channel.authMember.mobileNotifications !== 0
      )
    })
  }
)

import { combineReducers } from "redux";

import auth from "../modules/auth/store/reducer";
import modal from "../modules/web/store/reducers/modal";
import alerts from "../modules/web/store/reducers/alerts";
import page from "../modules/web/store/reducers/page";
import menu from "../modules/web/store/reducers/menu";
import quickBar from "../modules/web/store/reducers/quickBar";
import detail from "../modules/web/store/reducers/detail";

import channels from "../modules/channels/store/reducer";
import companies from "../modules/companies/store/reducer";
import profiles from "../modules/profiles/store/reducer";
import users from "../modules/users/store/reducer";
import channelMessages from "../modules/channel-messages/store/reducer";
import unreadMessages from "../modules/unread-messages/store/reducer";
import threadMessages from "../modules/thread-messages/store/reducer";
import searchResults from "../modules/chat-search/store/reducer";
import media from "../modules/media/store/reducer";
import chatSettings from "../modules/settings/store/reducer";

export default {
  auth,
  data: combineReducers({
    channels,
    companies,
    profiles,
    users,
    channelMessages,
    unreadMessages,
    threadMessages,
    searchResults,
    media,
    chatSettings
  }),
  ui: combineReducers({
    modal,
    alerts,
    page,
    menu,
    quickBar,
    detail
  })
};

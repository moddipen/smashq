import { combineReducers } from "redux";

import auth from "../modules/auth/store/reducer";
import modal from "../modules/web/store/reducers/modal";
import alerts from "../modules/web/store/reducers/alerts";
import page from "../modules/web/store/reducers/page";
import menu from "../modules/web/store/reducers/menu";
import quickBar from "../modules/web/store/reducers/quickBar";
import detail from "../modules/web/store/reducers/detail";

import profiles from "../modules/profiles/store/reducer";
import users from "../modules/users/store/reducer";

export default {
  auth,
  data: combineReducers({
    profiles,
    users
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

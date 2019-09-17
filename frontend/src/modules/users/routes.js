// import lib
import Loadable from "react-loadable";
// import components
import LoadingComponent from "../../common/loader/index";
import UserProfile from "../users/views/user-profile/index";
import { getuserProfile } from "./store/actions";

const pages = {
  USER_LISTS: {
    path: "/user-lists",
    component: Loadable({
      loader: () => import("./views/user-lists/index"),
      loading: LoadingComponent
    })
  },
  USER_PROFILE: {
    path: "/user-profile/:id",
    component: { UserProfile },
    component: Loadable({
      loader: () => import("./views/user-profile/index"),
      loading: LoadingComponent
    }),
    thunk: async (dispatch, getState) => {
      const state = getState();
      dispatch(getuserProfile(state.location.payload.id));
    }
  }
};

export default pages;

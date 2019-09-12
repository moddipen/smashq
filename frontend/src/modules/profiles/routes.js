// import lib
import Loadable from "react-loadable";
// import components
import LoadingComponent from "../../common/loader/index";

const pages = {
  EDIT_PROFILE: {
    path: "/edit-profile",
    component: Loadable({
      loader: () => import("./views/edit-profile/index"),
      loading: LoadingComponent
    })
  },
  SOCIAL_MEDIA: {
    path: "/social-media",
    component: Loadable({
      loader: () => import("./views/social-media/index"),
      loading: LoadingComponent
    })
  }
};

export default pages;

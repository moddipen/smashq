// import lib
import Loadable from "react-loadable";
// import components
import LoadingComponent from "../../common/loader/index";

const pages = {
  USER_LISTS: {
    path: "/user-lists",
    component: Loadable({
      loader: () => import("./views/user-lists/index"),
      loading: LoadingComponent
    })
  }
};

export default pages;

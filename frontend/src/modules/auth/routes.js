// import lib
import Loadable from "react-loadable";
// import components
import LoadingComponent from "../../common/loader/index";

const pages = {
  LOGIN: {
    path: "/login",
    component: Loadable({
      loader: () => import("./views/login/index"),
      loading: LoadingComponent
    })
  },
  FORGOT_PASSWORD: {
    path: "/forgot-password",
    component: Loadable({
      loader: () => import("./views/forgot-password/index"),
      loading: LoadingComponent
    })
  },
  RESET_PASSWORD: {
    path: "/reset-password/:token",
    component: Loadable({
      loader: () => import("./views/reset-password/index"),
      loading: LoadingComponent
    })
  }
};

export default pages;

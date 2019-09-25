// import lib
import Loadable from "react-loadable"
// import components
import LoadingComponent from "../../common/loader/index"
import { getCar } from "../auth/store/actions"

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
  VERIFY_EMAIL: {
    path: "/verify-code",
    component: Loadable({
      loader: () => import("./views/verify-code/index"),
      loading: LoadingComponent
    })
  },
  RESET_PASSWORD: {
    path: "/reset-password/:token",
    component: Loadable({
      loader: () => import("./views/reset-password/index"),
      loading: LoadingComponent
    })
  },
  VERIFY_ACCOUNT: {
    path: "/verify-account",
    component: Loadable({
      loader: () => import("./views/verify-account/index"),
      loading: LoadingComponent
    })
  }
}

export default pages

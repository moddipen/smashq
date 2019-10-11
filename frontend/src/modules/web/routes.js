// import lib
import Loadable from "react-loadable"
// import components
import LoadingComponent from "../../common/loader/index"
import { updateMenu } from "./store/actions"
import { getUserPosts } from "../posts/store/actions"
import { initialSearch } from "../users/store/actions"

const pages = {
  HOME: {
    path: "/",
    auth: true,
    component: Loadable({
      loader: () => import("../posts/views/stories"),
      loading: LoadingComponent
    }),
    thunk: async dispatch => {
      dispatch(updateMenu({}))
      dispatch(getUserPosts())
      dispatch(initialSearch())
    }
  }
}

export default pages

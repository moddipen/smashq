// import lib
import Loadable from "react-loadable";
// import components
import LoadingComponent from "../../common/loader/index";
import { updateMenu } from "./store/actions";

const pages = {
  HOME: {
    path: "/",
    auth: true,
    component: Loadable({
      loader: () => import("./views/home/index"),
      loading: LoadingComponent
    }),
    thunk: async dispatch => {
      dispatch(updateMenu({}));
    }
  }
};

export default pages;

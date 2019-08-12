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
  }
};

export default pages;

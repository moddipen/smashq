// import lib
import Loadable from "react-loadable";
// import components
import LoadingComponent from "../../common/loader/index";

const pages = {
  YOUR_COIN: {
    path: "/your-coin",
    component: Loadable({
      loader: () => import("./views/your-coin/index"),
      loading: LoadingComponent
    })
  }
};

export default pages;

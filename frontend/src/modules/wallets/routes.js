// import lib
import Loadable from "react-loadable";
// import components
import LoadingComponent from "../../common/loader/index";
import { getTransactions } from "./store/actions";

const pages = {
  YOUR_COIN: {
    path: "/your-coin",
    component: Loadable({
      loader: () => import("./views/your-coin/index"),
      loading: LoadingComponent
    })
  },
  TRANSACTIONS: {
    path: "/transactions",
    component: Loadable({
      loader: () => import("./views/transactions/index"),
      loading: LoadingComponent
    }),
    thunk: async (dispatch, getState) => {
      dispatch(getTransactions());
    }
  }
};

export default pages;

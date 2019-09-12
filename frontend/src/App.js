import React from "react";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import store from "./store/index";
import Container from "./common/container/index";
import NavigationComponent from "./common/navigation/index";
import PageComponent from "./common/page/index";
import ModalComponent from "./common/modal/index";
import QuickBarComponent from "./common/quick-bar/index";
import AlertComponent from "./common/alert/index";
import HeaderComponent from "./common/header/index";
import FooterComponent from "./common/footer/index";
import "font-awesome/css/font-awesome.min.css";

function App() {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <HeaderComponent />
        <Container>
          <NavigationComponent key={0} />
          <PageComponent key={2} />
          {/* <QuickBarComponent key={4} /> */}
        </Container>
        <FooterComponent />
        <ModalComponent />
        <AlertComponent />
      </CookiesProvider>
    </Provider>
  );
}

export default App;

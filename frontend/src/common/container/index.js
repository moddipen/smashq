// import libs
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import {
  getDetail,
  getIsAuthenticated,
  getIsEchoSetup,
  getMenu,
  getPage
} from "../../selectors/index";
import { userLoad } from "../../modules/users/store/actions";
import { eventFired } from "../../modules/web/store/actions";
import { getAuthUser } from "../../selectors";
import pages from "../../routes/routes";
// import Echo from "laravel-echo";
import { authEchoSetup } from "../../modules/auth/store/actions";

class Container extends React.PureComponent {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    detail: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
    eventFired: PropTypes.func.isRequired,
    menu: PropTypes.object.isRequired,
    authEchoSetup: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      fetchSent: false,
      echoSetup: false
    };
    this.fetchUser = this.fetchUser.bind(this);
  }

  componentDidMount() {
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      this.fetchUser();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isAuthenticated && !this.state.fetchSent) {
      this.fetchUser();
    }
    if (
      this.props.isAuthenticated &&
      this.state.fetchSent &&
      !this.state.echoSetup &&
      this.props.user &&
      this.props.user.id
    ) {
      this.setupEcho(this.props.user.id);
    }
    if (prevProps.isAuthenticated && !this.props.isAuthenticated) {
      if (window.Echo) {
        window.Echo.disconnect();
      }
      window.Echo = null;
      this.setState({
        echoSetup: false
      });
      this.props.authEchoSetup(false);
    }
  }

  fetchUser() {
    this.props.loadUser();
    this.setState({
      fetchSent: true
    });
  }

  // setupEcho(id) {
  //   window.Echo = new Echo({
  //     broadcaster: "socket.io",
  //     host: window.app.node_url
  //   });
  //   const channel = window.Echo.private(`user.${id}`);
  //   window.app.events.map(event => {
  //     channel.listen("." + event, payload => {
  //       // this.props.eventFired(Transformer.fetch(payload))
  //     });
  //   });
  //   this.setState({
  //     echoSetup: true
  //   });
  //   this.props.authEchoSetup(true);
  // }

  render() {
    const page = pages[this.props.page.name];
    const classes = classNames("content-container", {
      "full-screen": page && page.fullScreen ? page.fullScreen : false,
      "not-authenticated": !this.props.isAuthenticated,
      "show-details": this.props.detail && this.props.detail.name,
      "show-chat":
        this.props.menu &&
        this.props.menu.name &&
        this.props.menu.name === "chat"
    });
    return <div className={classes}>{this.props.children}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isEchoSetup: getIsEchoSetup(state),
    isAuthenticated: getIsAuthenticated(state),
    detail: getDetail(state),
    page: getPage(state),
    menu: getMenu(state),
    user: getAuthUser(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authEchoSetup: isSetup => dispatch(authEchoSetup(isSetup)),
    loadUser: () => dispatch(userLoad()),
    eventFired: payload => dispatch(eventFired(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

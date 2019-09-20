// import libs
import React from "react";
import { Validator } from "ree-validate";
// import components
import Form from "./components/Form";

// initialize component
class Page extends React.PureComponent {
  // set name of the component
  static displayName = "PaymentFormPage";

  constructor(props) {
    super(props);
    this.validator = new Validator({
      cvv: "required|numeric|min:3|max:4",
      cardnumber: "required|numeric|min:16|max:16",
      expiremonth: "required",
      expireyear: "required"
    });
    // set the state of the app
    this.state = {
      credentials: {
        cvv: "",
        cardnumber: "",
        expiremonth: "01",
        expireyear: "2019"
      },
      months: [
        { id: "01", name: "Jan" },
        { id: "02", name: "Feb" },
        { id: "03", name: "Mar" },
        { id: "04", name: "Apr" },
        { id: "05", name: "May" },
        { id: "06", name: "Jun" },
        { id: "07", name: "Jul" },
        { id: "08", name: "Aug" },
        { id: "09", name: "Sep" },
        { id: "10", name: "Oct" },
        { id: "11", name: "Nov" },
        { id: "12", name: "Dec" }
      ],
      years: [],
      errors: this.validator.errors
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let date = new Date();
    let year = date.getFullYear();
    let endyear = parseFloat(year) + 20;
    let result = this.range(year, endyear);
    this.setState({ years: result });
  }

  //for get all integers bet two numbers
  range(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  }

  // event to handle login input change
  handleChange(name, value) {
    const { errors } = this.validator;
    this.setState({
      credentials: { ...this.state.credentials, [name]: value }
    });
    errors.remove(name);
    this.validator.validate(name, value).then(() => {
      this.setState({ errors });
    });
  }

  // event to handle profile form submit
  handleSubmit(e) {
    e.preventDefault();

    const { credentials } = this.state;
    const { errors } = this.validator;
    this.validator.validateAll(credentials).then(success => {
      if (success) {
        this.submit(credentials);
      } else {
        this.setState({ errors });
      }
    });
  }

  submit(credentials) {
    let obj = {
      amount: this.props.coins,
      coins: this.props.coins,
      card: this.state.credentials.cardnumber,
      month: this.state.credentials.expiremonth,
      year: this.state.credentials.expireyear,
      cvv: this.state.credentials.cvv
    };

    this.props.updateCoins(obj);
    let obj1 = {
      coins: ""
    };
    this.setState({ credentials: obj1 });
  }

  // render component
  render() {
    // check if user is authenticated then redirect him to home page
    const props = {
      authUser: this.props.authUser,
      errors: this.state.errors,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
      profile: this.state.credentials,
      months: this.state.months,
      years: this.state.years
    };

    return <Form {...props} />;
  }
}

export default Page;

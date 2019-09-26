// import libs
import React from "react"
import { Validator } from "ree-validate"
import Form from "./components/Form"

// initialize component
class Page extends React.Component {
  // set name of the component
  static displayName = "UserListsForm"

  constructor(props) {
    super(props)
    this.validator = new Validator({
      cvv: "required|numeric|min:3|max:4",
      cardnumber: "required|numeric|min:16|max:16",
      expiremonth: "required",
      expireyear: "required"
    })
    // set the state of the app
    this.state = {
      modal: false,
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
      errors: this.validator.errors,
      followId: ""
    }
    this.toggle = this.toggle.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    let date = new Date()
    let year = date.getFullYear()
    let endyear = parseFloat(year) + 20
    let result = this.range(year, endyear)
    this.setState({ years: result })
  }

  //for get all integers bet two numbers
  range(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx)
  }

  // event to handle login input change
  handleChange(name, value) {
    const { errors } = this.validator
    this.setState({
      credentials: { ...this.state.credentials, [name]: value }
    })
    errors.remove(name)
    this.validator.validate(name, value).then(() => {
      this.setState({ errors })
    })
  }

  // event to handle profile form submit
  handleSubmit(e) {
    e.preventDefault()
    const { credentials } = this.state
    const { errors } = this.validator
    this.validator.validateAll(credentials).then(success => {
      if (success) {
        this.submit(credentials)
      } else {
        this.setState({ errors })
      }
    })
  }

  submit(credentials) {
    let obj = {
      card: this.state.credentials.cardnumber,
      month: this.state.credentials.expiremonth,
      year: this.state.credentials.expireyear,
      cvv: this.state.credentials.cvv,
      user_id: this.state.followId
    }
    console.log("obj", obj)
    this.props.followStatus(obj)
    let obj1 = {
      cvv: "",
      cardnumber: "",
      expiremonth: "01",
      expireyear: "2019",
      user_id: ""
    }
    this.setState({ credentials: obj1 })
  }

  //follow
  followStatus = (id, status) => {
    this.setState({ followId: id })
    if (status === "follow") {
      this.toggle()
    }

    // let status = {
    //   user_id: id
    // }
    // this.props.followStatus(status)
  }

  //modal toggle
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  // render component
  render() {
    const props = {
      users: this.props.users,
      followStatus: this.followStatus,
      modal: this.state.modal,
      toggle: this.toggle,
      profile: this.state.credentials,
      errors: this.state.errors,
      months: this.state.months,
      years: this.state.years,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit
    }
    return <Form {...props} />
  }
}

export default Page

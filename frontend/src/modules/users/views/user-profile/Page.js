// import libs
import React from "react"
// import components
import Form from "./components/Form"
import "../../../../assets/css/profileModal.css"
import { back } from "redux-first-router"

import { FilePond, registerPlugin } from "react-filepond"
import FilePondPluginFileEncode from "filepond-plugin-file-encode"
import "filepond/dist/filepond.min.css"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css"
registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType
)

// initialize component
class Page extends React.Component {
  // set name of the component
  static displayName = "UserProfileForm"
  constructor(props) {
    super(props)
    this.pond = ""
    // set the state of the app
    this.state = {
      tabs: {
        tab1: true,
        tab2: false
      },
      modal: false,
      modal1: false,
      modal2: false,
      followId: 0,
      postModal: false,
      files: []
      // profileUser: this.props.user,
      // metatitle: this.getmetatitle(this.props.user),
      // metadesc: this.getmetadesc(this.props.user)
    }

    this.handleBack = this.handleBack.bind(this)
    this.toggle2 = this.toggle2.bind(this)
    this.toggle1 = this.toggle1.bind(this)
    this.toggle = this.toggle.bind(this)
    this.postToggle = this.postToggle.bind(this)
  }

  //get meta title
  getmetatitle(users) {
    let metatitle = ""
    if (users.motto) {
      metatitle = users.username + " | " + users.motto
    } else {
      metatitle = users.username
    }
    return metatitle
  }

  //get meta desc
  getmetadesc(users) {
    let metadesc = ""
    if (users.description) {
      metadesc = users.username + " on SmashQ | " + users.description
    } else {
      metadesc = users.username + " on SmashQ"
    }
    return metadesc
  }

  //redirect back
  handleBack = () => {
    back()
  }

  //modal toggle
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  //profil modal toggle
  toggle1() {
    this.setState(prevState => ({
      modal1: !prevState.modal1
    }))
  }

  //show tab
  tabShow = id => {
    let tab = {}
    if (id == 1) {
      tab = {
        tab1: true,
        tab2: false
      }
    } else {
      tab = {
        tab1: false,
        tab2: true
      }
    }
    this.setState({ tabs: tab })
  }

  //follow
  followStatus = (id, status, subOnFollow) => {
    this.setState({ followId: id })
    if (status === "follow") {
      if (subOnFollow === "1" || subOnFollow === 1) {
        this.toggle2()
      } else {
        let obj = {
          user_id: id
        }
        this.props.followStatus(obj)
      }
    } else {
      let obj = {
        user_id: id
      }
      this.props.followStatus(obj)
    }
  }

  //modal toggle
  toggle2() {
    this.setState(prevState => ({
      modal2: !prevState.modal2
    }))
  }

  //post modal
  postToggle() {
    this.setState(prevState => ({
      postModal: !prevState.postModal
    }))
  }

  componentWillUnmount() {
    this.setState(prevState => ({
      modal2: !prevState.modal2
    }))
  }

  handleSubmit = e => {
    e.preventDefault()
    let fileinput = e.target.elements.namedItem("filepond")
    let myArray = []
    let posts = []
    if (fileinput.length >= 2) {
      myArray = Array.from(fileinput)
      myArray.map(file => {
        let dval = JSON.parse(file.defaultValue)
        let dval2 = dval.data
        let dval3 = dval.type
        posts.push({ val: dval2, type: dval3 })
      })
    } else {
      myArray = fileinput.value
      let dval = JSON.parse(myArray)
      let dval2 = dval.data
      let dval3 = dval.type
      posts.push({ val: dval2, type: dval3 })
    }
    this.submit(posts)
  }

  //for submit posts
  submit = posts => {
    this.props.uploadPosts(posts)
  }

  handleInit = () => {
    //console.log("FilePond instance has initialised", this.pond)
  }

  // render component
  render() {
    let profileUser = this.props.user.filter(
      word => word.id === this.props.params.id
    )
    console.log("user render", profileUser[0])
    console.log("user render", profileUser[0].posts)

    const props = {
      users: profileUser[0],
      posts: profileUser[0].posts,
      tabs: this.state.tabs,
      tabShow: this.tabShow,
      toggle: this.toggle,
      toggle1: this.toggle1,
      postToggle: this.postToggle,
      modal: this.state.modal,
      modal1: this.state.modal1,
      handleBack: this.handleBack,
      followStatus: this.followStatus,
      metatitle: this.getmetatitle(profileUser[0]),
      metadesc: this.getmetadesc(profileUser[0]),
      modal2: this.state.modal2,
      postModal: this.state.postModal,
      toggle2: this.toggle2,
      followId: this.state.followId,
      handleInit: this.handleInit,
      pond: this.pond,
      handleSubmit: this.handleSubmit
    }
    return <Form {...props} />
  }
}

export default Page

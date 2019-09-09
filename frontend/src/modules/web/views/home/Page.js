import React from 'react'
import Header from '../../../../common/header/index'

class Page extends React.Component {
  static displayName = 'HomePage'
  static propTypes = {}

  constructor (props) {
    super(props)

    this.state = {
      //
    }
  }

  render () {
    return (
      <Header text="Home Page"/>
    )
  }
}

export default Page

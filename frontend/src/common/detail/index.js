import React from 'react'
import { connect } from 'react-redux'
import { getDetail } from '../../selectors/index'
import pages from '../../routes/details'
import PropTypes from 'prop-types'

class DetailComponent extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
  }

  render () {
    const Page = pages[this.props.page.name]
    if (Page && Page.thunk) {
      Page.thunk(dispatch, this.props.page)
    }
    const pageOutput = Page && Page.component ? <Page.component {...this.props} params={this.props.page.params}/> : null
    return (
      <div className="content-details">
        {pageOutput}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    page: getDetail(state)
  }
}

export default connect(mapStateToProps)(DetailComponent)
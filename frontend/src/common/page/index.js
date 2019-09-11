import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { getPage } from '../../selectors/index'
import pages from '../../routes/routes'

class PageComponent extends React.Component {

    constructor (props) {
        super(props)
    }
  
    render () {
        const Page = pages[this.props.page.name]
        const pageOutput = Page ? <Page.component {...this.props} params={this.props.page.params}/> : null
        const classes = classNames('content-main',
        {
            'd-flex': Page ? !!Page.chatMenu : false
        })
        return (
            <div className={classes}>
                {pageOutput}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    page: getPage(state)
  }
}
export default connect(mapStateToProps)(PageComponent)
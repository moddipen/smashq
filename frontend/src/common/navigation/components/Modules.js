// import libs
import React from 'react'
import PropTypes from 'prop-types'
import Chat from '../pages/Chat'

const propTypes = {
  selectedMenu: PropTypes.object
}

const renderItems = (selectedMenu) => {
  if (selectedMenu) {
    switch (selectedMenu.name) {
      case 'chat':
        return <Chat/>
    }
  }
}

function render ({selectedMenu}) {
  return (
    <ul className="modules">
      {renderItems(selectedMenu)}
    </ul>
  )
}

render.propTypes = propTypes

export default render

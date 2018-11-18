import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListBooks extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
  }

  render() {
    const { contacts } = this.props

    return (
      <div className='list-books'>
        {contacts.map((contact) => (
          <p>Oi</p>
        ))}
      </div>
    );
  }
}

export default ListBooks
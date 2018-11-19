// Basic
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Own UI
import ListBook from '../../components/ListBooks/ListBooks';

// Class
class CurrentlyReadingPanel extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  render() {
    const filteredBooks = this.props.books.filter((b) => (
      b.shelf === 'currentlyReading'
    ))

    return (
      <div style={{ margin: '10px' }}>
        <h3>Current Reading</h3>
        <ListBook books={filteredBooks} onChangeShelfBook={this.props.onChangeShelfBook} />
      </div>
    );
  }
}

export default CurrentlyReadingPanel

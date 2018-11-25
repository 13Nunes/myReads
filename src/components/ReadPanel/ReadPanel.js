// Basic
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Own UI
import ListBook from '../../components/ListBooks/ListBooks';

// Class
class ReadPanel extends Component {
  // @properties
  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  render() {
    const filteredBooks = this.props.books.filter((b) => (
      b.shelf === 'read'
    ))

    return (
      <div style={{ margin: '10px' }}>
        <h3>Read</h3>
        <ListBook books={filteredBooks} onChangeShelfBook={this.props.onChangeShelfBook} />
      </div>
    );
  }
}

export default ReadPanel
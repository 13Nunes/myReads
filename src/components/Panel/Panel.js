// Basic
import React from 'react';
import PropTypes from 'prop-types';

// Own UI
import ListBook from '../../components/ListBooks/ListBooks';

const Panel = props => {
    const filteredBooks = props.books.filter((b) => (
        b.shelf === props.filter
    ))

    return <div style={{ margin: '10px' }}>
        <h3>{props.title}</h3>
        <ListBook books={filteredBooks} onChangeShelfBook={props.onChangeShelfBook} />
    </div>;
};

Panel.propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
}

export default Panel
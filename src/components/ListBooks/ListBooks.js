// Basic
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// External UI
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Assets
import './ListBooks.css';

// Components
import OptionMenu from '../../components/OptionMenu/OptionMenu';

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  render() {
    const { books } = this.props

    return (
      <Grid className="list-books" container spacing={24} style={{
        margin: 0,
        width: '100%',
      }}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} xl={3} key={book.id}>
            <Card className="bookCard">
              <div className="image">
                <img src={book.imageLinks.smallThumbnail} alt={book.title} />
              </div>
              <div className="content">
                <div className="details">
                  <Typography variant="h2" gutterBottom>
                    {book.title}
                  </Typography>
                  <Typography variant="h3" gutterBottom>
                    {book.subtitle}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Author(s): {book.authors.join(', ')}
                  </Typography>
                </div>
                <div className="actions">
                  <OptionMenu baggage={book} onChangeShelfBook={this.props.onChangeShelfBook}></OptionMenu>
                </div>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default ListBooks
// Basic
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// External UI
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Book';

// Assets
import './ListBooks.css';
import ImageNotAvailable from '../../assets/images/not-available.jpg'

// Components
import OptionMenu from '../../components/OptionMenu/OptionMenu';

class ListBooks extends Component {
  // @properties
  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  // @methods
  friendlyShelfLabel(shelfStatus) {
    switch (shelfStatus) {
      case 'currentlyReading': return 'Currently Reading';
      case 'wantToRead': return ' Want to read';
      case 'read': return 'Read';
      default: return 'None';
    }
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
                <img src={book.imageLinks ? book.imageLinks.smallThumbnail : ImageNotAvailable} alt={book.title} />
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
                    Author(s): {book.authors ? book.authors.join(', ') : 'Unknown author'}
                  </Typography>
                </div>
                <div className="actions">
                  <Chip color="secondary" icon={<FaceIcon />} variant="outlined" label={this.friendlyShelfLabel(book.shelf)} />
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
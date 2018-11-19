// Basic
import React, { Component } from 'react'

// External UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

// Assets
import './Home.css';

// API
import * as BooksAPI from '../../services/BooksAPI';

// Components
import CurrentlyReadingPanel from '../../components/CurrentlyReadingPanel/CurrentlyReadingPanel';
import WantToReadPanel from '../../components/WantToReadPanel/WantToReadPanel';
import ReadPanel from '../../components/ReadPanel/ReadPanel';
import Banner from '../../components/Banner/Banner';
import ContainerElastic from '../../components/ContainerElastic/ContainerElastic';

class Home extends Component {
  state = {
    books: [],
    tabSelected: 0,
  }

  componentDidMount() {
    // Populate application on init
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  navigateTo = (target) => {
    this.props.history.push(target)
  }

  handleTabChange = (event, tabSelected) => {
    // Set current tab selected
    this.setState({ tabSelected });
  };

  changeShelfBook = (bookTochange, shelf) => {
    // Init
    let isNewBookOnShelf = false;

    // Update book on API
    BooksAPI.update(bookTochange, shelf).then((data) => {
      // Check book on shelf and prepare book data
      const books = this.state.books.map((book) => {
        if (book.id === bookTochange.id) {
          book.shelf = shelf;
          isNewBookOnShelf = true;
        }
        return book;
      });

      // If is new on shelf (Comming from search)
      if (isNewBookOnShelf === false) {
        bookTochange.shelf = shelf;
        books.push(bookTochange);
      }

      // Update book data
      this.setState({
        books
      });
    })
  }

  render() {
    const { books, tabSelected } = this.state;

    return (
      <div className="home">
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              My Reads
            </Typography>
            <div className="navigation">
              <IconButton color="inherit" aria-label="Search" onClick={() => this.navigateTo('/search')}>
                <Icon>search_icon</Icon>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Banner /><br />
        <ContainerElastic>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Paper elevation={0}>
                <Tabs value={tabSelected} onChange={this.handleTabChange}>
                  <Tab label="Currently reading" />
                  <Tab label="Want to read" />
                  <Tab label="Read" />
                </Tabs>
                {tabSelected === 0 && <CurrentlyReadingPanel books={books} onChangeShelfBook={this.changeShelfBook} />}
                {tabSelected === 1 && <WantToReadPanel books={books} onChangeShelfBook={this.changeShelfBook} />}
                {tabSelected === 2 && <ReadPanel books={books} onChangeShelfBook={this.changeShelfBook} />}
              </Paper>
            </Grid>
          </Grid>
        </ContainerElastic>
      </div>
    );
  }
}

export default Home;

// Basic
import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';

// Views
import Home from '../Home/Home';
import Search from '../Search/Search';

// API
import * as BooksAPI from '../../services/BooksAPI';

// UI
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';

// UI :: Set pallete
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#135D90',
    },
    secondary: lightBlue,
  },
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  // @states
  state = {
    books: [],
    query: '',
    searchResults: [],
    isLoadingSearch: false
  }

  // @listening
  componentDidMount() {
    // Populate application on init
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  // @methods
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

  searchTerm = (searchTerm) => {
    // Reset
    this.setState({
      searchResults: [],
      query: searchTerm,
      isLoadingSearch: false
    });

    // Clear debouncing
    clearTimeout(this.debouncing);

    // Check term
    if (searchTerm !== '') {
      // Show loading
      this.setState({
        isLoadingSearch: true
      });

      // Request search
      this.debouncing = setTimeout(() => {
        BooksAPI.search(this.state.query).then((booksFound) => {
          // Hide loading
          this.setState({
            isLoadingSearch: false
          });

          // If it has results
          if (booksFound.length > 0) {
            // Iterate result
            const booksFoundFiltered = booksFound.map((bookFound) => {
              // Set shelf as 'None'
              bookFound.shelf = 'none';

              // Match books
              this.state.books.map((book) => {
                if (bookFound.id === book.id) {
                  // Set correct shelf
                  bookFound.shelf = book.shelf;
                }
                return book;
              });
              return bookFound;
            });

            // Update search result (it has results)
            this.setState({
              searchResults: booksFoundFiltered
            });
          } else {
            // Update search result (no results)
            this.setState({
              searchResults: []
            });
          }
        });
      }, 1500);
    }
  }

  render() {
    const { books, query, searchResults, isLoadingSearch } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Route path="/" exact={true} render={() => (
            <Home books={books} onChangeShelfBook={this.changeShelfBook} />
          )} />
          <Route path="/search" render={() => (
            <Search books={searchResults} query={query} loading={isLoadingSearch} onChangeShelfBook={this.changeShelfBook} onSearhTerm={this.searchTerm} />
          )} />
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;

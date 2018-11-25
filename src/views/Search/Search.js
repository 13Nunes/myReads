// Basic
import React, { Component } from 'react';

// External UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import IconButton from '@material-ui/core/IconButton';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import SearchIcon from '@material-ui/icons/Search';

// API
import * as BooksAPI from '../../services/BooksAPI';

// Components
import ContainerElastic from '../../components/ContainerElastic/ContainerElastic';
import ListBook from '../../components/ListBooks/ListBooks';

// Assets
import './Search.css';

// Toobar custom style
const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  backButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class Search extends Component {
  state = {
    books: [],
    query: '',
    searchResults: [],
    isLoadingSearch: false
  }

  navigateTo = (target) => {
    this.props.history.push(target)
  }

  onSearch = (searchTerm) => {
    // Quando o termo muda, já limpo o resultado da busca e atualizo o termo
    this.setState({
      searchResults: [],
      query: searchTerm
    });

    clearTimeout(this.delayTimer);
    // Se tiver algum termo de busca
    if (searchTerm !== '') {
      // Informo que vou carregar
      this.setState({
        isLoadingSearch: true
      });
      this.delayTimer = setTimeout(() => {
        BooksAPI.search(this.state.query).then((booksFinded) => {
          // Informo que a busca terminou
          this.setState({
            isLoadingSearch: false
          });
          if (booksFinded.length > 0) {
            // Varro todos os livros encontrados
            const booksFindedFiltered = booksFinded.map((bookFinded) => {
              // Seto os livros como none por padrão
              bookFinded.shelf = 'none';
              // Confiro nos livros do state se algum foi retornado na busca
              this.state.books.map((book) => {
                if (bookFinded.id === book.id) {
                  // Se um livro do state for igual a um livro retornado na busca, atribuo o shelf correto no resultado da busca
                  bookFinded.shelf = book.shelf;
                }
                return book;
              });
              return bookFinded;
            });
            this.setState({
              searchResults: booksFindedFiltered
            });
          } else {
            this.setState({
              searchResults: []
            });
          }
        });
      }, 1000);
    }
  }

  changeShelfBook = (bookTochange, shelf) => { }

  render() {
    const { classes } = this.props;

    return (
      <div className="search">
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton className={classes.backButton} color="inherit" aria-label="Back" onClick={() => this.navigateTo('/')}>
              <NavigateBefore />
            </IconButton>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={this.state.query}
                onChange={(event) => this.onSearch(event.target.value)}
              />
            </div>
          </Toolbar>
        </AppBar>
        <ContainerElastic>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Paper elevation={0}>
                <div id="search-result-container">
                  <h3>Search result</h3>
                  <ListBook books={this.state.searchResults} onChangeShelfBook={this.changeShelfBook} />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </ContainerElastic>
      </div>
    );
  }
}

export default withStyles(styles)(Search);

// Basic
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

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
import LinearProgress from '@material-ui/core/LinearProgress';
import Divider from '@material-ui/core/Divider';

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
  // @properties
  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  // @methods
  navigateTo = (target) => {
    this.props.history.push(target)
  }

  searchTerm = (event) => {
    this.props.onSearhTerm(event.target.value);
  }

  render() {
    const { books, query, loading, classes } = this.props;

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
                value={query}
                onChange={event => this.searchTerm(event)}
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
                  <Divider />
                  <ListBook books={books} onChangeShelfBook={this.props.onChangeShelfBook} />
                  {(loading === true) &&
                    <div className="loading">
                      <span>Loading...</span><br /><br />
                      <LinearProgress />
                    </div>
                  }
                  {(books.length === 0 && loading === false) &&
                    <div className="no-results">No results.</div>
                  }
                </div>
              </Paper>
            </Grid>
          </Grid>
        </ContainerElastic>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Search));
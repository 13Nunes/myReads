// Basic
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

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

// Components
import CurrentlyReadingPanel from '../../components/CurrentlyReadingPanel/CurrentlyReadingPanel';
import WantToReadPanel from '../../components/WantToReadPanel/WantToReadPanel';
import ReadPanel from '../../components/ReadPanel/ReadPanel';
import Banner from '../../components/Banner/Banner';
import ContainerElastic from '../../components/ContainerElastic/ContainerElastic';

class Home extends Component {
  // @properties
  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  // @states
  state = {
    tabSelected: 0,
  }

  // @methods
  navigateTo = (target) => {
    this.props.history.push(target)
  }

  handleTabChange = (event, tabSelected) => {
    // Set current tab selected
    this.setState({ tabSelected });
  };

  render() {
    const { books } = this.props
    const { tabSelected } = this.state;

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
                {tabSelected === 0 && <CurrentlyReadingPanel books={books} onChangeShelfBook={this.props.onChangeShelfBook} />}
                {tabSelected === 1 && <WantToReadPanel books={books} onChangeShelfBook={this.props.onChangeShelfBook} />}
                {tabSelected === 2 && <ReadPanel books={books} onChangeShelfBook={this.props.onChangeShelfBook} />}
              </Paper>
            </Grid>
          </Grid>
        </ContainerElastic>
      </div>
    );
  }
}

export default withRouter(Home);

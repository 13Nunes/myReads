// Basic
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// External UI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';

class ListBooks extends Component {
  // @properties
  static propTypes = {
    baggage: PropTypes.object.isRequired,
  }

  // @states
  state = {
    bookElement: null,
  };

  // @methods
  handleOpenMenu = event => {
    this.setState({ bookElement: event.currentTarget });
  };

  handleCloseMenu = () => {
    this.setState({ bookElement: null });
  };

  handleMoveBookToShelf = (event, shelf, baggage) => {
    this.props.onChangeShelfBook(baggage, shelf);
    this.handleCloseMenu();
  }

  render() {
    const { bookElement } = this.state;
    const { baggage } = this.props;

    const open = Boolean(bookElement);

    return (
      <div className="menuButton">
        <IconButton color="secondary" aria-label="Edit" onClick={this.handleOpenMenu}>
          <Icon>edit_icon</Icon>
        </IconButton>
        <Menu anchorEl={bookElement} open={open} onClose={this.handleCloseMenu}>
          <MenuItem selected={baggage.shelf === 'currentlyReading'} onClick={event => this.handleMoveBookToShelf(event, 'currentlyReading', baggage)}>Current reading</MenuItem>
          <MenuItem selected={baggage.shelf === 'wantToRead'} onClick={event => this.handleMoveBookToShelf(event, 'wantToRead', baggage)}>Want to read</MenuItem>
          <MenuItem selected={baggage.shelf === 'read'} onClick={event => this.handleMoveBookToShelf(event, 'read', baggage)}>Read</MenuItem>
          {(baggage.shelf !== 'none') &&
            <div>
              <Divider />
              <MenuItem onClick={event => this.handleMoveBookToShelf(event, 'none', baggage)}>
                <Icon style={{ color: 'red' }}>delete_icon</Icon>&nbsp;&nbsp;Remove
              </MenuItem>
            </div>
          }
        </Menu>
      </div>
    );
  }
}

export default ListBooks
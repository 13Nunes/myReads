// Basic
import React, { Component } from 'react';

// External UI
import {
  Classes,
  Tab,
  Tabs,
  Alignment,
  Button,
  Navbar,
} from "@blueprintjs/core";

// Own UI
import ListBook from '../../components/ListBooks/ListBooks';

// Assets
import './Home.css';

// API
import * as BooksAPI from '../../services/BooksAPI';

const CurrentReadingPanel = () => (
  <div>
    <h3>Example panel: React</h3>
    <ListBook contacts={[1, 2, 3]} />
  </div>
);

const WantToReadPanel = () => (
  <div>
    <h3>Example panel: React 2</h3>
    <p className={Classes.RUNNING_TEXT}>
      Lots of people use React as the V in MVC. Since React makes no assumptions about the rest of your technology
      stack, it's easy to try it out on a small feature in an existing project.
        </p>
  </div>
);

const ReadPanel = () => (
  <div>
    <h3>Example panel: React 3</h3>
    <p className={Classes.RUNNING_TEXT}>
      Lots of people use React as the V in MVC. Since React makes no assumptions about the rest of your technology
      stack, it's easy to try it out on a small feature in an existing project.
        </p>
  </div>
);

class Home extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState(() => ({
        books
      }))
    })
  }

  navigateTo = (target) => {
    this.props.history.push(target)
  }

  render() {
    return (
      <div className="Home">
        <Navbar className={Classes.DARK}>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>My Reads</Navbar.Heading>
          </Navbar.Group>
          <Navbar.Group align={Alignment.RIGHT}>
            <Button className="bp3-minimal" icon="home" text="Home" onClick={() => this.navigateTo('/')} />
            <Button className="bp3-minimal" icon="search" text="Search" onClick={() => this.navigateTo('/search')} />
          </Navbar.Group>
        </Navbar>
        <Tabs id="ReadingStatesTab">
          <Tab id="cr" animate={true} title="Current reading" panel={<CurrentReadingPanel />} />
          <Tab id="wr" animate={true} title="Want to read" panel={<WantToReadPanel />} />
          <Tab id="rd" animate={true} title="Read" panel={<ReadPanel />} />
        </Tabs>
      </div >
    );
  }
}

export default Home;

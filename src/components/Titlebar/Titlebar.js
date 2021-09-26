import React from 'react';

// bootstrap
import { Nav, Navbar } from '../../styles';

// styling
import './Titlebar.css';

export class Titlebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navigation: 0,
    };
  }

  render() {
    const { navigation } = this.state;
    return (
      <div className="titlebar-component">
        <Navbar expand="lg" bg="dark" variant="dark" className="navbar">
          <Navbar.Brand className="title">Image Carousel Customizer</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={() => this.setState({ navigation: 0 })}>Import</Nav.Link>
              <Nav.Link onClick={() => this.setState({ navigation: 1 })}>Export</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Titlebar;
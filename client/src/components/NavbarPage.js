import React, { Component } from "react";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
} from "mdbreact";
import './NavbarPage.scss';

class NavbarPage extends Component {

  constructor(props) {
    super(props);
    this.history = props.history;
    this.state = {
      isOpen: false,
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      this.props.history.push('/search/' + e.target.value);
      this.setState({ value: "" });
    }
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {

    return (
      <div>
        <MDBNavbar dark expand="md" class="navbar">
          <MDBNavbarBrand>
            <strong className="white-text">Movies</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              <MDBNavItem active>
                <MDBNavLink to="/">Home</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/schedule">Schedule</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/watchlist">To Watch</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBFormInline waves>
                  <div className="md-form my-0">
                    <input value={this.state.value} className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"
                      onKeyPress={this.handleKeyPress} onChange={this.handleChange} />
                  </div>
                </MDBFormInline>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </div>

    );
  }
}

export default NavbarPage;
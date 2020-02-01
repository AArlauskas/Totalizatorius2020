import React, { Component } from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import "./styles.css";
import logo from "../../Logos/navLogo.png";
import { slide as Menu } from "react-burger-menu";
class NavigationBar extends Component {
  state = {
    width: window.innerWidth
  };
  render() {
    const isMobile = this.state.width <= 500;
    return (
      <div>
        {isMobile ? (
          <div className="mobile">
            <Menu disableAutoFocus>
              <a id="home" className="menu-item" href="/home">
                Pagrindinis puslapis
              </a>
              <a
                id="guesses"
                className="menu-item"
                href={`/guesess/${this.props.username}`}
              >
                Spėjimai
              </a>
              <a id="results" className="menu-item" href="/results">
                Rezultatai
              </a>
              <a id="rules" className="menu-item" href="/rules">
                Taisyklės
              </a>
              <a id="changePassword" className="menu-item" href="/temp">
                Pakeisti slaptažodį
              </a>
              <a
                id="logout"
                className="menu-item"
                href="/"
                onClick={this.props.changeLoginState}
              >
                Atsijungti
              </a>
              {this.props.isAdmin ? (
                <a id="admin" className="menu-item" href="/admin">
                  Admin
                </a>
              ) : null}
            </Menu>
            <div className="logo">
              <img src={logo} alt="logo" style={{ width: 200 }} />
            </div>
          </div>
        ) : (
          <div>
            <Navbar bg="dark" variant="dark" fixed="top">
              <Nav className="mr-auto">
                <Nav.Link href="/home">Pagrindinis puslapis</Nav.Link>
                <Nav.Link href={`/guesess/${this.props.username}`}>
                  Spėjimai
                </Nav.Link>
                <Nav.Link href="/Results">Rezultatai</Nav.Link>
                <Nav.Link href="/Rules">Taisyklės</Nav.Link>
              </Nav>
              <Nav>
                <div className="rightSide">
                  <NavDropdown
                    title="Nustatymai"
                    id="basic-nav-dropdown"
                    drop={"left"}
                  >
                    {this.props.isAdmin ? (
                      <NavDropdown.Item href="/admin">
                        Admin page
                      </NavDropdown.Item>
                    ) : null}
                    <NavDropdown.Item href="#action/3.1">
                      Pakeisti slaptažodį
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="/"
                      onClick={this.props.changeLoginState}
                    >
                      Atsijungti
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </Nav>
            </Navbar>
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
          </div>
        )}
      </div>
    );
  }
  USNAFE_componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };
}

export default NavigationBar;

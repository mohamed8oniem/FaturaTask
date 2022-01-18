import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Logo from '../../../assets/images/Logo.gif'
import UserDropDown from '../UserDropDown/UserDropDown';
import './_Header.scss'
const Header = () => {
  return (
    <Navbar bg="" expand="lg">
      <Container>

        <Navbar.Brand href="/">
          <img src={Logo} alt="" />
          <h3>Gifo</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Favourites">Favourites</Nav.Link>
            <Nav.Link href="/upload">Upload Gif</Nav.Link>
            <Nav.Link href="/uploadList">My Uploads</Nav.Link>
          </Nav>
          <UserDropDown />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default Header;
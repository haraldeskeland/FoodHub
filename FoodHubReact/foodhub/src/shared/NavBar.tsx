import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

// NavMenu component definition
const NavMenu: React.FC = () => {
  return (
    <Navbar expand="lg"> {/* Navbar component with expand property for responsive behavior */}
      <Navbar.Brand href="/">FoodHub</Navbar.Brand> {/* Brand name with a link to the home page */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" /> {/* Toggle button for collapsing the navbar on smaller screens */}
      <Navbar.Collapse id="basic-navbar-nav"> {/* Collapsible part of the navbar */}
        <Nav className="me-auto"> {/* Navigation links aligned to the left */}
          <Nav.Link href="/items">All items</Nav.Link> {/* Link to the items page */}
          <NavDropdown title="Dropdown" id="basic-nav-dropdown"> {/* Dropdown menu */}
            <NavDropdown.Item href='/items'>Edit Items</NavDropdown.Item> {/* Dropdown item */}
            <NavDropdown.Item href='/itemcreate'>Create New Item</NavDropdown.Item> {/* Dropdown item */}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavMenu;
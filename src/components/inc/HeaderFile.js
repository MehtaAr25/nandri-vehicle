import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import logo from '../images/jmc-logo.png';

function HeaderFile() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogout = () => {
    // Perform any logout actions (like clearing tokens) if necessary
    navigate('/'); // Redirect to login page
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img src={logo} alt="MCJS Logo" width="100" height="100" className="d-inline-block align-top" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto me-3">
            <Nav.Link onClick={handleLogout} className="btn btn-info me-3">
              Logout
            </Nav.Link>
            <Link to="/hindi" className="btn btn-info">
              Hindi
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderFile;

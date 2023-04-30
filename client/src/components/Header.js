import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('token') !== null
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(token !== null);
  }, [isAuthenticated]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <Navbar bg="dark" expand="lg" >
      <Navbar.Brand href="/" style={{ color: 'white' }}>TimeWise</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {isAuthenticated && (
            <>
              <Nav.Link href="uploadTasks">Upload Tasks</Nav.Link>
              <Nav.Link href="TaskTable">View Tasks</Nav.Link>
              <Nav.Link href="dashboard">Dashboard</Nav.Link>
            </>
          )}
        </Nav>
        <Nav className="ml-auto d-flex flex-row">
          {!isAuthenticated && (
            <>
              <Nav.Link href="login">Login</Nav.Link>
              <Nav.Link href="register">Register</Nav.Link>
            </>
          )}
          {isAuthenticated && (
            <NavDropdown title={`Hi, ${JSON.parse(localStorage.getItem('userData')).name}`} id="basic-nav-dropdown" >
              <NavDropdown.Item href="profile" style={{ color: 'white' }}>Edit Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout} style={{ color: 'white' }}>Logout</NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
      <style>{`
        .navbar-collapse {
          justify-content: space-between !important;
        }

        .navbar-light .navbar-nav .nav-link {
          color: white;
        }

        .dropdown-menu {
          background-color: black;
        }

        .dropdown-item:hover, .dropdown-item:focus {
          color: white;
          background-color: transparent;
        }
      `}</style>
    </Navbar>
  );
}

export default Header;

import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  // useLocation is used here just to trigger a re-render of the navbar when the route changes (e.g. after login/logout)
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to={currentUser ? "/exams" : "/"}>Online Exam System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {currentUser ? (
              <>
                <Nav.Link as={Link} to="/exams">Exams</Nav.Link>
                <Nav.Link as={Link} to="/result">Result</Nav.Link>
                <Navbar.Text className="mx-3 text-light">
                  Signed in as: <Link to="/profile">{currentUser.name}</Link>
                </Navbar.Text>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

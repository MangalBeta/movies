import React from 'react';
import { Navbar, Container, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = () => {
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Movie Collection</Navbar.Brand>
        <Nav className="me-auto">
          {/* <Nav.Link as={Link} to="/">Home</Nav.Link> */}
          {/* <Nav.Link as={Link} to="/single">Single Movie</Nav.Link> Adjust path as needed */}
        </Nav>
    
      </Container>
    </Navbar>
  );
};

export default Navigation;

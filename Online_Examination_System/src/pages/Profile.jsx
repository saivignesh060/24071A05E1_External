import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

const Profile = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { 
    name: 'Guest', 
    email: 'guest@student.college.edu',
    department: 'N/A',
    college: 'N/A'
  };

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card className="shadow-sm" style={{ width: '500px' }}>
        <Card.Header className="bg-dark text-white text-center py-3">
          <h4 className="mb-0">Student Profile</h4>
        </Card.Header>
        <Card.Body className="text-center py-5">
          <div className="bg-secondary text-white rounded-circle d-inline-flex justify-content-center align-items-center mb-4" style={{ width: '120px', height: '120px', fontSize: '50px' }}>
            👤
          </div>
          <h2 className="mb-1">{currentUser.name}</h2>
          <p className="text-muted mb-4">{currentUser.email}</p>
          
          <hr />
          
          <Row className="mt-4 text-start">
            <Col xs={6} className="mb-3">
              <strong className="text-muted d-block">Department</strong>
              <span className="fs-5">{currentUser.department || 'Computer Science'}</span>
            </Col>
            <Col xs={6} className="mb-3">
              <strong className="text-muted d-block">College</strong>
              <span className="fs-5">{currentUser.college || 'Engineering College'}</span>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;

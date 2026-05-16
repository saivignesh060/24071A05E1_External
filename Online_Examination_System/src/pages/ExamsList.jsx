import React from 'react';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ExamsList = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Card className="shadow-sm">
        <Card.Header as="h5" className="bg-primary text-white">Available Exams</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item className="d-flex justify-content-between align-items-center py-4">
            <div>
              <h5 className="mb-1">Introduction to Computer Science</h5>
              <small className="text-muted">Duration: 10 mins | 3 Questions</small>
            </div>
            <Button variant="primary" onClick={() => navigate('/exam')}>Start Exam</Button>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center py-4">
            <div>
              <h5 className="mb-1">Data Structures and Algorithms</h5>
              <small className="text-muted">Duration: 45 mins | 50 Questions</small>
            </div>
            <Button variant="secondary" disabled>Available Tomorrow</Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
};

export default ExamsList;

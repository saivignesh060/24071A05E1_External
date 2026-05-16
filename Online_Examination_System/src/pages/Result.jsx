import React, { useState, useEffect } from 'react';
import { Container, Card, Button, ListGroup, Badge, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [allResults, setAllResults] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);

  useEffect(() => {
    // Load all exams from localStorage
    const results = JSON.parse(localStorage.getItem('allExamResults')) || [];
    setAllResults(results);

    // If navigating directly from taking an exam, auto-open that exam's details
    if (location.state && location.state.examId) {
      const recentExam = results.find(ex => ex.id === location.state.examId);
      if (recentExam) setSelectedExam(recentExam);
    }
  }, [location.state]);

  if (allResults.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <h3>No Exam Results Found</h3>
        <p>You haven't taken any exams yet.</p>
        <Button variant="primary" onClick={() => navigate('/exam')}>Take Exam</Button>
      </Container>
    );
  }

  // View: Detailed Result for a single exam
  if (selectedExam) {
    const isPass = (selectedExam.score / selectedExam.total) >= 0.5;
    return (
      <Container className="mt-5 mb-5">
        <Button variant="outline-secondary" className="mb-4" onClick={() => setSelectedExam(null)}>
          &larr; Back to All Results
        </Button>
        <Card className="shadow-sm">
          <Card.Header as="h4" className={isPass ? 'bg-success text-white' : 'bg-danger text-white'}>
            Result: {selectedExam.subject}
          </Card.Header>
          <Card.Body>
            <div className="text-center mb-5 mt-3">
              <h1 className="display-3">
                {selectedExam.score} / {selectedExam.total}
              </h1>
              <h4 className="text-muted">{isPass ? 'Passed' : 'Failed'}</h4>
              <p>Taken on: {selectedExam.date}</p>
            </div>

            <h4 className="mb-4">Question Breakdown</h4>
            {selectedExam.details.map((q, index) => (
              <Card key={q.id} className={`mb-3 border-${q.isCorrect ? 'success' : 'danger'}`}>
                <Card.Body>
                  <h5>{index + 1}. {q.question}</h5>
                  <div className="mt-3">
                    <p className="mb-1">
                      <strong>Your Answer: </strong>
                      <span className={q.isCorrect ? 'text-success' : 'text-danger'}>
                        {q.userAnswer}
                      </span>
                    </p>
                    {!q.isCorrect && (
                      <p className="mb-0">
                        <strong>Correct Answer: </strong>
                        <span className="text-success">{q.answer}</span>
                      </p>
                    )}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Card.Body>
        </Card>
      </Container>
    );
  }

  // View: List of all attempted exams
  return (
    <Container className="mt-5">
      <h3 className="mb-4">Your Exam History</h3>
      <ListGroup className="shadow-sm">
        {allResults.map((exam) => (
          <ListGroup.Item 
            key={exam.id} 
            action 
            onClick={() => setSelectedExam(exam)}
            className="d-flex justify-content-between align-items-center py-3"
          >
            <div>
              <h5 className="mb-1">{exam.subject}</h5>
              <small className="text-muted">{exam.date}</small>
            </div>
            <div className="text-end">
              <h5 className="mb-0">
                Score: {exam.score}/{exam.total}
              </h5>
              <Badge bg={ (exam.score/exam.total) >= 0.5 ? 'success' : 'danger' }>
                {(exam.score/exam.total) >= 0.5 ? 'Pass' : 'Fail'}
              </Badge>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Result;

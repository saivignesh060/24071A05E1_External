import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    id: 2,
    question: "What is the correct command to create a new React project?",
    options: ["npx create-react-app my-app", "npm init react-app my-app", "Both A and B are correct"],
    answer: "Both A and B are correct"
  },
  {
    id: 3,
    question: "Which hook is used to manage state in a functional component?",
    options: ["useEffect", "useState", "useContext"],
    answer: "useState"
  }
];

const Exam = () => {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const subject = "Introduction to Computer Science";

  const handleOptionChange = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let score = 0;
    
    // Build detailed results
    const details = questions.map(q => {
      const isCorrect = answers[q.id] === q.answer;
      if (isCorrect) score += 1;
      return {
        ...q,
        userAnswer: answers[q.id] || "No Answer",
        isCorrect
      };
    });

    const currentExam = {
      id: Date.now(),
      subject,
      score,
      total: questions.length,
      date: new Date().toLocaleString(),
      details
    };

    // Save to localStorage as a list of exams
    const existingResults = JSON.parse(localStorage.getItem('allExamResults')) || [];
    localStorage.setItem('allExamResults', JSON.stringify([currentExam, ...existingResults]));

    // Pass latest exam ID via navigation state
    navigate('/result', { state: { examId: currentExam.id } });
  };

  return (
    <Container className="mt-5 mb-5">
      <h3 className="mb-4 text-center">{subject} Exam</h3>
      <Form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <Card key={q.id} className="shadow-sm mb-4">
            <Card.Header className="bg-light">
              <strong>Question {index + 1}</strong>
            </Card.Header>
            <Card.Body>
              <h5 className="mb-3">{q.question}</h5>
              {q.options.map((option, i) => (
                <Form.Check 
                  key={i}
                  type="radio"
                  id={`question-${q.id}-option-${i}`}
                  label={option}
                  name={`question-${q.id}`}
                  onChange={() => handleOptionChange(q.id, option)}
                  required
                  className="mb-2"
                />
              ))}
            </Card.Body>
          </Card>
        ))}
        <div className="text-center">
          <Button variant="success" type="submit" size="lg" className="px-5 shadow">
            Submit Exam
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Exam;

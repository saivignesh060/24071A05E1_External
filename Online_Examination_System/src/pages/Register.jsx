import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', department: '', college: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, go straight to dashboard
    if (localStorage.getItem('currentUser')) {
      navigate('/exams');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // clear error when user types
  };

  const validateForm = () => {
    if (formData.name.trim().length < 3) return "Name must be at least 3 characters long.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Please enter a valid email address.";
    
    if (formData.department.trim().length < 2) return "Department name is too short.";
    if (formData.college.trim().length < 2) return "College name is too short.";
    
    if (formData.password.length < 6) return "Password must be at least 6 characters long.";

    return null; // no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    // Save user data to localStorage
    localStorage.setItem('registeredUser', JSON.stringify(formData));
    alert('Registration successful! Please login.');
    navigate('/');
  };

  return (
    <Container className="d-flex justify-content-center mt-5 mb-5">
      <Card style={{ width: '400px' }} className="shadow-sm">
        <Card.Body>
          <Card.Title className="text-center mb-4">Student Registration</Card.Title>
          
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="e.g. Computer Science" 
                name="department" 
                value={formData.department} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>College Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your college" 
                name="college" 
                value={formData.college} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;

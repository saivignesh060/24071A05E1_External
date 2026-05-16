import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
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
    setError(''); // clear error on type
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Please enter a valid email address.";
    if (formData.password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem('registeredUser'));
    
    if (storedUser && storedUser.email === formData.email && storedUser.password === formData.password) {
      // Set current logged in user
      localStorage.setItem('currentUser', JSON.stringify(storedUser));
      navigate('/exams');
    } else {
      setError('Invalid email or password!');
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: '400px' }} className="shadow-sm">
        <Card.Body>
          <Card.Title className="text-center mb-4">Student Login</Card.Title>
          
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit} noValidate>
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

            <Button variant="success" type="submit" className="w-100 mb-3">
              Login
            </Button>
            
            <div className="text-center">
              <small>Don't have an account? <Link to="/register">Register here</Link></small>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;

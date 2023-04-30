import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setShowError(true);
      setErrorMessage('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('https://black-earthworm-toga.cyclic.app/auth/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setShowSuccess(true);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setShowError(true);
        setErrorMessage(data.message || 'Server error');
      }
    } catch (error) {
      console.error(error);
      setShowError(true);
      setErrorMessage('Server error');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <Card style={{ width: '25rem' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Register</h2>
          {showSuccess && (
            <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
              Registration successful! You can now log in.
            </Alert>
          )}
          {showError && (
            <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
              {errorMessage}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" block={true.toString()}  style={{ backgroundColor: '#0e88a0' ,marginTop:"1rem" }}>
              Register
            </Button>
          </Form>
        </Card.Body>
        <style>{`
     .bg-primary {
      background-color: #0e88a0 !important;
    }
    .text-primary {
      color: black !important;
    }
      `}</style>
      </Card>
    </div>
  );
};

export default RegisterPage;

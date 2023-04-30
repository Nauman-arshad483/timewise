import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('https://black-earthworm-toga.cyclic.app/auth/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data);
    if (data && data.user && data.token) {
      console.log("if executed")
      // Store user data and token in local storage
      localStorage.setItem('userData', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      // Redirect to dashboard after successful login
      navigate('/dashboard');
      window.location.reload();
    } else {
      console.log("else executed")
      setError('Invalid email or password');
      localStorage.removeItem('userData');
    localStorage.removeItem('token');
    }
  } catch (error) {
    console.log("catch executed")
    console.error(error);
    setError('Invalid email or password');
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
  } finally {
    console.log("fianlly executed")
    // localStorage.removeItem('userData');
    // localStorage.removeItem('token');
    navigate('/dashboard');
    window.location.reload();
  }
};


  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <Card style={{ width: "25rem" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
          <Form onSubmit={handleSubmit}>
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

            <Button
              variant="primary"
              type="submit"
              block={true.toString()}
              style={{ backgroundColor: "#0e88a0", marginTop: "1rem" }}
            >
              Login
            </Button>
          </Form>
        </Card.Body>
        <style>
          {`
         .bg-primary {
          background-color: #0e88a0 !important;
        }
        .text-primary {
          color: black !important;
        }
          `}
        </style>
      </Card>
    </div>
  );
};

export default LoginPage;

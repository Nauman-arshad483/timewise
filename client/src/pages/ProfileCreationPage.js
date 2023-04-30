import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import requireAuth from '../requireAuth';
const ProfileCreationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [major, setMajor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userId=userData._id;
    // Send profile creation request to backend
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, major, userId })
    };
    fetch('https://black-earthworm-toga.cyclic.app/profile/api/createProfile', requestOptions)
      .then(response => {
        if (response.ok) {
          console.log('Profile updated successfully');
          // Add any code that you want to execute after the profile is updated
        } else {
          throw new Error('Something went wrong');
        }
      })
      .catch(error => console.log(error));
    
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <Card style={{ width: '25rem' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Create Profile</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
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

            <Form.Group controlId="formBasicMajor">
              <Form.Label>Major</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter major"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className='bg-primary' block>
              Create Profile
            </Button>
          </Form>
        </Card.Body>
        <style>{`
  
  .bg-primary {
    background-color: #0e88a0 !important;
    margin-top:1rem;
  }
      `}</style>
      </Card>
    </div>
  );
};

export default requireAuth(ProfileCreationPage);

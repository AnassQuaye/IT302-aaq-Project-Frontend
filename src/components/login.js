/*
  Name: Anass Agoe-Mensah Quaye
  Date: November 20, 2026
  Course: IT-302-001: Advanced Internet Applications
  Assignment: Phase 5 C.U.D. Node.js Data using React.js Assignment
  Email: aaq@njit.edu
*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container } from 'react-bootstrap';

const Login = ({ login, ucid }) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name, id });
    navigate(`/${ucid}_animes`);
  };

  return (
    <Container className="py-4" style={{ maxWidth: '500px' }}>
      <Card className="shadow-sm">
        <Card.Header as="h4" className="bg-dark text-white">
          Login
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="loginName">
              <Form.Label>Username (First and Last Name)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="loginId">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your user ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
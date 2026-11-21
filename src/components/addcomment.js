/*
  Name: Anass Agoe-Mensah Quaye
  Date: November 20, 2026
  Course: IT-302-001: Advanced Internet Applications
  Assignment: Phase 5 C.U.D. Node.js Data using React.js Assignment
  Email: aaq@njit.edu
*/

import React, { useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import AnimeDataService from '../service/AnimeDataService';

const AddComment = ({ user, ucid }) => {
  const { id } = useParams();
  const location = useLocation();

  const editing = Boolean(location.state && location.state.currentComment);
  const initialText = editing ? location.state.currentComment.text : '';

  const [text, setText] = useState(initialText);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const data = {
      text: text,
      name: user.name,
      user_id: user.id,
      anime_id: id,
    };

    if (editing) {
      data.comment_id = location.state.currentComment._id;
      AnimeDataService.updateComment(ucid, data)
        .then(() => setSubmitted(true))
        .catch((err) => {
          console.error(err);
          setError('Failed to update comment.');
        });
    } else {
      AnimeDataService.createComment(ucid, data)
        .then(() => setSubmitted(true))
        .catch((err) => {
          console.error(err);
          setError('Failed to submit comment.');
        });
    }
  };

  if (!user) {
    return (
      <Container className="py-4">
        <Alert variant="warning">
          Please <Link to={`/${ucid}_login`}>log in</Link> to add or edit a comment.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4" style={{ maxWidth: '600px' }}>
      <Card className="shadow-sm">
        <Card.Header as="h4" className="bg-primary text-white">
          {editing ? 'Edit Comment' : 'Add Comment'}
        </Card.Header>
        <Card.Body>
          {submitted ? (
            <div>
              <Alert variant="success">
                Your comment was {editing ? 'updated' : 'submitted'} successfully!
              </Alert>
              <Link to={`/${ucid}_animes/${id}`} className="btn btn-primary">
                Back to Anime
              </Link>
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form.Group className="mb-3" controlId="commentText">
                <Form.Label>{editing ? 'Edit' : 'Create'} Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write your comment using complete sentences..."
                  required
                />
              </Form.Group>
              <div className="d-flex gap-2">
                <Button variant="success" type="submit">
                  Submit
                </Button>
                <Link to={`/${ucid}_animes/${id}`} className="btn btn-secondary">
                  Cancel
                </Link>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddComment;
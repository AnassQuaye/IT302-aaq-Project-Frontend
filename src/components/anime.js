/*
  Name: Anass Agoe-Mensah Quaye
  Date: October 30, 2026
  Course: IT-302: Advanced Internet Applications
  Assignment: Phase 4 Read Node.js Data using React.js Assignment
  Email: aaq@njit.edu
*/

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Container, Badge } from 'react-bootstrap';
import AnimeDataService from '../service/AnimeDataService';

const Anime = ({ user, ucid }) => {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Try single-record endpoint first
    AnimeDataService.get(ucid, id)
      .then((response) => {
        const item = response.data?.anime || response.data?.nexus || response.data;
        if (item && (item._id || item.title || item.name)) {
          setRecord(item);
        } else {
          throw new Error('Empty item returned');
        }
      })
      .catch(() => {
        // 2. Automatic fallback: find the record from getAll()
        AnimeDataService.getAll(ucid)
          .then((res) => {
            const list =
              res.data?.nexus ||
              res.data?.animes ||
              res.data?.nexusList ||
              (Array.isArray(res.data) ? res.data : []);
            const found = list.find((a) => String(a._id) === String(id));
            if (found) {
              setRecord(found);
            } else {
              setError('Could not find anime record with ID: ' + id);
            }
          })
          .catch((err) => {
            console.error('Fallback error:', err);
            setError('Failed to load anime details.');
          });
      });
  }, [ucid, id]);

  if (error) {
    return (
      <Container className="py-4">
        <p className="text-danger">{error}</p>
        <Link to={`/${ucid}_animes`} className="btn btn-secondary">
          Back to Catalog
        </Link>
      </Container>
    );
  }

  if (!record) {
    return (
      <Container className="py-4">
        <p className="text-muted">Loading anime details...</p>
      </Container>
    );
  }

  const genreText = Array.isArray(record.genre || record.genres)
    ? (record.genre || record.genres).join(', ')
    : record.genre || record.genres || record.type || 'Anime Series';

  return (
    <Container className="py-2">
      <Card className="shadow-sm mb-4">
        <Card.Header as="h3" className="bg-primary text-white">
          {record.title || record.name}
        </Card.Header>
        <Card.Body>
          <Card.Subtitle className="mb-3 text-muted">
            Database Record ID: {String(record._id)}
          </Card.Subtitle>

          <p>
            <strong>Genre:</strong>{' '}
            <Badge bg="info" className="text-dark">
              {String(genreText)}
            </Badge>
          </p>

          <p>
            <strong>Episodes / Status:</strong>{' '}
            {String(record.episodes || record.status || 'Ongoing')}
          </p>

          <p className="mb-1">
            <strong>Synopsis:</strong>
          </p>
          <p className="lead fs-6">
            {String(record.synopsis || record.description || 'No synopsis available.')}
          </p>

          <Link to={`/${ucid}_animes`} className="btn btn-secondary mt-3">
            Back to Catalog
          </Link>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Header as="h5">Community Comments</Card.Header>
        <Card.Body>
          {Array.isArray(record.comments) && record.comments.length > 0 ? (
            record.comments.map((comment, index) => (
              <div key={comment._id || index} className="border-bottom pb-2 mb-2">
                <p className="mb-1">
                  <strong>{comment.name || comment.user_name || 'Anonymous'}:</strong>{' '}
                  {comment.text || comment.comment}
                </p>
                <small className="text-muted">
                  Posted: {comment.date ? new Date(comment.date).toLocaleDateString() : 'N/A'}
                </small>
              </div>
            ))
          ) : (
            <p className="text-muted">No comments have been posted for this record yet.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Anime;
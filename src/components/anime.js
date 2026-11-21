/*
  Name: Anass Agoe-Mensah Quaye
  Date: November 20, 2026
  Course: IT-302-001: Advanced Internet Applications
  Assignment: Phase 5 C.U.D. Node.js Data using React.js Assignment
  Email: aaq@njit.edu
*/

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Container, Badge, Button } from 'react-bootstrap';
import AnimeDataService from '../service/AnimeDataService';

const Anime = ({ user, ucid }) => {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  const handleDeleteComment = (commentId, index) => {
    AnimeDataService.deleteComment(ucid, commentId, user.id)
      .then(() => {
        setRecord((prev) => {
          const updatedComments = [...(prev.comments || [])];
          updatedComments.splice(index, 1);
          return { ...prev, comments: updatedComments };
        });
      })
      .catch((err) => {
        console.error('Error deleting comment:', err);
      });
  };

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

  const commentsList = Array.isArray(record.comments) ? record.comments : [];

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

          <div className="mt-3 d-flex gap-2">
            <Link to={`/${ucid}_animes`} className="btn btn-secondary">
              Back to Catalog
            </Link>
            {user && (
              <Link to={`/${ucid}_animes/${id}/comment`} className="btn btn-primary">
                Add Comment
              </Link>
            )}
          </div>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Header as="h5">Community Comments</Card.Header>
        <Card.Body>
          {commentsList.length > 0 ? (
            commentsList.map((comment, index) => (
              <div key={comment._id || index} className="border-bottom pb-3 mb-3">
                <p className="mb-1">
                  <strong>{comment.userName || comment.name || 'Anonymous'}:</strong>{' '}
                  {comment.text}
                </p>
                <small className="text-muted d-block mb-2">
                  Posted:{' '}
                  {comment.lastModified
                    ? new Date(comment.lastModified).toLocaleString()
                    : 'N/A'}
                </small>

                {user && user.id === comment.userId && (
                  <div className="d-flex gap-2">
                    <Link
                      to={`/${ucid}_animes/${id}/comment`}
                      state={{ currentComment: comment }}
                      className="btn btn-sm btn-warning"
                    >
                      Edit
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteComment(comment._id, index)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
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
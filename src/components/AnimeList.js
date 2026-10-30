/*
  Name: Anass Agoe-Mensah Quaye
  Date: October 27, 2026
  Course: IT-302: Advanced Internet Applications
  Assignment: Phase 4 Read Node.js Data using React.js Assignment
  Email: aaq@njit.edu
*/

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import AnimeDataService from '../service/AnimeDataService';

const AnimeList = ({ ucid }) => {
  const [animes, setAnimes] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchGenre, setSearchGenre] = useState('');

  const retrieveAnimes = useCallback(() => {
    AnimeDataService.getAll(ucid)
      .then((response) => {
        const data = response.data.animes || response.data.nexus || response.data;
        setAnimes(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        console.error('Error fetching animes:', e);
      });
  }, [ucid]);

  useEffect(() => {
    retrieveAnimes();
  }, [retrieveAnimes]);

  const findByTitle = () => {
    if (!searchTitle.trim()) {
      retrieveAnimes();
      return;
    }
    AnimeDataService.find(ucid, searchTitle, 'title')
      .then((response) => {
        const data = response.data.animes || response.data.nexus || response.data;
        setAnimes(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        console.error('Error searching by title:', e);
      });
  };

  const findByGenre = () => {
    if (!searchGenre.trim()) {
      retrieveAnimes();
      return;
    }
    AnimeDataService.find(ucid, searchGenre, 'genre')
      .then((response) => {
        const data = response.data.animes || response.data.nexus || response.data;
        setAnimes(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        console.error('Error searching by genre:', e);
      });
  };

  return (
    <div>
      <Row className="mb-4 g-2">
        <Col md={5}>
          <Form.Group className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search by title..."
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
            <Button variant="outline-primary" className="ms-2" onClick={findByTitle}>
              Search
            </Button>
          </Form.Group>
        </Col>

        <Col md={5}>
          <Form.Group className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search by genre..."
              value={searchGenre}
              onChange={(e) => setSearchGenre(e.target.value)}
            />
            <Button variant="outline-primary" className="ms-2" onClick={findByGenre}>
              Search
            </Button>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Button variant="secondary" className="w-100" onClick={retrieveAnimes}>
            Reset
          </Button>
        </Col>
      </Row>

      <Row>
        {animes && animes.length > 0 ? (
          animes.map((item) => (
            <Col md={4} key={item._id} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold">{item.title || item.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {item.genre || item.type || 'Anime Series'}
                  </Card.Subtitle>
                  <Card.Text className="flex-grow-1">
                    {item.synopsis || item.description
                      ? (item.synopsis || item.description).substring(0, 130) + '...'
                      : 'No synopsis available.'}
                  </Card.Text>
                  <Link
                    to={`/${ucid}_animes/${item._id}`}
                    className="btn btn-primary mt-auto"
                  >
                    View Details
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-muted">No anime records match your query.</p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default AnimeList;
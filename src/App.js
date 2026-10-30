/*
  Name: Anass Quaye
  Date: 10/27/2026
  Course: IT-302: Advanced Internet Applications 
  Assignment: Phase 4 Read Node.js Data using React.js Assignment
  Email: aaq@njit.edu
*/

import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import AnimeList from './components/AnimeList';
import Anime from './components/anime';

function App() {
  const ucid = 'aaq';
  const [user, setUser] = useState(null);

  const login = (sampleUser = { id: 'aaq_user', name: 'Anass Quaye' }) => {
    setUser(sampleUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/">
            AnimeNexus
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to={`/${ucid}_nexus`}>
                All Animes
              </Nav.Link>
            </Nav>
            <Nav>
              {user ? (
                <Nav.Link onClick={logout} className="text-warning">
                  Logout ({user.name})
                </Nav.Link>
              ) : (
                <Nav.Link onClick={() => login()} className="text-light">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/" element={<AnimeList ucid={ucid} />} />
          <Route path={`/${ucid}_animes`} element={<AnimeList ucid={ucid} />} />
          <Route path={`/${ucid}_animes/:id`} element={<Anime user={user} ucid={ucid} />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
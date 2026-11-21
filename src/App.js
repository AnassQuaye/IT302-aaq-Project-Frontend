/*
  Name: Anass Agoe-Mensah Quaye
  Date: November 20, 2026
  Course: IT-302-001: Advanced Internet Applications
  Assignment: Phase 5 C.U.D. Node.js Data using React.js Assignment
  Email: aaq@njit.edu
*/

import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import AnimeList from './components/AnimeList';
import Anime from './components/anime';
import Login from './components/login';
import AddComment from './components/addcomment';

function App() {
  const ucid = 'aaq';
  const [user, setUser] = useState(null);

  const login = (userData = null) => {
    setUser(userData);
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
              <Nav.Link as={Link} to={`/${ucid}_animes`}>
                All Animes
              </Nav.Link>
            </Nav>
            <Nav>
              {user ? (
                <Nav.Link onClick={logout} className="text-warning">
                  Logout ({user.name})
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to={`/${ucid}_login`} className="text-light">
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
          <Route path={`/${ucid}_animes/:id/comment`} element={<AddComment user={user} ucid={ucid} />} />
          <Route path={`/${ucid}_login`} element={<Login login={login} ucid={ucid} />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
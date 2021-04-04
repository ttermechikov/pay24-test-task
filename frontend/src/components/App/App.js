import React from 'react';
import { Container, Row, Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import NoteForm from './../NoteForm/NoteForm';
import Notes from './../Notes/Notes';
import Auth from './../Auth/Auth';

import './App.css';

function App() {
  const isLoggedIn = localStorage.getItem('authToken');

  return (
    <Router>
      <Container
        className="p-3 bg-dark text-white d-flex align-items-center justify-content-center"
        fluid
      >
        <Row>
          <Navbar bg="dark" variant="light" className="nav  nav-pills">
            <Link to="/" className="nav-link text-white">
              Добавить запись
            </Link>
            <Link to="/notes" className="nav-link  text-white">
              Все записи
            </Link>
            {!isLoggedIn && (
              <Link to="/login" className="nav-link  text-white">
                Войти
              </Link>
            )}
          </Navbar>
        </Row>
      </Container>
      <Container>
        <Row>
          <Switch>
            <Route exact path="/">
              <NoteForm />
            </Route>
            <Route path="/notes">
              <Notes />
            </Route>
            <Route path="/login">
              <Auth />
            </Route>
          </Switch>
        </Row>
      </Container>
    </Router>
  );
}

export default App;

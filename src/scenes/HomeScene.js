import React from 'react';
import { withRouter } from 'react-router';
import { Button } from 'material-ui';

const LandingPage = withRouter(({ history }) => (
  <div>
    <h1>Todo List Web Application</h1>
    <p>
      I use this project to testing new technologies and latest versions of
      libraries.
    </p>
    <img
      style={{ marginRight: '5px' }}
      width="20"
      height="20"
      alt="github"
      src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg"
    />
    <a href="https://github.com/UchihaVeha/todo-web-app">todo-web-app</a>
    <br />
    <img
      style={{ marginRight: '5px' }}
      width="20"
      height="20"
      alt="github"
      src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg"
    />
    <a href="https://github.com/UchihaVeha/todo-api-app">todo-api-app</a>
    <br />
    <hr />
    <Button raised color="primary" onClick={() => history.push('/sign-up')}>
      Sign Up
    </Button>{' '}
    <Button raised onClick={() => history.push('/sign-in')}>
      Sign In
    </Button>
  </div>
));

export default LandingPage;

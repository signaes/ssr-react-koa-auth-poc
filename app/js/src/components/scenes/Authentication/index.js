import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authentication } from '../../../redux/actions/authentication';

const mapStateToProps = ({ authentication }) => ({
  authentication,
  username: authentication.username,
  token: authentication.token,
  error: authentication.error,
  loggedIn: authentication.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  onNameKeyUp: console.log,
  onPasswordChange: console.log,
  onLogout: username => {
    dispatch(authentication.logout({
      username
    }))
  },
  onSubmit: e => {
    e.preventDefault();

    const elements = e.target.elements;
    const username = elements['username'].value;
    const password = elements['password'].value;

    dispatch(authentication.login({
      username,
      password
    }));
  }
});

const LoggedInDisplay = props => (
  <div>
    <h1>Welcome { props.username }</h1>
    <p>
      Would you like to <a style={{ color: 'blue', cursor: 'pointer' }} onClick={() => props.onLogout(props.username)}>logout</a>
    </p>
  </div>
);

const Authentication = (props, context) => (
  <main>
    { props.loggedIn
      ? <LoggedInDisplay {...props} />
      : null }
    { props.username && !props.loggedIn
      ? <h1>Goodbye { props.username }!</h1>
      : null }
    <h2>Authentication</h2>
    <form onSubmit={props.onSubmit}>
      <fieldset>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          label="Nome"
          type="text"
          placeholder="Nome"
        />
      </fieldset>
      <fieldset>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          label="password"
          type="password"
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </fieldset>
      { props.error
        ? (<small style={{color: 'red'}}>{ props.error }</small>)
        : null }
    </form>

  </main>
);

Authentication.contextTypes = {
  store: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);

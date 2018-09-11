import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { update } from '../../../redux/actions/profile';

class TextInputRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  callback = (name, value) => {
    if (typeof this.props[name] === 'function') {
      this.props[name](value);
    }
  }

  onKeyUp = ({ target }) => {
    const { value } = target;

    this.setState({ value });
    this.callback('onKeyUp', value);
  }

  onChange = ({ target }) => {
    const { value } = target;

    this.setState({ value });
    this.callback('onChange', value);
  }

  render() {
    const {
      id,
      label,
      type = 'text',
      placeholder = '',
    } = this.props;
    const { value } = this.state;

    return (
      <div className="row">
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onKeyUp={this.onKeyUp}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({
  profile,
  username: profile.username,
  token: profile.token,
  error: profile.error,
});

const mapDispatchToProps = dispatch => ({
  onNameKeyUp: console.log,
  onPasswordChange: console.log,
  onSubmit: ({ username, password }) => dispatch(authentication.login({
    username,
    password
  }))
});

const Authentication = (props, context) => (
  <main>
    <h2>Authentication</h2>
    <form onSubmit={props.onSubmit}>
      <TextInputRow
        id="username"
        label="Nome"
        type="text"
        placeholder="Nome"
        value={props.username}
        onKeyUp={props.onNameKeyUp}
      />
      <TextInputRow
        id="password"
        label="password"
        type="password"
        placeholder="Password"
        value={props.password}
        onChange={props.onPasswordChange}
      />
      <button type="submit">Login</button>
    </form>
  </main>
);

Authentication.contextTypes = {
  store: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);

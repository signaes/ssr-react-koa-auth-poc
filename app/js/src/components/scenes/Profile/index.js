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

const mapStateToProps = ({ profile }) => ({
  profile,
  name: profile.name,
  email: profile.email,
});

const mapDispatchToProps = dispatch => ({
  onNameKeyUp: name => dispatch(update.name(name)),
  onEmailKeyUp: email => dispatch(update.email(email)),
  onPasswordChange: password => dispatch(update.password(password)),
});

const Profile = (props, context) => (
  <main>
    <h2>Profile</h2>
    <form>
      <TextInputRow
        id="profile-name"
        label="Nome"
        type="text"
        placeholder="Nome"
        value={props.name}
        onKeyUp={props.onNameKeyUp}
      />
      <TextInputRow
        id="profile-email"
        label="Email"
        type="email"
        placeholder="Email"
        value={props.email}
        onKeyUp={props.onEmailKeyUp}
      />
      <TextInputRow
        id="profile-password"
        label="New Password"
        type="password"
        placeholder="Password"
        value={props.password}
        onChange={props.onPasswordChange}
      />
    </form>
  </main>
);

Profile.contextTypes = {
  store: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

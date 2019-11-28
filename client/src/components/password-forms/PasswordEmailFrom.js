import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PasswordEmailForm = ({ setAlert }) => {
  const [formData, setFormData] = useState({});
  const [sent, setSent] = useState(false);

  const onChange = e => setFormData({ ...formData, email: e.target.value });
  const onSubmit = async e => {
    try {
      e.preventDefault();

      //  send email
      const reqConfig = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const reqBody = JSON.stringify({ email: formData.email });

      await axios.put(`/api/auth/forgot-password/`, reqBody, reqConfig);
      setSent(true);
    } catch (err) {
      console.error(err);
    }
  };
  if (sent) {
    // return <Redirect to='/login' />;
    setAlert('Email sent', 'success');

    return (
      <Fragment>
        <h1 className="large text-primary">Rest password emial is sent.</h1>
        <p className="lead">
          <i className="fas fa-mail"></i> Check your emial: {formData.email}
        </p>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Forgot Password</h1>
      <p className="lead">
        <i className="fas fa-user" /> Input Your Email And Submit To Send
        Recovery Email
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={e => onChange(e)}
            required
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Send" />
      </form>
    </Fragment>
  );
};

PasswordEmailForm.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default connect(null, { setAlert })(PasswordEmailForm);

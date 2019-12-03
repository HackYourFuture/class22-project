import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import { setAlert } from "../../actions/alert";
import { removeFriend } from "../../actions/auth";

const FriendItem = ({ profile, loading, setAlert, removeFriend }) => {
  const {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  } = profile.profile;

  return loading === true ? (
    <Spinner />
  ) : (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
        <button className='btn btn-danger' onClick={() => removeFriend(_id)}>
          Unfriend
        </button>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check' /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

FriendItem.propTypes = {
  profile: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  removeFriend: PropTypes.func.isRequired
};

export default connect(null, { setAlert, removeFriend })(FriendItem);

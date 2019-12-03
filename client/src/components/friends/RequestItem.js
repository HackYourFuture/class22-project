import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import { setAlert } from "../../actions/alert";
import { acceptFriendRequest } from "../../actions/auth";

const RequestItem = ({
  getProfileById,
  profile: {
    profile: {
      user: { _id, name, avatar },
      status,
      company,
      location,
      skills
    },
    loading
  },
  auth,
  id
}) => {
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);
  console.log(id);
  return (
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
        <button
          className='btn btn-primary'
          onClick={() => acceptFriendRequest(id)}
        >
          Confirm
        </button>
        <button className='btn btn-danger'>Reject</button>
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

RequestItem.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
  acceptFriendRequest: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getProfileById,
  acceptFriendRequest
})(RequestItem);

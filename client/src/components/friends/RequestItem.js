import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { acceptFriendRequest, cancelFriendRequest } from "../../actions/auth";
import Spinner from "../layout/Spinner";

const RequestItem = ({
  auth: { user, loading },
  acceptFriendRequest,
  cancelFriendRequest
}) => {
  return loading && user === null ? (
    <Spinner />
  ) : (
    user.request.map(req => (
      <div className='profile bg-light' key={req._id}>
        <img src={req.avatar} alt='' className='round-img' />
        <div>
          <h2>{req.username}</h2>

          <Link to={`/profile/${req.userId}`} className='btn btn-primary'>
            View Profile
          </Link>
          <button
            className=' btn btn-success'
            onClick={() => acceptFriendRequest(req.userId)}
          >
            Confirm
          </button>
          <button
            className='btn btn-danger'
            onClick={() => cancelFriendRequest(req.userId)}
          >
            Not Now
          </button>
        </div>
      </div>
    ))
  );
};

RequestItem.propTypes = {
  acceptFriendRequest: PropTypes.func.isRequired,
  cancelFriendRequest: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  acceptFriendRequest,
  cancelFriendRequest
})(RequestItem);

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { acceptFriendRequest } from "../../actions/auth";
import Spinner from "../layout/Spinner";

const WaitingItem = ({ auth: { user, loading } }) => {
  return loading && user === null ? (
    <Spinner />
  ) : (
    user.sentRequest.map(req => (
      <div className='profile bg-light'>
        <img src={req.avatar} alt='' className='round-img' />

        <h2>
          {req.username} {req.date}
        </h2>
        <Link to={`/profile/${req.userId}`} className='btn btn-primary'>
          View Profile
        </Link>
        <button className='btn btn-danger'>Cancel Request</button>
      </div>
    ))
  );
};

WaitingItem.propTypes = {
  profile: PropTypes.object.isRequired,
  acceptFriendRequest: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  acceptFriendRequest
})(WaitingItem);

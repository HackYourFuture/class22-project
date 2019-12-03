import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { loadUser } from "../../actions/auth";
import FriendItem from "./FriendItem";
import RequestItem from "./RequestItem";
import WaitingItem from "./WaitingItem";

const Friends = ({ auth: { user, loading }, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return loading && user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h2 className='my-2'>My Friends</h2>
      {user.friendsList.length > 0 ? (
        user.friendsList.map(friend => (
          <FriendItem key={friend._id} id={friend.friendId} />
        ))
      ) : (
        <h4>No profiles found...</h4>
      )}
      <h2 className='my-2'>My Requests</h2>
      {user.request.length > 0 ? (
        user.request.map(req => <RequestItem key={req._id} id={req.userId} />)
      ) : (
        <h4>No profiles found...</h4>
      )}
      <h2 className='my-2'>My Waiting List</h2>
      {user.sentRequest.length > 0 ? (
        user.sentRequest.map(req => (
          <WaitingItem key={req._id} id={req.userId} />
        ))
      ) : (
        <h4>No profiles found...</h4>
      )}
    </Fragment>
  );
};

Friends.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loadUser })(Friends);

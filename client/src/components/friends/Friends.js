import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { loadUser } from "../../actions/auth";
import FriendItem from "./FriendItem";
import RequestItem from "./RequestItem";
import WaitingItem from "./WaitingItem";

const Friends = ({ auth: { user, loading } }) => {
  return loading && user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h2 className='my-2'>My Friends</h2>
      {user.friendsList.length > 0 ? (
        <FriendItem />
      ) : (
        <p className='text-primary'>You Don't Have Any Friends Yet</p>
      )}
      <h2 className='my-2'>My Requests</h2>

      {user.request.length > 0 ? (
        <RequestItem />
      ) : (
        <p className='text-primary'>You Didn't Receive Any Friend Request </p>
      )}
      <h2 className='my-2'>My Waiting List</h2>
      {user.sentRequest.length > 0 ? (
        <WaitingItem />
      ) : (
        <p className='text-primary'>Your Waiting List Is Empty</p>
      )}
    </Fragment>
  );
};

Friends.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { loadUser })(Friends);

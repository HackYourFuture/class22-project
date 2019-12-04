import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeFriend } from "../../actions/auth";
import Spinner from "../layout/Spinner";

const FriendItem = ({ auth: { user, loading }, removeFriend }) => {
  return loading && user === null ? (
    <Spinner />
  ) : (
    user.friendsList.map(friend => (
      <div className='profile bg-light'>
        <img src={friend.avatar} alt='' className='round-img' />
        <div>
          <h2>{friend.firstName}</h2>

          <Link to={`/profile/${friend.friendId}`} className='btn btn-primary'>
            View Profile
          </Link>

          <button
            className='btn btn-danger'
            onClick={() => removeFriend(friend.friendId)}
          >
            Unfriend
          </button>
        </div>
      </div>
    ))
  );
};

FriendItem.propTypes = {
  removeFriend: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  removeFriend
})(FriendItem);

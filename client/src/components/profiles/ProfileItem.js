import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendFriendRequest } from '../../actions/auth';
import { socket } from '../../utils/socketClient';
import moment from 'moment';
import Moment from 'react-moment';

const ProfileItem = ({
  sendFriendRequest,
  auth,
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
  auth: { user, loading, isAuthenticated },
}) => {
  const handleClick = e => {
    e.preventDefault();
    sendFriendRequest(_id);
    socket.emit('friendRequest', {
      senderId: auth.user._id,
      senderName: auth.user.name,
      receiverId: _id,
      receiverName: name,
    });
  };

  const Button = () => {
    const isFriend = user.friendsList.filter(friend => friend.friendId === _id);
    const isRequested = user.request.filter(req => req.userId === _id);

    const isSent = user.sentRequest.filter(sendReq => sendReq.userId === _id);

    if (isAuthenticated) {
      if (isFriend.length > 0) {
        return (
          <h4 className="text-primary">
            {' '}
            friends since: <Moment format="YYYY/MM/DD">{moment.utc(isFriend.date)}</Moment>
          </h4>
        );
      }

      if (isRequested.length > 0) {
        return (
          <h4 className="text-primary">
            {' '}
            Requested at: <Moment format="YYYY/MM/DD">{moment.utc(isRequested.date)}</Moment>
          </h4>
        );
      }

      if (isSent.length > 0) {
        return (
          <h4 className="text-primary">
            {' '}
            Request sent at: <Moment format="YYYY/MM/DD">{moment.utc(isSent.date)}</Moment>
          </h4>
        );
      }
      console.log(isRequested);
      console.log(isFriend);
      console.log(isSent);
      if (_id === user._id) {
        return <></>;
      }

      return (
        <button className="btn btn-danger" onClick={handleClick}>
          {' '}
          Send Friend Request
        </button>
      );
    }
    return <></>;
  };

  return (
    <div className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
        <Button />
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check" /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  sendFriendRequest: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { sendFriendRequest })(ProfileItem);

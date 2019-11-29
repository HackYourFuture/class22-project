import React from 'react';
import { Link } from 'react-router-dom';

const UserList = ({ userlist }) => {
  const users = userlist.map((user, key) => (
    <li className="active grey lighten-3 p-2" key={key}>
      <Link to={`/profile/${user._id}`} className="d-flex justify-content-between my-2">
        <img
          src="https://via.placeholder.com/150"
          alt="avatar"
          className="avatar rounded-circle d-flex align-self-center mr-2 z-depth-1"
        />
        <div className="text-small">
          <strong className="chat-user">{user.username}</strong>
          <p className="last-message text-muted">Last message</p>
        </div>
        <div className="chat-footer">
          <p className="text-smaller text-muted mb-0">Online</p>
          <span className="badge badge-danger float-right">1</span>
        </div>
      </Link>
    </li>
  ));
  return (
    <div className="white z-depth-1 px-3 pt-3 pb-0">
      <ul className="list-unstyled friend-list">{users}</ul>
    </div>
  );
};

export default UserList;

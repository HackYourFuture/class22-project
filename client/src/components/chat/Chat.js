import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { receiveUsers, receiveMessage, receiveUsername } from '../../actions/chat';
import io from 'socket.io-client';
import styles from './styles/ChatStyles';
import UserList from './UserList';
import Messages from './Messages';
import Spinner from '../layout/Spinner';

const socket = io('http://localhost:5000');

const Chat = ({ user, chat, receiveMessage, receiveUsers, receiveUsername }) => {
  const username = user.name;
  useEffect(() => {
    receiveUsername(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const [state, setState] = useState({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const chatSocket = () => {
    // receive userlist
    socket.on('chat users', ({ room, users }) => {
      receiveUsers({ room, users });
    });
    console.log(username);
    // send join message
    socket.emit('chat join', {
      timestamp: new Date(),
      username,
      userID: user._id,
      room: 'general',
    });

    // receive join message
    socket.on('chat join', msg => {
      console.log('chat join', msg);
      receiveMessage(msg);
    });

    // receive leave message
    socket.on('chat leave', msg => {
      receiveMessage(msg);
    });

    // receive message
    socket.on('chat message', msg => {
      console.log('chat message', msg);
      receiveMessage(msg);
    });

    // send leave message when user leaves the page
    window.addEventListener('beforeunload', e => {
      e.preventDefault();

      socket.emit('chat leave', {
        timestamp: new Date(),
        username,
        userID: user._id,
        room: 'general',
      });
    });
  };
  useEffect(() => {
    chatSocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // update state from input
  const handleChange = e => {
    setState({ [e.target.name]: e.target.value });
  };

  const handleClick = e => {
    e.preventDefault();

    // send message
    socket.emit('chat message', {
      timestamp: new Date(),
      username,
      message: state.message,
    });

    setState({
      message: null,
    });
  };

  return (
    <div>
      <Messages messages={chat.messages} />

      <form onSubmit={e => handleClick(e)}>
        <input
          style={styles.input}
          name="message"
          type="text"
          placeholder="Write something"
          value={state.message}
          onChange={handleChange}
          autoFocus
        />

        <button style={styles.button} type="submit" className="btn btn-default">
          Send
        </button>
      </form>
      {chat.userlist.users ? <UserList userlist={chat.userlist.users} /> : <Spinner />}
    </div>
  );
};

Chat.propTypes = {
  receiveUsers: PropTypes.func.isRequired,
  receiveMessage: PropTypes.func.isRequired,
  receiveUsername: PropTypes.func.isRequired,
  auth: PropTypes.object,
  chat: PropTypes.object,
};

const mapStateToProps = state => ({
  chat: state.chat,
  auth: state.auth,
});

export default connect(mapStateToProps, { receiveUsers, receiveMessage, receiveUsername })(Chat);

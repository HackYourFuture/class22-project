import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import styles from './styles/MessagesStyles';

const Messages = ({ username, messages }) => {
  const chat = useRef(null);

  const chatMessages = messages.map((chat, key) =>
    chat.username === username ? (
      <li style={styles.li} key={key}>
        <p style={styles.timestampText}>{moment(chat.timestamp).format('LLL')}</p>
        <p style={styles.messageText}>
          {chat.username}: {chat.message}
        </p>
      </li>
    ) : (
      <li style={styles.li1} key={key}>
        <p style={styles.timestampText}>{moment(chat.timestamp).format('LLL')}</p>
        <p style={styles.messageText}>
          {chat.username}: {chat.message}
        </p>
      </li>
    )
  );

  useEffect(() => {
    if (chat.current) {
      window.scrollTo(0, chat.current.scrollHeight);
    }
  }, [chatMessages]);

  return (
    <ul style={styles.ul} ref={chat}>
      {chatMessages}
    </ul>
  );
};

export default Messages;

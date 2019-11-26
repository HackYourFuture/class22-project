import React from 'react';
import styles from './styles/UserListStyles';

const UserList = ({ userlist }) => {
  const users = userlist.map((user, key) => (
    <li style={styles.li} key={key}>
      <p style={styles.online}>.</p>
      {user.username}
    </li>
  ));
  return (
    <div style={styles.container}>
      <p style={styles.title}>Online Users</p>
      <ul style={styles.ul}>{users}</ul>
    </div>
  );
};

export default UserList;

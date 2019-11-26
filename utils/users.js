const users = [];

const addUser = ({ id, username, room, userID }) => {
  //validate the data
  if (!username || !room) {
    return {
      error: 'Username and room are required',
    };
  }

  //Check existing user
  const existingUser = users.find(user => {
    return user.room === room && user.userID === userID;
  });

  if (existingUser) {
    return {
      error: 'User already exists',
    };
  }

  // Store user
  const user = { id, username, room, userID };
  users.push(user);
  return { user };
};

const removeUser = id => {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = id => users.find(user => user.id === id);

const getUsersInRoom = room => users.filter(user => user.room === room);

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};

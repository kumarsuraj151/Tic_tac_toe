const users = [];

const addUser = ({ id, name, room, player }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => {
    user.room === room && user.name === name;
  });

  if (existingUser) {
    return { error: "Username is taken" };
  }
  const user = { id, name, room, player };

  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => {
    user.id === id;
  });

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const countUser = (room) => {
  const data = getUsersInRoom(room);
  return data.length;
};

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

export { addUser, removeUser, getUser, getUsersInRoom, countUser };

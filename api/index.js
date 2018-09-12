import fs from 'fs';
import path from 'path';
import router from 'koa-route';
import uuid from 'uuid/v4';

const version = 1;
const api = {};
const findUserByUsername = (users, username) => users.find(user => user.username === username);
const checkUserPassword = (user, password) => user.password === password;
const writeUserWithToken = ({ users, user, token }) => {
  const updatedUser = {
    ...user,
    token,
  };
  const updatedUsers = users
    .filter(u => u.username !== user.username)
    .concat(updatedUser);

  fs.writeFileSync(path.resolve('./data/users.json'), JSON.stringify(updatedUsers));

  return user;
};
const login = (users, user) => {
  const token = uuid();

  return writeUserWithToken({ users, user, token });
};
const logout = (users, user) => {
  const token = '';

  return writeUserWithToken({ users, user, token });
};

api.root = router.get('/api', ctx => {
  ctx.body = {
    message: 'OK',
    version,
  };
});

api.authentication = {};
api.authentication.get = router.get('/api/v1/authentication', ctx => {
  ctx.body = fs.readFileSync(path.resolve('./data/authentication.json'));
});
api.authentication.post = router.post('/api/v1/authentication', ctx => {
  const body = ctx.request.body;
  const { username, password } = body;
  const users = JSON.parse(fs.readFileSync(path.resolve('./data/users.json')));
  const user = findUserByUsername(users, username);

  console.log(body)

  if (!user) {
    ctx.status = 404;
    return ctx.body = { error: 'User not found' };
  }

  const isAuthenticated = checkUserPassword(user, password);

  if (!isAuthenticated) {
    ctx.status = 401;
    return ctx.body = { error: 'Invalid username and/or password' };
  }

  console.log(body, users);

  login(users, user);
  ctx.body = { username };
});
api.authentication.delete = router.delete('/api/v1/authentication', ctx => {
  const data = ctx.request.body;
  const { username } = data;
  const users = JSON.parse(fs.readFileSync(path.resolve('./data/users.json')));
  const user = findUserByUsername(users, username);

  console.log('\n\n\n\n\nLOGOUT', data, username);

  logout(users, user);
  ctx.body = { username, message: `Goodbye ${username}` };
});

api.profile = {};
api.profile.get = router.get('/api/v1/profile', ctx => {
  ctx.body = fs.readFileSync(path.resolve('./data/profile.json'));
});
api.profile.post = router.post('/api/v1/profile', ctx => {
  const body = ctx.request.body;

  const previous = JSON.parse(fs.readFileSync(path.resolve('./data/profile.json')));
  const next = {
    ...previous,
    ...body,
  };

  fs.writeFileSync(path.resolve('./data/profile.json'), JSON.stringify(next));

  ctx.body = next;
});

export default api;

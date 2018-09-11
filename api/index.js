import fs from 'fs';
import path from 'path';
import router from 'koa-route';

const version = 1;
const api = {};

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

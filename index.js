import path from 'path';
import fs from 'fs';
import Koa from 'koa';
import logger from 'koa-logger';
import router from 'koa-route';
import render from 'koa-ejs';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import React from 'react';
import template from './app/views/template';
import App from './app/js/src/components/App';
import api from './api';

const app = new Koa();
const port = 3000;

app.use(logger());
app.use(bodyParser());

render(app, {
  root: path.join(__dirname, 'app', 'views'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: true,
});

app.use(serve('./app/js/dist'));

app.use(api.root);
app.use(api.profile.get);
app.use(api.profile.post);

app.use(router.get('*', async ctx => {
  const script = fs
    .readdirSync('./app/js/dist/')
    .find(file => file.indexOf('app-main') > -1);
  const context = {};
  const content = renderToString(
    <App.Server
      location={ctx.request.url}
      context={context}
    />
  );
  const markup = template({
    title: 'koa ssr',
    content,
    state: { profile: JSON.parse(fs.readFileSync('./data/profile.json')) },
    script,
  });

  ctx.body = markup;
}));

app.listen(port);

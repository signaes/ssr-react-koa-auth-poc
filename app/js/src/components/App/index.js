import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, StaticRouter, Route, Link } from 'react-router-dom';
import store from '../../redux/store';
import Profile from '../scenes/Profile';
import Authentication from '../scenes/Authentication';

const App = {};

App.Wrapper = ({ children, store }) => (
  <Provider store={store}>
    <div>
      <header>
        <h1>App</h1>
      </header>
      { children }
    </div>
  </Provider>
);

App.Routes = () => (
  <div>
    <nav>
      <Link to='/profile'>Profile</Link>
      <Link to='/login'>Authentication</Link>
    </nav>
    <Route path="/login" component={Authentication} />
    <Route path="/profile" component={Profile} />
  </div>
);

App.Client = () => (
  <App.Wrapper store={store.client(window)}>
    <BrowserRouter>
      <App.Routes />
    </BrowserRouter>
  </App.Wrapper>
);

App.Server = ({ location, context }) => (
  <App.Wrapper store={store.server()}>
    <StaticRouter location={location} context={context}>
      <App.Routes />
    </StaticRouter>
  </App.Wrapper>
);

export default App;

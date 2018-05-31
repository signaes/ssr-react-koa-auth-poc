import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';

ReactDom.hydrate(
  <App.Client />,
  document.getElementById('app')
);

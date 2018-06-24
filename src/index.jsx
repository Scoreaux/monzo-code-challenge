import React from 'react';
import { render } from 'react-dom';

import App from 'src/containers/App';

import 'src/assets/global.scss';

render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept('src/containers/App', () => {
    const NextApp = require('src/containers/App').default; // eslint-disable-line
    render(<NextApp />, document.getElementById('app'));
  });
}

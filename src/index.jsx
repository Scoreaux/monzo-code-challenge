import React from 'react';
import { render } from 'react-dom';
import dotenv from 'dotenv';

dotenv.config();

import App from 'components/App';

render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept('components/App', () => {
    const NextApp = require('components/App').default; // eslint-disable-line
    render(<NextApp />, document.getElementById('app'));
  });
}

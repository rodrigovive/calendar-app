import React from 'react';
import {render} from '@testing-library/react';
import App from '../app';

test('render app', () => {
  const {container, debug} = render(<App />);
  debug();
  expect(container.firstChild).not.toBeEmpty();
});

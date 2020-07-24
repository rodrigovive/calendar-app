import React from 'react';
import {render} from '@testing-library/react';
import App from '../app';

test('render app', () => {
  const {container, debug} = render(<App />);
  expect(container.firstChild).not.toBeEmptyDOMElement();
});

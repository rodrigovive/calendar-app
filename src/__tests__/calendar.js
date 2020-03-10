import React from 'react';
import Home from '../pages/home';
import {render} from 'render-provider';

test('renders correct month and year in specified date', () => {
  const date = new Date(2020, 2);
  const {queryByText, debug} = render(<Home date={date} />);
  const title = queryByText(/march - 2020/i);
  expect(title).toBeInTheDocument();
});

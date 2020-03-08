import React from 'react';
import {render, queryByText} from '@testing-library/react';
import Weeks from '../components/calendar/weeks';
import moment from 'moment';

test('render correct weeks', async () => {
  const weekdays = moment.weekdays();
  const {debug, queryByText} = render(<Weeks weekdays={weekdays} />);
  weekdays.map(week => expect(queryByText(week)).not.toBeNull());
});

test('render custom weeks', () => {
  const weekdays = ['sunday', 'saturday'];
  const {debug, queryByText} = render(<Weeks weekdays={weekdays} />);
  weekdays.map(week => expect(queryByText(week)).not.toBeNull());
});

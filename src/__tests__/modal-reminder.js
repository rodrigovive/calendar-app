import React from 'react';
import {render, fireEvent} from 'render-provider';
import ModalReminder from '../components/modal-reminder';
import moment from 'moment';

test('entering an invalid reminder text show an error  message', () => {
  const {debug, getByTestId, queryByTestId, getByLabelText, rerender} = render(
    <ModalReminder isOpen={true} />,
  );
  const input = getByLabelText(/reminder title/i);
  fireEvent.change(input, {
    target: {
      value: 'tes'.repeat(10),
      name: 'reminderText',
    },
  });
  expect(getByTestId('title-error-message')).toBeInTheDocument();
});

test('entering an valid reminder text dont show an error  message', () => {
  const {queryByTestId, getByLabelText} = render(
    <ModalReminder isOpen={true} />,
  );
  const input = getByLabelText(/reminder title/i);
  fireEvent.change(input, {
    target: {
      value: 'test',
      name: 'reminderText',
    },
  });
  expect(queryByTestId('title-error-message')).toBeNull();
});

test('add a new "reminder', () => {
  const {queryByTestId, getByLabelText, debug, container} = render(
    <ModalReminder isOpen={true} />,
  );
  const inputTitle = getByLabelText(/reminder title/i);
  const inputCity = getByLabelText(/city/i);
  const componentDay = queryByTestId(/day/i);
  const componentTime = queryByTestId(/time/i);
  const inputDate = componentDay.querySelector('[name="day"]');
  const inputTime = componentTime.querySelector('[name="time"]');
  const date = moment();
  fireEvent.change(inputTitle, {
    target: {
      value: 'test',
      name: 'reminderText',
    },
  });
  expect(inputTitle.value).toBe('test');
  fireEvent.change(inputCity, {
    target: {
      value: 'Tacna',
      name: 'city',
    },
  });
  expect(inputCity.value).toBe('Tacna');
  fireEvent.change(componentDay, date);
  expect(inputDate.value).toBe(date.format('MMMM Do'));
  fireEvent.change(componentTime, date);
  expect(inputTime.value).toBe(date.format('hh:mm A'));
});

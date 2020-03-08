import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import ModalReminder from '../components/modal-reminder';

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
  rerender(<ModalReminder isOpen={true} maxTextLength={31} />);
  expect(queryByTestId('title-error-message')).toBeNull();
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

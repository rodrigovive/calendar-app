import React from 'react';
import {render, fireEvent} from 'render-provider';
import FormReminder from '../components/form-reminder';

test('submit form', () => {
  const handleSubmit = jest.fn();
  const handleChange = jest.fn();
  const setValues = jest.fn();
  const {queryByTestId, getByLabelText, debug, container} = render(
    <FormReminder
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      setValues={setValues}
    />,
  );
  fireEvent.submit(queryByTestId('form'));
  expect(handleSubmit).toHaveBeenCalled();
});

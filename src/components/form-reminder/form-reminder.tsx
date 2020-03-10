import React, {ChangeEvent, FormEvent} from 'react';
import {
  Backdrop,
  Grid,
  Modal,
  Fade,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {Reminder, initialReminder} from 'types/reminder';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import {SketchPicker, ColorResult} from 'react-color';
import moment from 'moment';

interface Props {
  handleSubmit: (e: React.SyntheticEvent) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setValues: (updatedState: {color?: string; day?: any}) => void;
  values: Reminder;
  id?: string | number;
  maxTextLength: number;
}

const FormReminder = ({
  handleSubmit,
  values,
  id,
  maxTextLength,
  handleChange,
  setValues,
}: Props) => {
  const isValidText = values.reminderText.length >= maxTextLength;

  return (
    <form onSubmit={handleSubmit} data-testid="form">
      <Grid container direction="column" spacing={3}>
        <Grid item xs={12}>
          <TextField
            InputLabelProps={{shrink: true}}
            id="reminderText"
            error={isValidText}
            helperText={
              isValidText ? (
                <Typography
                  data-testid="title-error-message"
                  component={'span'}
                >
                  The text is too long!
                </Typography>
              ) : null
            }
            name="reminderText"
            label="Reminder title"
            value={values.reminderText}
            fullWidth
            onChange={handleChange}
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            InputLabelProps={{shrink: true}}
            id="city"
            fullWidth
            name="city"
            required
            label="City"
            value={values.city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <KeyboardDatePicker
            fullWidth
            label="Date"
            data-testid="day"
            autoOk
            variant="inline"
            value={values.day}
            onChange={date => {
              setValues({
                day: date,
              });
            }}
            name="day"
            KeyboardButtonProps={{
              'aria-label': 'reminder-date',
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <KeyboardTimePicker
            fullWidth
            id="time-picker"
            label="Time"
            variant="inline"
            data-testid="time"
            name="time"
            value={values.day}
            onChange={date => {
              if (date) {
                const [hour, min] = date.format('HH:mm').split(':');
                setValues({
                  day: values.day.clone().set({
                    hour: Number(hour),
                    minute: Number(min),
                  }),
                });
              }
            }}
            KeyboardButtonProps={{
              'aria-label': 'reminder-time',
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <SketchPicker
            color={values.color}
            onChange={(color: ColorResult) => {
              setValues({
                color: color.hex,
              });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveAltIcon />}
            type="submit"
          >
            {id ? 'Update' : 'Save'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

FormReminder.defaultProps = {
  values: initialReminder,
  maxTextLength: 30,
} as Partial<Props>;

export default FormReminder;

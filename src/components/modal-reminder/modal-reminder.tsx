import React from 'react';
import {
  Backdrop,
  Grid,
  Modal,
  Fade,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import useStyles from './styles';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import {Reminder, initialReminder} from 'types/reminder';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import useSetState from 'hooks/use-state';
import {SketchPicker, ColorResult} from 'react-color';
import {useReminderDispatch} from 'context/reminder';
import moment from 'moment';

type Props = {
  isOpen: boolean;
  setModalOpen: (status: boolean) => void;
  reminder: Reminder;
  maxTextLength: number;
};

const ModalReminder = ({
  isOpen,
  setModalOpen,
  reminder: {day, reminderText, city, color, id},
  maxTextLength,
}: Props) => {
  const dispatch = useReminderDispatch();
  const classes = useStyles();
  const [values, setValues] = useSetState(initialReminder);
  const clearStates = () => {
    setValues({
      day: day,
      reminderText: '',
      city: '',
      color: '',
    });
  };
  const handleClose = () => {
    setModalOpen(false);
    clearStates();
  };
  const isValidText = values.reminderText.length >= maxTextLength;
  React.useEffect(() => {
    if (id) {
      setValues({
        day,
        reminderText,
        city,
        color,
      });
    } else {
      clearStates();
    }
  }, [day, reminderText, city, color, id]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (id) {
      dispatch({
        type: 'update',
        payload: values,
      });
    } else {
      dispatch({
        type: 'add',
        payload: values,
      });
    }
    setModalOpen(false);
    clearStates();
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setValues({
      [e.target.name]: e.target.value,
    });
  };
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          classes: {
            root: classes.backDrop,
          },
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <Typography id="transition-modal-title" variant="h5">
              {id ? `Edit reminder ${id}` : 'New reminder'}
            </Typography>
            <form onSubmit={handleSubmit}>
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
                    label="Date"
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
                    id="time-picker"
                    label="Time"
                    variant="inline"
                    name="day"
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
          </div>
        </Fade>
      </Modal>
    </MuiPickersUtilsProvider>
  );
};
ModalReminder.defaultProps = {
  reminder: initialReminder,
  isOpen: false,
  maxTextLength: 30,
};

export default ModalReminder;

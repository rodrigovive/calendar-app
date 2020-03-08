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
  const classes = useStyles();
  const handleClose = () => {
    setModalOpen(false);
  };
  const [values, setValues] = useSetState(initialReminder);
  const isValidText = values.reminderText.length >= maxTextLength;
  React.useEffect(() => {
    setValues({
      day,
      reminderText,
      city,
      color,
    });
  }, [day, reminderText, city, color]);
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(values);
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
                    margin="normal"
                    id="time-picker"
                    label="Time"
                    variant="inline"
                    name="day"
                    value={values.day}
                    onChange={date => {
                      setValues({
                        day: date,
                      });
                    }}
                    KeyboardButtonProps={{
                      'aria-label': 'reminder-time',
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

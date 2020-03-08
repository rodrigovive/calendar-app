import React from 'react';
import {
  Backdrop,
  Grid,
  Modal,
  Fade,
  TextField,
  Button,
} from '@material-ui/core';
import useStyles from './styles';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import {Reminder, initialReminder} from 'types/reminder';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

type Props = {
  isOpen: boolean;
  setModalOpen: (status: boolean) => void;
  reminder: Reminder;
  setReminder: (values: Reminder) => void;
};

const ReminderSchema = Yup.object().shape({
  reminderText: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  city: Yup.string().required('Required'),
});

const ModalReminder = ({
  isOpen,
  setModalOpen,
  reminder: {day, reminderText, city, time, color, id},
  setReminder,
}: Props) => {
  const classes = useStyles();
  const handleClose = () => {
    setModalOpen(false);
  };
  const formik = useFormik<Reminder>({
    initialValues: {
      reminderText,
      city,
      day,
      //time: date.d('HH:mm'),
      time,
      color,
    },
    validationSchema: ReminderSchema,
    onSubmit: values => {
      console.log('values', values);
    },
  });
  React.useEffect(() => {
    formik.setValues({
      day,
      reminderText,
      city,
      time,
      color,
    });
  }, [day, reminderText, city, time, color]);
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
            <h2 id="transition-modal-title">
              {id ? `Remind ${id}` : 'New reminder'}
            </h2>
            <form onSubmit={formik.handleSubmit}>
              <Grid container direction="column" spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    InputLabelProps={{shrink: true}}
                    id="reminderText"
                    error={Boolean(
                      formik.touched['reminderText'] &&
                        formik.errors['reminderText'],
                    )}
                    helperText={
                      formik.touched['reminderText']
                        ? formik.errors['reminderText']
                        : ''
                    }
                    name="reminderText"
                    label="Text"
                    value={formik.values['reminderText']}
                    fullWidth
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    InputLabelProps={{shrink: true}}
                    id="city"
                    error={Boolean(
                      formik.touched['city'] && formik.errors['city'],
                    )}
                    helperText={
                      formik.touched['city'] ? formik.errors['city'] : ''
                    }
                    fullWidth
                    name="city"
                    required
                    label="City"
                    value={formik.values['city']}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <KeyboardDatePicker
                    label="Date"
                    autoOk
                    variant="inline"
                    value={formik.values.day}
                    onChange={date => {
                      formik.setFieldTouched('day');
                      formik.setFieldValue('day', date);
                    }}
                    name="date"
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
                    name="time"
                    value={formik.values.time}
                    onChange={date => {
                      formik.setFieldTouched('time');
                      formik.setFieldValue('time', date);
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
};

export default ModalReminder;

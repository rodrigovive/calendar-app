import React from 'react';
import {Backdrop, Modal, Fade, Typography} from '@material-ui/core';
import useStyles from './styles';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import {Reminder, initialReminder} from 'types/reminder';
import useSetState from 'hooks/use-state';
import {
  useReminderDispatch,
  ADD_REMINDER,
  UPDATE_REMINDER,
  getForecastByCity,
} from 'context/reminder';
import * as shortid from 'shortid';
import moment from 'moment';
import FormReminder from 'components/form-reminder';

type Props = {
  isOpen: boolean;
  setModalOpen: (status: boolean) => void;
  reminder: Reminder;
};

const ModalReminder = ({
  isOpen,
  setModalOpen,
  reminder: {day, reminderText, city, color, id},
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
    const reminderData = {
      ...values,
      id: id || shortid.generate(),
    };
    if (id) {
      dispatch({
        type: UPDATE_REMINDER,
        payload: reminderData,
      });
    } else {
      dispatch({
        type: ADD_REMINDER,
        payload: reminderData,
      });
    }
    const currentMax = moment().add(5, 'day');
    if (values.day < currentMax && values.day > moment()) {
      getForecastByCity(dispatch, reminderData);
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
            {id ? `Edit reminder` : 'New reminder'}
          </Typography>
          <FormReminder
            handleSubmit={handleSubmit}
            values={values}
            handleChange={handleChange}
            id={id}
            setValues={setValues}
          />
        </div>
      </Fade>
    </Modal>
  );
};
ModalReminder.defaultProps = {
  reminder: initialReminder,
  isOpen: false,
};

export default ModalReminder;

import React from 'react';
import {Typography} from '@material-ui/core';
import useStyles from './styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import {useReminderDispatch, DELETE_REMINDER} from 'context/reminder';
import {Reminder, initialReminder} from 'types/reminder';
interface Props {
  reminder: Reminder;
}

const Note = ({
  reminder: {day, reminderText, city, color, id, forecast},
}: Props) => {
  const classes = useStyles({
    bgColor: color,
  });
  const dispatch = useReminderDispatch();

  return (
    <div className={classes.root}>
      <Typography align="left" variant="subtitle2">
        <Typography variant="subtitle2" component={'span'}>
          {day.clone().format('HH:mm')}{' '}
          <Typography variant="subtitle2" component={'span'}>
            {reminderText}
          </Typography>
        </Typography>{' '}
      </Typography>
      {forecast && (
        <Typography variant="subtitle2">Forecast: {forecast}</Typography>
      )}
      <Tooltip title="Delete">
        <DeleteIcon
          fontSize="small"
          className={classes.icon}
          onClick={e => {
            e.stopPropagation();
            dispatch({
              type: DELETE_REMINDER,
              payload: {day, reminderText, city, color, id, forecast},
            });
          }}
        />
      </Tooltip>
    </div>
  );
};
Note.defaultProps = {
  reminder: initialReminder,
} as Partial<Props>;

export default Note;

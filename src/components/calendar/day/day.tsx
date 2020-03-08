import React from 'react';
import {Typography} from '@material-ui/core';
import useStyles from './styles';
import moment, {Moment} from 'moment';
import {Reminder, initialReminder} from 'types/reminder';

type Props = {
  weekCalendar: Moment[];
  setModalOpen: (isOpen: boolean) => void;
  setReminder: (values: Reminder) => void;
};

const Day: React.FC<Props> = ({weekCalendar, setModalOpen, setReminder}) => {
  const classes = useStyles();
  return (
    <div className={classes.containerTable}>
      <div className={classes.containerBg}>
        <table className={classes.tableBg}>
          <tbody>
            <tr>
              {weekCalendar.map((day, idx) => (
                <td key={idx} className={classes.rowBg} />
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className={classes.containerRowTable}>
        <table>
          <thead>
            <tr>
              {weekCalendar.map((day, idx) => (
                <td
                  key={idx}
                  className={classes.rowHead}
                  onClick={() => {
                    setReminder({
                      ...initialReminder,
                      day,
                    });
                    setModalOpen(true);
                  }}
                >
                  <Typography color="inherit" align="left">
                    {day.date()}
                  </Typography>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {weekCalendar.map((day, idx) => (
                <td
                  key={idx}
                  className={classes.rowBody}
                  onClick={e => {
                    e.stopPropagation();
                    setReminder({
                      ...initialReminder,
                      reminderText: `Note ${idx + 1}`,
                      id: idx + 1,
                    });
                    setModalOpen(true);
                  }}
                >
                  <Typography align="left">Note {idx + 1}</Typography>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Day;

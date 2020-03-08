import React from 'react';
import {Typography} from '@material-ui/core';
import useStyles from './styles';
import {Moment} from 'moment';

type Props = {
  weekCalendar: Moment[];
};

const Day: React.FC<Props> = ({weekCalendar}) => {
  const classes = useStyles();
  return (
    <div className={classes.containerTable}>
      <div className={classes.containerBg}>
        <table className={classes.tableBg}>
          <tbody>
            <tr>
              {weekCalendar.map((_, idx) => (
                <td key={idx} className={classes.rowBg} />
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              {weekCalendar.map((day, idx) => (
                <td key={idx} className={classes.rowHead}>
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
                <td key={idx} className={classes.rowBody}>
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

import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import useStyles from './styles';
import moment from 'moment';

interface Props {
  weekdays: string[];
}

const Weeks = ({weekdays}: Props) => {
  const classes = useStyles();
  return (
    <table className={classes.table}>
      <thead>
        <tr>
          {weekdays.map((week, idx) => (
            <th key={idx}>
              <Typography align="center" className={classes.text}>
                {week}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
    </table>
  );
};

Weeks.defaultProps = {
  weekdays: moment.weekdays(),
} as Partial<Props>;

export default Weeks;

import React from 'react';
import {Typography} from '@material-ui/core';
import useStyles from './styles';

interface Props {
  text: string;
  color: string;
  time: string;
  forecast?: string;
}

const Note = ({text, color, time, forecast}: Props) => {
  const classes = useStyles({
    bgColor: color,
  });
  return (
    <div className={classes.root}>
      <Typography align="left">
        <Typography component={'span'}>{time}</Typography> {text}{' '}
        {forecast || ''}
      </Typography>
    </div>
  );
};
Note.defaultProps = {
  text: 'note',
  color: 'blue',
} as Partial<Props>;

export default Note;

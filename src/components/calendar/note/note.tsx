import React from 'react';
import {Typography} from '@material-ui/core';
import useStyles from './styles';

interface Props {
  text: string;
  color: string;
}

const Note = ({text, color}: Props) => {
  const classes = useStyles({
    bgColor: color,
  });
  return (
    <div className={classes.root}>
      <Typography align="left">{text}</Typography>
    </div>
  );
};
Note.defaultProps = {
  text: 'note',
  color: 'blue',
} as Partial<Props>;

export default Note;

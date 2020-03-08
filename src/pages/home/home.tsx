import React from 'react';
import {Grid, Typography, Button} from '@material-ui/core';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Calendar from 'components/calendar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import moment from 'moment';
import useCalendar from './use-calendar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    containerCalendar: {
      width: '80%',
    },
    containerHeader: {
      padding: '1rem',
      marginBottom: '1rem',
    },
  }),
);

interface Props {
  date: Date;
}

const Home = ({date}: Props) => {
  const classes = useStyles();
  const [{days, month, year, monthString}, setCalendar] = useCalendar(date);
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Grid item className={classes.containerCalendar}>
        <Grid
          container
          alignItems="center"
          justify="space-evenly"
          className={classes.containerHeader}
        >
          <Grid item>
            <ArrowBackIosIcon
              onClick={() => setCalendar(new Date(year, month - 1))}
            />
          </Grid>
          <Grid item>
            <Typography>
              {monthString} - {year}
            </Typography>
          </Grid>
          <Grid item>
            <ArrowForwardIosIcon
              onClick={() => setCalendar(new Date(year, month + 1))}
            />
          </Grid>
        </Grid>
        <Calendar days={days} />
      </Grid>
    </Grid>
  );
};

Home.defaultProps = {
  date: new Date(),
} as Partial<Props>;

export default Home;

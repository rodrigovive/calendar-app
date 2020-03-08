import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
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

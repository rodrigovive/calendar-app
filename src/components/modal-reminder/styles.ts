import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    backDrop: {
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
  }),
);

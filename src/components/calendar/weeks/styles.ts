import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      borderSpacing: '0',
      tableLayout: 'fixed',
    },
    text: {
      color: 'white',
      fontWeight: 'bold',
    },
  }),
);

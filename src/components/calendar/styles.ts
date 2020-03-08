import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    table: {
      width: '100%',
      tableLayout: 'fixed',
      borderCollapse: 'collapse',
      borderSpacing: '0',
      '& > tbody > tr > td, & > thead > tr > td': {
        padding: '0',
        verticalAlign: 'top',
      },
    },
    tableHead: {
      backgroundColor: theme.palette.primary.main,
    },
  }),
);

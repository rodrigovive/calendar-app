import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    containerTable: {
      position: 'relative',
      zIndex: 1,
      '& table': {
        width: '100%',
        borderCollapse: 'collapse',
        borderSpacing: '0',
        tableLayout: 'fixed',
      },
    },
    tableBg: {
      height: '100%',
    },
    rowHead: {
      padding: '0.5rem',
      borderColor: 'transparent',
    },
    rowBody: {
      padding: '0.4rem 0.5rem',
    },
    containerBg: {
      position: 'absolute',
      top: '0',
      left: '0',
      bottom: '0',
      right: '0',
    },
    rowBg: {
      borderStyle: 'solid',
      borderWidth: '1px',
      verticalAlign: 'top',
      padding: '0',
      '&:first-child, &:last-child': {
        backgroundColor: 'rgba(52,40,104,.06)',
      },
    },
  }),
);

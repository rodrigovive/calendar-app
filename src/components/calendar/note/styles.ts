import {makeStyles} from '@material-ui/core/styles';

type NoteTypes = {
  bgColor: string;
};

export default makeStyles<{}, NoteTypes>({
  root: {
    backgroundColor: ({bgColor}) => bgColor,
    '&:hover': {
      boxShadow: 'inset 15px 15px 15px 15px rgba(0,0,0, .2)',
      backgroundColor: ({bgColor}) => bgColor,
      cursor: 'pointer',
    },
    padding: '0 0.3rem',
  },
});

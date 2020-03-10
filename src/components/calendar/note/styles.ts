import {makeStyles} from '@material-ui/core/styles';

type NoteTypes = {
  bgColor: string;
};

export default makeStyles<{}, NoteTypes>({
  root: {
    backgroundColor: ({bgColor}) => bgColor,
    '&:hover': {
      //boxShadow: 'inset 15px 15px 15px 15px rgba(0,0,0, .2)',
      backgroundColor: ({bgColor}) => bgColor,
      cursor: 'pointer',
      boxShadow: '0.1rem 0.2rem 0.2rem rgba(0,0,0,.2)',
    },
    padding: '0 0.3rem',
    wordBreak: 'break-word',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

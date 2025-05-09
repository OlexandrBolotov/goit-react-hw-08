import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filters/slice';
import { selectNameFilter } from '../../redux/filters/selectors';

import { TextField, Box } from '@mui/material';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleChange = e => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        label="Find contact by name or number"
        variant="outlined"
        value={filter}
        onChange={handleChange}
        fullWidth
      />
    </Box>
  );
};

export default Filter;

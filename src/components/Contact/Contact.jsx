import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact, updateContact } from '../../redux/contacts/operations';
import { toast } from 'react-hot-toast';

import {
  Box,
  Paper,
  TextField,
  Typography,
  IconButton,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [edited, setEdited] = useState({
    name: contact.name,
    number: contact.number,
  });

  const handleDialogOpen = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);

  const handleEditToggle = () => {
    setIsEditing(prev => !prev);
    setEdited({ name: contact.name, number: contact.number });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setEdited(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (
      edited.name === contact.name &&
      edited.number === contact.number
    ) {
      toast('No changes made');
      return;
    }

    try {
      await dispatch(updateContact({ id: contact.id, contact: edited })).unwrap();
      toast.success('Contact updated!');
      setIsEditing(false);
    } catch {
      toast.error('Failed to update');
    }
  };

  const handleDeleteConfirmed = async () => {
    try {
      await dispatch(deleteContact(contact.id)).unwrap();
      toast.success('Contact deleted!');
    } catch {
      toast.error('Failed to delete');
    } finally {
      handleDialogClose();
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      {isEditing ? (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <TextField
            label="Name"
            name="name"
            value={edited.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Number"
            name="number"
            value={edited.number}
            onChange={handleChange}
            fullWidth
          />
          <Stack direction="row" spacing={1}>
            <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
              Save
            </Button>
            <Button type="button" onClick={handleEditToggle} variant="outlined" startIcon={<CloseIcon />}>
              Cancel
            </Button>
          </Stack>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="subtitle1">👤 {contact.name}</Typography>
            <Typography variant="body2">📞 {contact.number}</Typography>
          </Box>
          <Box>
            <IconButton onClick={handleEditToggle}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDialogOpen} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      )}

      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>{contact.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirmed} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Contact;

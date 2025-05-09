import { useSelector } from 'react-redux';
import {
  selectFilteredContacts,
  selectLoading,
  selectError,
} from '../../redux/contacts/selectors';
import Contact from '../Contact/Contact';
import { Typography, CircularProgress, Alert, Stack } from '@mui/material';

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  return (
    <>
      {loading && <CircularProgress sx={{ mb: 2 }} />}
      {error && <Alert severity="error">{error}</Alert>}

      <Stack spacing={2} component="ul" sx={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {contacts.map(contact => (
          <li key={contact.id}>
            <Contact contact={contact} />
          </li>
        ))}
      </Stack>
    </>
  );
};

export default ContactList;

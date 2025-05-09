import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addContact } from '../../redux/contacts/operations';
import { selectContacts } from '../../redux/contacts/selectors';
import { toast } from 'react-hot-toast';
import { TextField, Button, Box } from '@mui/material';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const initialValues = {
    name: '',
    number: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(3).required('Required'),
    number: Yup.string().min(5).required('Required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const isDuplicate = contacts.some(
      c => c.name.toLowerCase() === values.name.toLowerCase()
    );

    if (isDuplicate) {
      toast.error(`${values.name} is already in contacts`);
      return;
    }

    try {
      await dispatch(addContact(values)).unwrap();
      toast.success('Contact added!');
      resetForm();
    } catch  {
      toast.error('Failed to add contact');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <Form>
          <Box display="flex" flexDirection="column" gap={2}>
            <Field
              as={TextField}
              label="Name"
              name="name"
              fullWidth
              variant="outlined"
            />
            <ErrorMessage name="name" component="div" style={{ color: 'red' }} />

            <Field
              as={TextField}
              label="Number"
              name="number"
              fullWidth
              variant="outlined"
            />
            <ErrorMessage name="number" component="div" style={{ color: 'red' }} />

            <Button type="submit" variant="contained" color="primary">
              Add contact
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;

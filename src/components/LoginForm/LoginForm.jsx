import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import { toast } from 'react-hot-toast';
import { TextField, Button, Box } from '@mui/material';

const LoginForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6).required('Required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(login(values)).unwrap();
      toast.success('Logged in!');
      resetForm();
    } catch {
      toast.error('Login failed');
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
          <Field
            name="email"
            as={TextField}
            label="Email"
            fullWidth
            margin="normal"
          />

          <Field
            name="password"
            type="password"
            as={TextField}
            label="Password"
            fullWidth
            margin="normal"
          />

          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Log In
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;

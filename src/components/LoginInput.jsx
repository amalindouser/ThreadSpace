import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { useFormik } from 'formi';

// Function to validate email format
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(String(email).toLowerCase());
}

export default function LoginInput({ login }) {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClickVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const errors = {};

      // Validate email
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!validateEmail(values.email)) {
        errors.email = 'Invalid email address';
      }

      // Validate password
      if (!values.password) {
        errors.password = 'Password is required';
      }

      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      login(values)
        .catch((error) => {
          setErrorMessage(error.message);
          setSubmitting(false);
        });
    },
  });

  return (
    <Box as="form" onSubmit={formik.handleSubmit} bg="white" p={4} borderRadius="md">
      <FormControl mt={4} id="email" isRequired isInvalid={formik.touched.email && formik.errors.email}>
        <FormLabel color="black">Email address</FormLabel>
        <Input
          type="email"
          focusBorderColor="#63B3ED"
          {...formik.getFieldProps('email')}
          placeholder="Email"
          aria-invalid={formik.touched.email && formik.errors.email ? 'true' : 'false'}
        />
        {formik.touched.email && formik.errors.email && (
          <Box color="red.500" mt={2}>{formik.errors.email}</Box>
        )}
      </FormControl>
      <FormControl mt={4} id="password" isRequired isInvalid={formik.touched.password && formik.errors.password}>
        <FormLabel color="black">Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? 'text' : 'password'}
            focusBorderColor="#63B3ED"
            {...formik.getFieldProps('password')}
            placeholder="Password"
            aria-invalid={formik.touched.password && formik.errors.password ? 'true' : 'false'}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClickVisibility}
              bg="transparent"
            >
              {showPassword ? <AiOutlineEyeInvisible color="black" /> : <AiOutlineEye color="black" />}
            </Button>
          </InputRightElement>
        </InputGroup>
        {formik.touched.password && formik.errors.password && (
          <Box color="red.500" mt={2}>{formik.errors.password}</Box>
        )}
      </FormControl>
      {errorMessage && (
        <Box color="red.500" mt={2} className="error-message">{errorMessage}</Box>
      )}
      <Button w="full" mt="6" colorScheme="teal" variant="solid" type="submit">
        Log In
      </Button>
    </Box>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

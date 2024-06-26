/* eslint-disable no-unused-vars */
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
import { useFormik } from 'formik';
import useInput from '../hooks/useInput';

// Function to validate email format
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(String(email).toLowerCase());
}

export default function LoginInput({ login }) {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const email = useInput('');
  const password = useInput('');

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
        .then(() => {
          setErrorMessage('');
          email.resetValue(); // Reset email input
          password.resetValue(); // Reset password input
        })
        .catch((error) => {
          setErrorMessage('Invalid email or password'); // Set custom error message
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <Box as="form" onSubmit={formik.handleSubmit} bg="white" p={4} borderRadius="md">
      <FormControl mt={4} id="email" isRequired isInvalid={formik.touched.email && formik.errors.email}>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          focusBorderColor="#63B3ED"
          value={email.value}
          onChange={(e) => {
            email.handleValueChange(e);
            formik.setFieldValue('email', e.target.value);
          }}
          onBlur={formik.handleBlur}
          placeholder="Email"
          aria-invalid={formik.touched.email && formik.errors.email ? 'true' : 'false'}
        />
        {formik.touched.email && formik.errors.email && (
          <Box color="red.500" mt={2}>{formik.errors.email}</Box>
        )}
      </FormControl>
      <FormControl mt={4} id="password" isRequired isInvalid={formik.touched.password && formik.errors.password}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? 'text' : 'password'}
            focusBorderColor="#63B3ED"
            value={password.value}
            onChange={(e) => {
              password.handleValueChange(e);
              formik.setFieldValue('password', e.target.value);
            }}
            onBlur={formik.handleBlur}
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
      <Button
        w="full"
        mt="6"
        colorScheme="teal"
        variant="solid"
        type="submit"
        disabled={formik.isSubmitting}
      >
        Login
      </Button>
    </Box>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

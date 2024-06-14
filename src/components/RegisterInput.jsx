import React, { useState } from 'react';
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

// Fungsi validasi
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(String(email).toLowerCase());
}

function validatePassword(password) {
  return password.length >= 8;
}

export default function RegisterInput({ register }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // useFormik hook untuk penanganan form
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: (values, { resetForm }) => {
      register(values);
      resetForm();
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = 'Name is required';
      }
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!validateEmail(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Password is required';
      } else if (!validatePassword(values.password)) {
        errors.password = 'Password must be at least 8 characters';
      }
      return errors;
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          focusBorderColor="teal.400"
          {...formik.getFieldProps('name')}
        />
        {formik.touched.name && formik.errors.name && (
          <Alert status="error" mt={2}>
            <AlertIcon />
            {formik.errors.name}
          </Alert>
        )}
      </FormControl>

      <FormControl mt={4} id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          focusBorderColor="teal.400"
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email && (
          <Alert status="error" mt={2}>
            <AlertIcon />
            {formik.errors.email}
          </Alert>
        )}
      </FormControl>

      <FormControl mt={4} id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            focusBorderColor="teal.400"
            type={showPassword ? 'text' : 'password'}
            {...formik.getFieldProps('password')}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClickVisibility}>
              {showPassword ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        {formik.touched.password && formik.errors.password && (
          <Alert status="error" mt={2}>
            <AlertIcon />
            {formik.errors.password}
          </Alert>
        )}
      </FormControl>

      <Button w="full" mt={6} colorScheme="teal" variant="solid" type="submit">
        Sign Up
      </Button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

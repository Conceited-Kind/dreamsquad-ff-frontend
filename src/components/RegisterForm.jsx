import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
});

function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await register(values.username, values.email, values.password);
      navigate('/');
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-dream-blue bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Register</h2>
        <Formik
          initialValues={{ username: '', email: '', password: '' }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-dream-green"
                />
                {errors.username && touched.username ? (
                  <div className="text-red-400 text-sm mt-1">{errors.username}</div>
                ) : null}
              </div>
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-dream-green"
                />
                {errors.email && touched.email ? (
                  <div className="text-red-400 text-sm mt-1">{errors.email}</div>
                ) : null}
              </div>
              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-dream-green"
                />
                {errors.password && touched.password ? (
                  <div className="text-red-400 text-sm mt-1">{errors.password}</div>
                ) : null}
              </div>
              {errors.submit && <div className="text-red-400 text-sm mt-1">{errors.submit}</div>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-dream-green text-white p-3 rounded-lg hover:bg-green-600 transition duration-200 font-semibold"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-center text-gray-300 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-dream-green hover:text-green-300">Login</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Image,
  Header,
  Segment,
  Grid,
  Form,
  Icon,
  Loader,
  Dimmer,
} from "semantic-ui-react";
import { Formik } from "formik";
import * as Yup from "yup";
import Logo from "../../../assets/images/logo.png";
import { ToastContext } from "../../../context/toastContext";
import { AuthContext } from "../../../context/authContext";
import "../../../scss/auth.scss";

const validationSchema = () =>
  Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, `Password has to be at least ${6} characters!`)
      .required("Password is required"),
  });

const getErrorsFromValidation = (validationError) => {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce(
    (errors, error) => ({
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    }),
    {}
  );
};

const validate = (getValidationSchema) => (values) => {
  const schema = getValidationSchema(values);
  try {
    schema.validateSync(values, { abortEarly: false });
    return {};
  } catch (error) {
    return getErrorsFromValidation(error);
  }
};

const initialValues = {
  username: "",
  password: "",
};

const Login = () => {
  const toast = useContext(ToastContext);
  const authContext = useContext(AuthContext);
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const defaultUserName = process.env.REACT_APP_USERNAME;
  const defaultPassword = process.env.REACT_APP_PASSWORD;
  const defaultToken = process.env.REACT_APP_TOKEN;

  useEffect(() => {
    if (authContext.isExpired()) {
      toast.addToast("ERROR", "Session expired please login again", "error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setSubmitting(true);
    if (
      values.username === defaultUserName &&
      values.password === defaultPassword
    ) {
      setLoading(false);
      let authInfo = {
        token: {
          token: defaultToken,
          expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
        auth: { username: process.env.USERNAME },
      };
      authContext.setAuthState(authInfo);
      setTimeout(() => {
        setRedirectOnLogin(true);
      }, 700);
    } else {
      toast.addToast("ERROR", "UserName and Password is incorrect", "error");
      setLoading(false);
    }
  };

  return (
    <div className="flex-row align-items-center">
      {redirectOnLogin && <Redirect to="/admin/dashboard" />}
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: "50%" }}>
          <Formik
            initialValues={initialValues}
            validate={validate(validationSchema)}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid,
            }) => (
              <Form size="large" loading={isSubmitting} onSubmit={handleSubmit}>
                <Segment
                  raised
                  style={{
                    padding: "50px",
                    background: "#f5f5f5",
                  }}
                >
                  <Header
                    as="h3"
                    style={{ color: "#0d787a" }}
                    textAlign="center"
                  >
                    <Image src={Logo} style={{ width: "20vh" }} />
                    <p style={{ color: "#0d787a" }}>Log-in to your account</p>
                  </Header>

                  <Form.Input
                    icon="user"
                    iconPosition="left"
                    required
                    fluid
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    valid={touched.username && !errors.username}
                    invalid={touched.username && !!errors.username}
                    error={errors.username !== undefined}
                    placeholder="Username - admin"
                    className="auth-input-field"
                  />
                  <Form.Input
                    required
                    fluid
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password !== undefined}
                    placeholder="Password - 123456"
                    autoComplete="current-password"
                    icon={
                      <Icon
                        name="lock"
                        link
                        onClick={() => setShowPassword((preState) => !preState)}
                      />
                    }
                    iconPosition="left"
                    className="auth-input-field"
                  />

                  <Button
                    type="submit"
                    className="px-4"
                    style={{
                      background: "#0d787a",
                      color: "white",
                      fontSize: "15px",
                    }}
                    fluid
                    size="large"
                    disabled={isSubmitting || !isValid || loading}
                  >
                    Login
                  </Button>
                </Segment>
              </Form>
            )}
          </Formik>
        </Grid.Column>
      </Grid>

      {loading && (
        <div
          className="align-items-center justify-content-center"
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            background: "rgba(0,0,0,0.8)",
            zIndex: "999",
          }}
        >
          <Grid
            textAlign="center"
            style={{ height: "100vh" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <div style={{ display: loading ? "block" : "none" }}>
                <Dimmer active>
                  <Loader content="Loading" />
                </Dimmer>
              </div>
            </Grid.Column>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Login;

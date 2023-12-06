import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./AuthForm.css";
/**Login user */

const AuthForm = (props) => {
  const [valid, setValid] = useState(true);
  const checkLogin = async (values) => {
    //Call login function, if it returns invalid show error message
    if ((await props.login(values)) === "invalid") {
      setValid(false);
    } else {
      await props.login(values);
    }
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(25, "Must be 25 Characters or less")
        .required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      checkLogin(values);
    },
  });

  return (
    <>
      <Form className="AuthForm-form">
        <Form.Group className="mb-3">
          <Form.Label htmlFor="username" className="AuthForm-label">
            Username
          </Form.Label>
          <Form.Control
            className="AuthForm-input"
            onChange={formik.handleChange}
            type="text"
            autoComplete="username"
            placeholder="......."
            id="username"
            name="username"
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <p className="AuthForm-errors">{formik.errors.username}</p>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="AuthForm-label">Password</Form.Label>
          <Form.Control
            className="AuthForm-input"
            onChange={formik.handleChange}
            type="password"
            autoComplete="current-password"
            placeholder="......."
            id="password"
            name="password"
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="AuthForm-errors">{formik.errors.password}</p>
          ) : null}
          {valid === false ? (
            <p className="AuthForm-errors">Invalid username/password</p>
          ) : null}
        </Form.Group>
        <Button
          variant="dark"
          className="AuthForm-btn"
          onClick={formik.handleSubmit}>
          Join
        </Button>
      </Form>
    </>
  );
};

export default AuthForm;

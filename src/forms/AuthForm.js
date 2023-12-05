import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          onChange={formik.handleChange}
          type="text"
          autoComplete="username"
          placeholder="username"
          id="username"
          name="username"
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <p>{formik.errors.username}</p>
        ) : null}
        <label>Password</label>
        <input
          onChange={formik.handleChange}
          type="password"
          autoComplete="current-password"
          placeholder="password"
          id="password"
          name="password"
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <p>{formik.errors.password}</p>
        ) : null}
        {valid === false ? <p>Invalid username/password</p> : null}
        <button>Go!</button>
      </form>
    </>
  );
};

export default AuthForm;

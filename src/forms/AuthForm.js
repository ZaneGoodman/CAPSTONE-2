import React, { useState } from "react";

/**Login user */

const AuthForm = (props) => {
  const INITIAL_STATE = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.login(formData);
    setFormData(INITIAL_STATE);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          onChange={handleChange}
          id="username"
          name="username"
          value={formData.username}
        />
        <label>Password</label>
        <input
          onChange={handleChange}
          id="password"
          name="password"
          value={formData.password}
        />
        <button>Go!</button>
      </form>
    </>
  );
};

export default AuthForm;

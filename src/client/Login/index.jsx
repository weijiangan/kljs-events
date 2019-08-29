import React, { useState, useCallback } from "react";
import styles from "./style.css";

function Login(props) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = useCallback(
    event => {
      const { name, value } = event.target;
      setForm(s => ({ ...s, [name]: value }));
    },
    [setForm]
  );

  const handleSubmit = useCallback(event => {
    event.preventDefault();
  }, []);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email address</label>
          <input
            type="email"
            name="email"
            value={form.value}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.value}
            onChange={handleChange}
          />
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;

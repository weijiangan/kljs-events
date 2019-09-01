import React, { useState, useCallback, useContext } from "react";

const FormContext = React.createContext();

function useForm(initialState) {
  const [form, setForm] = useState(initialState);
  const formRef = React.useRef();
  formRef.current = form;

  const handleChange = useCallback(
    event => {
      const { name, value } = event.target;
      setForm(prevState => ({ ...prevState, [name]: value }));
    },
    [setForm]
  );

  const context = useCallback(
    props => {
      return (
        <FormContext.Provider
          {...props}
          value={{ form: formRef.current, handleChange }}
        />
      );
    },
    [FormContext, handleChange]
  );

  return [form, context];
}

function Input({ name, ...props }) {
  const context = useContext(FormContext);
  return (
    <input
      {...props}
      name={name}
      value={context.form[name]}
      onChange={context.handleChange}
    />
  );
}

export { useForm, Input };

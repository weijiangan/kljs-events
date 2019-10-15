import React, { useState, useRef, useCallback, useMemo } from "react";

const FormContext = React.createContext();

function RefInput({ state, setState, handleChange, type = "text", ...props }) {
  return (
    <input type={type} value={state.value} onChange={handleChange} {...props} />
  );
}

function useInput(ref, validator) {
  const [state, setState] = useState(ref.current);
  ref.current = state;
  const handleChange = useCallback(
    event => {
      const { value } = event.target;
      setState({
        value,
        valid: validator ? validator(value) : null
      });
    },
    [setState, validator]
  );

  return { state, setState, handleChange };
}

function hoc(Component) {
  return ({ validator, ...props }) => {
    const refs = React.useContext(FormContext);
    const inputProps = useInput(refs[props.name], validator);
    return <Component {...props} {...inputProps} />;
  };
}

function useForm(fields) {
  const refsRef = useRef();
  const inputRefs = {};
  Object.keys(fields).forEach(field => {
    inputRefs[field] = useRef({ value: fields[field] });
  });
  refsRef.current = inputRefs;

  const getForm = useCallback(() => {
    const form = {};
    Object.keys(refsRef.current).forEach(field => {
      form[field] = refsRef.current[field].current.value;
    });
    return form;
  }, []);

  const getRef = useCallback(fieldName => refsRef.current[fieldName], []);

  const formContext = useCallback(
    props => <FormContext.Provider value={refsRef.current} {...props} />,
    []
  );

  return [formContext, getForm, getRef];
}

const Input = hoc(RefInput);

export { useForm, RefInput, Input };

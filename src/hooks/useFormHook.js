import { useState } from "react";
import Joi from "joi-browser";

const useFormHook = (initialState, schema, doSubmit) => {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});

  //validacija na onchange jednog input field
  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const parcialSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, parcialSchema);

    //VRATI NULL ILI MESSAGE
    return error ? error.details[0].message : null;
  };

  //validacij cijele forme na clikc submit
  const validate = () => {
    const result = Joi.validate(state, schema, {
      abortEarly: false,
    });

    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  const handleChange = (e) => {
    const newError = { ...errors };
    const errorMessage = validateProperty(e.target);

    //IF MESAGE POSTOJI SETUJ U OBJEKAT
    if (errorMessage) newError[e.target.name] = errorMessage;
    //AKO NE POSTOJI IZBRISI PROPERTU IZ ERROR OBJEKTA
    else delete newError[e.target.name];

    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    setErrors(newError);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //VRACA NULL ILI ERROR OBJEKAT
    const errors = validate();

    //AKO JE NULL SETUJ PRAZANA OBJEKAT
    setErrors(errors || {});

    //AKO JE NULL NE SALJI NA SERVER VEC IZACI
    if (errors) return;

    doSubmit();
  };

  return { state, setState, errors, setErrors, handleChange, handleSubmit };
};

export default useFormHook;

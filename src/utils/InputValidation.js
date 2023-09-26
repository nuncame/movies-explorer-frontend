import { useCallback, useState } from "react";

export function useFormWithValidation() {
    const [formValue, setFormValue] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
  
    const handleChange = (event) => {
      const target = event.target;
      const name = target.name;
      const value = target.value;
      setFormValue({...formValue, [name]: value});
      setErrors({...errors, [name]: target.validationMessage });
      setIsValid(target.closest("form").checkValidity());
    };
  
    const resetForm = useCallback(
      (newValues = {}, newErrors = {}, newIsValid = false) => {
        setFormValue(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
      },
      [setFormValue, setErrors, setIsValid]
    );
  
    return { formValue, handleChange, errors, isValid, resetForm };
  }
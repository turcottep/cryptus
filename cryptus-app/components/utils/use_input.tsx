import React, { useState } from "react";

type InputProps = {
  id: string;
  type: string;
  initialValue: any;
  placeholder: string;
};

export default function useInput(inputProps: InputProps) {
  const { id, placeholder, initialValue } = inputProps;

  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      id: id,
      placeholder: placeholder,
      onChange: (e) => {
        setValue(e.target.value);
      },
    },
  };
}

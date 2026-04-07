import { ChangeEvent, ReactNode, Ref, FC } from "react";
import { StyledInputField } from "./InputFieldStyles";
import { FocusEvent } from "react";

type InputFieldProps = {
  name: string;
  children: ReactNode;
  type?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isInvalid?: boolean;
  ref?: Ref<HTMLInputElement>;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
};


const InputField: FC<InputFieldProps> = ({
  name,
  children,
  type,
  value,
  onChange,
  placeholder,
  isInvalid = false,
  ref,
  onBlur,
}) => {
  return (
    <div className="flex flex-col text-gray-400 py-2">
      <label>{children}</label>
      <StyledInputField
        name={name}
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        isInvalid={isInvalid}
        onBlur={onBlur}
      />
    </div>
  );
};

export default InputField;
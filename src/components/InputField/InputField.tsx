import { ChangeEvent, ReactNode, Ref, FC } from "react";
import { StyledInputField } from "./InputFieldStyles";

type InputFieldProps = {
  children: ReactNode;
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isInvalid?: boolean;
  ref?: Ref<HTMLInputElement>;
};


const InputField: FC<InputFieldProps> = ({
  children,
  type,
  value,
  onChange,
  placeholder,
  isInvalid = false,
  ref,
}) => {
  return (
    <div className="flex flex-col text-gray-400 py-2">
      <label>{children}</label>
      <StyledInputField
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        isInvalid={isInvalid}
      />
    </div>
  );
};

export default InputField;
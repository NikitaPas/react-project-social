import { 
  ChangeEvent, 
  ReactNode, 
  Ref,
  FC
} from "react";

type InputFieldProps = {
  children: ReactNode;
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isInvalid?: boolean;
  ref?: Ref<HTMLInputElement>;
};

const InputField: FC<InputFieldProps> =(
  (
    {
      children,
      type,
      value,
      onChange,
      placeholder,
      isInvalid = false,
      ref,
    }
  ) => {
    const inputStyles = `
      rounded-lg bg-gray-700 mt-2 p-2 
      focus:bg-gray-800 focus:outline-none border-2 transition-colors
      ${
        isInvalid
          ? "border-red-500"
          : "border-transparent focus:border-blue-500"
      }
    `;

    return (
      <div className="flex flex-col text-gray-400 py-2">
        <label>{children}</label>
        <input
          ref={ref}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={inputStyles}
          type={type}
        />
      </div>
    );
  }
);

export default InputField;
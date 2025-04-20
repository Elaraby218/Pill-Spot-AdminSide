import React, { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";


interface IProps {
  label: string;
  name: string;
  register: UseFormRegister<any>; // or a specific type if you have a form schema
  errors: FieldErrors;
  children?: React.ReactNode;
  type?: string;
  [key: string]: any; // to allow spreading other props like `placeholder`, `type`, etc.
}

const TextInput: React.FC<IProps> = ({
  label,
  name,
  register,
  errors,
  children,
  type = "text",
  ...rest
}) => {
  const errorMessage = errors?.[name]?.message as string;
  const [showPass, setShowPass] = useState(false);
  const [Ttype, setTtype] = useState(type);
  function handleShowPass(e) {
    e.preventDefault();
    setShowPass(!showPass);
    if (Ttype === "password") setTtype("text");
    else if (Ttype === "text") setTtype("password");
  }

  return (
    <div className="my-2">
      <div className="flex items-center gap-1 text-lg">
        {children}
        <label htmlFor={name}>{label}</label>
      </div>

      <div className="relative flex items-center">
        <input
          id={name}
          type={Ttype}
          autoComplete="off"
          placeholder="Type here"
          className={`input block mt-2 focus:outline-0 w-80 ${
            errorMessage ? "input-error" : ""
          }`}
          {...register(name)}
          {...rest}
        />

        {type === "password" && (
          <button className="absolute right-3 top-5" onClick={handleShowPass}>
            {showPass ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}
          </button>
        )}
      </div>

      {errorMessage && (
        <span className="mt-2 block font-bold text-red-600">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default TextInput;

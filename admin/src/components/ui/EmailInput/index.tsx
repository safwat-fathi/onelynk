"use client";

import { InputHTMLAttributes } from "react";

interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  id: string; // Unique ID for accessibility
}

/**
 * Reusable Email Input Component
 *
 * A customizable email input field with support for labels and error states.
 * It extends standard HTML input attributes for flexibility.
 */
const EmailInput  = ({
  id,
  label,
  value,
  onChange,
  placeholder = "Email",
  error = false,
  className = "",
  ...rest
} : EmailInputProps) => {
  const inputClasses = `
    input
    input-bordered
    w-full
    ${error ? "input-error" : ""}
    ${className}
  `.trim();

  return (
    <div className="form-control w-full">
      {label && (
        <label htmlFor={id} className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input
        id={id}
        type="email"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClasses}
        autoComplete="email"
        {...rest}
      />
      {error && (
        <label htmlFor={id} className="label">
          <span className="label-text-alt text-error">Invalid email address</span>
        </label>
      )}
    </div>
  );
};

export default EmailInput;

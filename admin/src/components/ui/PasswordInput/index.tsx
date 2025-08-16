import { InputHTMLAttributes, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string | boolean; // Can be a boolean for state or a string for a message
	id: string; // Unique ID for accessibility
}

/**
 * Reusable Password Input Component
 *
 * A customizable password input field with a visibility toggle,
 * support for labels, and dynamic error states. It extends standard
 * HTML input attributes for maximum flexibility.
 */
const PasswordInput = ({
	id,
	label,
	error = false,
	className = "",
	...rest
}: PasswordInputProps) => {
	// Internal state to manage whether the password is shown or hidden
	const [showPassword, setShowPassword] = useState(false);

	// Combine default, error, and custom classes for the input element
	const inputClasses = `
    input
    input-bordered
    w-full
    pr-12 
    ${error ? "input-error" : ""}
    ${className}
  `.trim();

	return (
		<>
			{label && (
				<label htmlFor={id} className="label">
					<span className="label-text">{label}</span>
				</label>
			)}
			{/* The relative container is necessary for positioning the toggle button */}
			<div className="relative w-full">
				<input
					id={id}
					type={showPassword ? "text" : "password"}
					className={inputClasses}
					autoComplete="current-password"
					{...rest} // Spread the rest of the props (value, onChange, placeholder, etc.)
				/>
				<button
					type="button"
					aria-label={showPassword ? "Hide password" : "Show password"}
					className="absolute inset-y-0 right-0 pr-3 z-10 flex items-center text-base-content/60 hover:text-base-content cursor-pointer"
					onClick={() => setShowPassword(!showPassword)}
				>
					{showPassword ? (
						<EyeSlashIcon className="h-5 w-5" />
					) : (
						<EyeIcon className="h-5 w-5" />
					)}
				</button>
			</div>
			{/* Display an error message if the error prop is present */}
			{error && (
				<label htmlFor={id} className="label">
					<span className="label-text-alt text-error">
						{typeof error === "string" ? error : "Invalid input"}
					</span>
				</label>
			)}
		</>
	);
};

export default PasswordInput;
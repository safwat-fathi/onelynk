"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { signupAction } from "@/app/actions/auth";
import { SignupCredentials } from "@/shared/types/auth";
import EmailInput from "@/components/ui/EmailInput";
import PasswordInput from "@/components/ui/PasswordInput";

export default function SignupPage() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState<
		Omit<SignupCredentials, "password"> & {
			password: string;
			confirmPassword: string;
		}
	>({
		email: "",
		password: "",
		confirmPassword: "",
		firstName: "",
		lastName: "",
	});

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		// Check if passwords match
		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match");
			setLoading(false);
			return;
		}

		try {
			// Transform form data to match API expectations
			const signupData: SignupCredentials = {
				email: formData.email,
				password: formData.password,
				firstName: formData.firstName,
				lastName: formData.lastName,
			};

			// The signupAction will redirect on success, so we only need to handle failures
			const result = await signupAction(signupData);
			
			// If we get here, it means the signup failed and we have an error result
			if (result && !result.success) {
				setError(result.error || "Signup failed. Please try again.");
			}
		} catch (err) {
			const error = err as Error;
			setError(error.message || "Signup failed. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
			<div className="card w-full max-w-md bg-base-100 shadow-xl">
				<div className="card-body">
					<div className="text-center mb-6">
						<h1 className="text-3xl font-bold text-primary">ZeeLink</h1>
						<p className="text-base-content/60 mt-2">
							Create your admin account
						</p>
					</div>

					{error && (
						<div className="alert alert-error mb-4">
							<span>{error}</span>
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="form-control">
								<input
									type="text"
									name="firstName"
									placeholder="First Name"
									className="input input-bordered"
									value={formData.firstName}
									onChange={handleChange}
									required
									autoComplete="given-name"
								/>
							</div>
							<div className="form-control">
								<input
									type="text"
									name="lastName"
									placeholder="Last Name"
									className="input input-bordered"
									value={formData.lastName}
									onChange={handleChange}
									required
									autoComplete="family-name"
								/>
							</div>
						</div>

						<div className="form-control">
							<EmailInput
								id="email"
								label="Email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
								autoComplete="email"
							/>
						</div>

						<div className="form-control">
							<PasswordInput
								id="password"
								name="password"
								placeholder="Password"
								value={formData.password}
								onChange={handleChange}
								required
								autoComplete="new-password"
							/>
							<label className="label">
								<span className="label-text-alt">
									Must be at least 8 characters with uppercase, lowercase,
									number and special character
								</span>
							</label>
						</div>

						<div className="form-control">
							<PasswordInput
								id="confirmPassword"
								name="confirmPassword"
								placeholder="Confirm Password"
								value={formData.confirmPassword}
								onChange={handleChange}
								required
								autoComplete="new-password"
							/>
						</div>

						<div className="form-control">
							<label className="cursor-pointer label">
								<input
									type="checkbox"
									className="checkbox checkbox-sm"
									required
								/>
								<span className="label-text ml-2">
									I agree to the{" "}
									<Link href="/terms" className="link link-primary">
										Terms of Service
									</Link>{" "}
									and{" "}
									<Link href="/privacy" className="link link-primary">
										Privacy Policy
									</Link>
								</span>
							</label>
						</div>

						<button
							type="submit"
							className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
							disabled={loading}
						>
							{loading ? "Creating account..." : "Create Account"}
						</button>
					</form>

					<div className="divider">OR</div>

					<div className="text-center">
						<span className="text-base-content/60">
							Already have an account?{" "}
						</span>
						<Link href="/auth/login" className="link link-primary">
							Sign in
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

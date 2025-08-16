'use client'

import { ChangeEvent, FormEvent, useState } from "react";
import Link from 'next/link'
import { loginAction } from "@/app/actions/auth";
import { LoginCredentials } from "@/shared/types/auth";
import EmailInput from "@/components/ui/EmailInput";
import PasswordInput from "@/components/ui/PasswordInput";

export default function LoginPage() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState<LoginCredentials>({
		email: "",
		password: "",
	});

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			// The loginAction will redirect on success, so we only need to handle failures
			const result = await loginAction(formData);
			
			// If we get here, it means the login failed and we have an error result
			if (result && !result.success) {
				setError(result.error || "Login failed. Please try again.");
			}
		} catch (err) {
			// Handle unexpected errors
			const error = err as Error;
			setError(error.message || "Login failed. Please try again.");
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
							Sign in to your admin dashboard
						</p>
					</div>

					{error && (
						<div className="alert alert-error mb-4">
							<span>{error}</span>
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="form-control">
							<EmailInput
								id="login-email"
								name="email"
								placeholder="Email"
								value={formData.email}
								onChange={handleChange}
								required
								autoComplete="email"
							/>
						</div>

						<div className="form-control">
							<PasswordInput
								id="login-password"
								name="password"
								placeholder="Password"
								value={formData.password}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="flex items-center justify-between">
							<label className="cursor-pointer label">
								<input type="checkbox" className="checkbox checkbox-sm" />
								<span className="label-text ml-2">Remember me</span>
							</label>
							<Link
								href="/auth/forgot-password"
								className="link link-primary text-sm"
							>
								Forgot password?
							</Link>
						</div>

						<button
							type="submit"
							className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
							disabled={loading}
						>
							{loading ? "Signing in..." : "Sign In"}
						</button>
					</form>

					<div className="divider">OR</div>

					<div className="text-center">
						<span className="text-base-content/60">
							Don&apos;t have an account?{" "}
						</span>
						<Link href="/auth/signup" className="link link-primary">
							Sign up
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
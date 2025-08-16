'use server'

import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

import { API_BASE_URL, API_ENDPOINTS } from "@/shared/constants/api";
import {
	LoginCredentials,
	SignupCredentials,
} from "@/shared/types/auth";

// Map frontend user type to API user type
interface ApiUser {
	id: number;
	name: string;
	email: string;
	bio?: string;
	profile_image?: string;
	theme_color?: string;
}

// Map frontend auth response to API auth response
interface ApiAuthResponse {
	user: ApiUser;
	accessToken: string;
	refreshToken: string;
}

export async function loginAction(credentials: LoginCredentials) {
	try {
		const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: credentials.email,
				password: credentials.password,
			}),
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			throw new Error(errorData.message || "Login failed");
		}

		const data: ApiAuthResponse = await response.json();

		// Transform API user to frontend user type
		const frontendUser = {
			id: data.user.id.toString(),
			email: data.user.email,
			firstName: data.user.name.split(" ")[0] || "",
			lastName: data.user.name.split(" ").slice(1).join(" ") || "",
			role: "admin" as const,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		// Set cookies server-side
		const cookieStore = await cookies();

		cookieStore.set("access_token", data.accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 60 * 15, // 15 minutes (matches API)
			path: "/",
		});

		cookieStore.set("refresh_token", data.refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 60 * 60 * 24 * 7, // 7 days (matches API)
			path: "/",
		});

		cookieStore.set("user", JSON.stringify(frontendUser), {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 60 * 60 * 24 * 7, // 7 days
			path: "/",
		});

		redirect("/");
	} catch (error) {
		// Re-throw redirect errors so Next.js can handle them properly
		if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
			throw error;
		}

		console.error("Login error:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Login failed",
		};
	}
}

export async function signupAction(credentials: SignupCredentials) {
	try {
		const response = await fetch(
			`${API_BASE_URL}${API_ENDPOINTS.AUTH.SIGNUP}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: credentials.email,
					password: credentials.password,
					name: `${credentials.firstName} ${credentials.lastName}`,
					confirm_password: credentials.password, // API requires confirm_password
				}),
			}
		);

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			throw new Error(errorData.message || "Signup failed");
		}

		const data: ApiAuthResponse = await response.json();

		// Transform API user to frontend user type
		const frontendUser = {
			id: data.user.id.toString(),
			email: data.user.email,
			firstName: data.user.name.split(" ")[0] || "",
			lastName: data.user.name.split(" ").slice(1).join(" ") || "",
			role: "admin" as const,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		// Set cookies server-side
		const cookieStore = await cookies();

		cookieStore.set("access_token", data.accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 60 * 15, // 15 minutes (matches API)
			path: "/",
		});

		cookieStore.set("refresh_token", data.refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 60 * 60 * 24 * 7, // 7 days (matches API)
			path: "/",
		});

		cookieStore.set("user", JSON.stringify(frontendUser), {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 60 * 60 * 24 * 7, // 7 days
			path: "/",
		});

		redirect("/"); // Redirect to dashboard on successful signup
	} catch (error) {
		// Re-throw redirect errors so Next.js can handle them properly
		if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
			throw error;
		}

		console.error("Signup error:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Signup failed",
		};
	}
}

export async function logoutAction() {
	const cookieStore = await cookies();

	try {
		const refreshToken = cookieStore.get("refresh_token")?.value;
		if (refreshToken) {
			await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGOUT}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ refresh_token: refreshToken }),
			});
		}
	} catch (error) {
		console.error("Logout request failed:", error);
	} finally {
		// Clear all auth cookies
		cookieStore.delete("access_token");
		cookieStore.delete("refresh_token");
		cookieStore.delete("user");

		// Redirect to login
		redirect("/auth/login");
	}
}
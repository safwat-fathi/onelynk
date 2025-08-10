import { login } from "@/domains/auth/auth.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const handleLogin = async (formData: FormData) => {
    'use server';
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { access_token } = await login({ email, password });
      cookies().set("accessToken", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
      redirect("/");
    } catch (error) {
      redirect("/login?error=Invalid credentials");
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">Access the ZeeLink Admin Dashboard.</p>
        </div>

        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" action={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

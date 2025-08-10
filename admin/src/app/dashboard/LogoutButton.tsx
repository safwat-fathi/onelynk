'use client';

import { logout } from "./actions";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit" className="btn btn-ghost w-full">Logout</button>
    </form>
  );
}

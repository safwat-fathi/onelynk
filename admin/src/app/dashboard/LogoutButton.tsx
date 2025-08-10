'use client';

import { logout } from "./actions";
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors w-full text-left text-white">
        <LogOut className="w-5 h-5 mr-3" />
        <span>Logout</span>
      </button>
    </form>
  );
}

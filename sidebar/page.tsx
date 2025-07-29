
import Link from 'next/link';
import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Sidebar Layout',
  description: 'Next.js + TypeScript Layout with Sidebar',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen m-0 bg-gray-100 ">
        <aside className="w-52 bg-slate-900 text-white p-10">
          <nav className="flex flex-col gap-4">
            <Link
              href="/overview"
              className="bg-slate-700 hover:bg-slate-600 font-bold py-2 px-4 rounded text-center"
            >
              Overview
            </Link>
            <Link
              href="/employees"
              className="bg-slate-700 hover:bg-slate-600 font-bold py-2 px-4 rounded text-center"
            >
              Employees
            </Link>
            <Link
              href="/users"
              className="bg-slate-700 hover:bg-slate-600 font-bold py-2 px-4 rounded text-center"
            >
              Users
            </Link>
            <Link
              href="/settings"
              className="bg-slate-700 hover:bg-slate-600 font-bold py-2 px-4 rounded text-center"
            >
              Settings
            </Link>
          </nav>
        </aside>

        <main className="flex-grow p-6">{children}</main>
      </body>
    </html>
  );
}
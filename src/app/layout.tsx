'use client';

import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, ReactNode } from 'react';
import { IoCalendarNumberOutline, IoStar, IoBriefcaseOutline } from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { GoTasklist } from "react-icons/go";
import { MdAccessTime } from "react-icons/md";
import { BiCalendar } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { BsMoon } from "react-icons/bs";
import { GrTable } from "react-icons/gr";
import { TbBeach } from "react-icons/tb";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactElement;
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const [showProfile, setShowProfile] = useState(false);
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { href: '/employees', label: 'Employees', icon: <HiOutlineUserGroup className="w-5 h-5" /> },
    { href: '/Timesheets', label: 'TimeSheets', icon: <IoCalendarNumberOutline className="w-5 h-5" /> },
    { href: '/worksheet', label: 'WorkSheet', icon: <GrTable className="w-5 h-5" /> },
    { href: '/Tasks', label: 'Tasks', icon: <GoTasklist className="w-5 h-5" /> },
    { href: '/Shiftlog', label: 'Shift Log', icon: <MdAccessTime className="w-5 h-5" /> },
    { href: '/Holidays', label: 'Holidays', icon: <BiCalendar className="w-5 h-5" /> },
    { href: '/NoticeBoard', label: 'PerformanceRating', icon: <IoStar className="w-5 h-5" /> },
    { href: '/careers', label: 'Careers', icon: <IoBriefcaseOutline className="w-5 h-5" /> },
    { href: '/leave', label: 'Leaves', icon: <TbBeach className="w-5 h-5" /> },

    // ✅ Navigates to the /medical page (table of JSON data)
    { href: '/medical', label: 'Medicals', icon: <FiMenu className="w-5 h-5" /> },
  ];

  return (
    <html lang="en">
      <body className="h-screen overflow-hidden">
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-60 bg-white text-black flex flex-col h-full shadow-md">
            <h2 className="font-bold text-2xl p-4 border-b border-gray-200 shadow-sm">CubixCorp</h2>

            <nav className="p-6 flex-1 overflow-y-auto">
              <ul className="space-y-2">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;

                  return (
                    <li key={index} className="py-2 text-lg">
                      <Link
                        href={item.href}
                        className={`group flex items-center gap-x-2 px-2 py-1 rounded-md transition-all duration-300 ${
                          isActive ? 'text-blue-700' : 'text-black hover:text-blue-700'
                        }`}
                      >
                        <span className={`${isActive ? 'text-blue-700' : 'group-hover:text-blue-700'}`}>
                          {item.icon}
                        </span>
                        <span className={`${isActive ? 'text-blue-700' : 'group-hover:text-blue-700'}`}>
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* User Profile */}
            <div className="px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="text-blue-700 font-semibold w-full text-left"
              >
                User Profile
              </button>
              {showProfile && (
                <div className="mt-2 p-2 bg-blue-100 rounded text-sm">
                  <p>Name: Rahul</p>
                  <p>Email: rahul@gmail.com</p>
                  <button className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 w-full">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col h-full">
            {/* Topbar */}
            <div className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
              <FiMenu className="text-2xl cursor-pointer" />
              <button className="p-2 rounded-full hover:bg-gray-200">
                <BsMoon className="text-xl" />
              </button>
            </div>

            {/* Page Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-100">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}

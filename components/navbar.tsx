"use client";

import { File, Home, LogOut, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import logoutAction from "@/actions/logoutAction";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/home", icon: Home },
    { label: "Dumps", href: "/dumps", icon: File },
    { label: "Add", href: "/add", icon: Plus },
  ];

  if (pathname === "/") {
    return null;
  }

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-2/3">
      <nav className="relative border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-6 py-3 rounded-lg transition-all duration-300">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/home" className="flex items-center gap-2 group">
            <span className="text-lg font-bold bg-linear-to-r from-white to-white/70 bg-clip-text text-transparent">
              Kosh.AI
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative px-4 py-2 text-sm text-white/60 font-medium rounded-lg transition-all duration-300 hover:text-white hover:bg-white/10 flex items-center gap-1 group"
              >
                <link.icon className="w-4 h-4 inline-block group-hover:-rotate-6 duration-150" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Button
              className="hidden md:inline-flex items-center gap-1 rounded-lg bg-red-500 hover:bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-violet-500/40 hover:scale-105 cursor-pointer"
              onClick={logoutAction}
            >
              Logout
              <LogOut className="w-4 h-4" />
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col items-center justify-center w-8 h-8 gap-1.5 rounded-lg transition-colors hover:bg-white/10"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-0.5 w-5 rounded-lg bg-white transition-all duration-300 ${mobileMenuOpen ? "translate-y-1 rotate-45" : ""
                  }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-lg bg-white transition-all duration-300 ${mobileMenuOpen ? "-translate-y-1 -rotate-45" : ""
                  }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-64 mt-3 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="flex flex-col gap-1 border-t border-white/10 pt-3 pb-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm text-white/60 font-medium rounded-lg transition-all duration-300 hover:text-white hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-2">
              <Button
                className="flex-1 items-center gap-1 rounded-lg bg-red-500 hover:bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-violet-500/40 hover:scale-105 cursor-pointer"
                onClick={logoutAction}
              >
                Logout
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
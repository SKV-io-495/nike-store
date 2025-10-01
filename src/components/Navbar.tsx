import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CartIndicator } from "./CartIndicator";
import { getCurrentUser } from "@/lib/auth/actions";
import { signOut } from "@/lib/auth/actions";

const NAV_LINKS = [
  { label: "Men", href: "/products?gender=men" },
  { label: "Women", href: "/products?gender=women" },
  { label: "Kids", href: "/products?gender=unisex" },
  { label: "Collections", href: "/collections" },
  { label: "Contact", href: "/contact" },
] as const;

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 bg-light-100">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <Link href="/" aria-label="Nike Home" className="flex items-center">
          <div className="relative h-16 w-16">
            <Image
              src="/logo.svg"
              alt="Nike"
              fill
              priority={true}
              className="invert w-auto h-auto" // Use Tailwind classes for sizing and styling
            />
          </div>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-body text-dark-900 transition-colors hover:text-dark-700"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 md:flex">
          {user ? (
            <>
              <div className="w-10 h-10 bg-dark-900 text-light-100 rounded-full flex items-center justify-center">
                {user.name?.[0].toUpperCase()}
              </div>
              <form action={signOut}>
                <button
                  type="submit"
                  className="text-body text-dark-900 transition-colors hover:text-dark-700"
                >
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-body text-dark-900 transition-colors hover:text-dark-700"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="text-body text-dark-900 transition-colors hover:text-dark-700"
              >
                Sign Up
              </Link>
            </>
          )}
          <Link
            href="/cart"
            className="text-body text-dark-900 transition-colors hover:text-dark-700 flex items-center gap-1"
          >
            <span className="mr-2">My Cart</span> <CartIndicator />
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
          aria-controls="mobile-menu"
          aria-expanded={false}
        >
          <span className="sr-only">Toggle navigation</span>
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      <div id="mobile-menu" className="hidden border-t border-light-300 md:hidden">
        <ul className="space-y-2 px-4 py-3">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block py-2 text-body text-dark-900 hover:text-dark-700"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="flex items-center justify-between pt-2">
            <Link href="/cart" className="text-body">
              My Cart
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

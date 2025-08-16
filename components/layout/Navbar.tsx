import Link from "next/link";
import { AuthButton } from "@/components/auth-button";
import NavbarMobile from "./NavMobile";

export type NavLink = {
  href: string;
  label: string;
};

const Navbar = () => {
  const navLinks: NavLink[] = [
    { href: "/#skills", label: "Compétences" },
    { href: "/#services", label: "Services" },
    { href: "/#testimonials", label: "Avis" },
    { href: "/podcasts", label: "Podcast" },
    { href: "/contact", label: "Contact" },
    { href: "/dashboard/admin", label: "Dashboard" },
    { href: "/protected", label: "Protected" },
  ];

  return (
    <>
      <header className="fixed z-10 flex h-14 w-full items-center border border-transparent border-b-foreground/80 bg-white dark:bg-black">
        <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-3">
          <NavbarMobile navlinks={navLinks} />

          <div className="flex items-center gap-1 font-semibold">
            <div className="flex items-center justify-center gap-8">
              <Link href={"/"}>Awake</Link>

              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-sm text-foreground/70 hover:text-foreground max-md:hidden"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <AuthButton />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;

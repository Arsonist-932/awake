"use client";
import { AlignLeft, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { NavLink } from "./Navbar";

interface NavLinksProps {
  navlinks: NavLink[];
}
const NavbarMobile = ({ navlinks }: NavLinksProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function pour restaurer le scroll si le composant est démonté
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <button
        className="flex h-10 w-10 items-center justify-center transition-colors duration-200 md:hidden"
        onClick={handleToggleMenu}
      >
        <AlignLeft />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-white p-4 dark:bg-black lg:hidden"
          onClick={handleLinkClick}
        >
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={handleToggleMenu}
            className="absolute left-4 top-2 bg-red-700 hover:bg-red-800"
          >
            <X size={30} />
          </Button>

          {navlinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-foreground/70 hover:text-foreground"
              onClick={handleLinkClick}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default NavbarMobile;

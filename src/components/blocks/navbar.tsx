"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const ITEMS = [
  { label: "¿Cómo funciona?", href: "#como-funciona" },
  { label: "Planes", href: "#planes" },
  { label: "FAQ", href: "#faq" },
];

const SECTION_IDS = ["como-funciona", "planes", "faq"];

const HIDDEN_ROUTES = ["/login", "/signup", "/client-portal"];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const isHidden = HIDDEN_ROUTES.includes(pathname);

  useEffect(() => {
    // No activar observer si navbar está oculto o no estamos en home
    if (isHidden || pathname !== "/") {
      setActiveSection("");
      return;
    }

    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(`#${id}`);
              }
            });
          },
          { rootMargin: "-50% 0px -50% 0px" }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [pathname, isHidden]);

  // Ocultar navbar en rutas específicas
  if (isHidden) {
    return null;
  }

  return (
    <section
      className={cn(
        "bg-background/70 fixed left-1/2 z-50 w-[min(90%,700px)] -translate-x-1/2 rounded-4xl border backdrop-blur-md transition-all duration-300",
        "top-5 lg:top-6",
      )}
    >
      <div className="flex items-center justify-between px-6 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/logo-aoralabs.svg" alt="Aora Labs" width={120} height={28} />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="max-lg:hidden">
          <NavigationMenuList>
            {ITEMS.map((link) => (
              <NavigationMenuItem key={link.label}>
                <Link
                  href={link.href}
                  className="relative px-2 py-1 text-sm font-medium transition-all hover:opacity-75"
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-1/2 h-1 -translate-x-1/2 rounded-full bg-primary transition-all duration-300",
                      activeSection === link.href ? "w-4" : "w-0",
                    )}
                  />
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Buttons & Social */}
        <div className="flex items-center gap-2.5">
          <Link href="/login" className="max-lg:hidden">
            <Button variant="outline">
              <span className="relative z-10">Ingresar</span>
            </Button>
          </Link>

          {/* Hamburger Menu Button (Mobile Only) */}
          <button
            className="text-muted-foreground relative flex size-8 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <div className="absolute top-1/2 left-1/2 block w-[18px] -translate-x-1/2 -translate-y-1/2">
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}`}
              ></span>
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/*  Mobile Menu Navigation */}
      <div
        className={cn(
          "bg-background fixed inset-x-0 top-[calc(100%+1rem)] flex flex-col rounded-2xl border p-6 transition-all duration-300 ease-in-out lg:hidden",
          isMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-4 opacity-0",
        )}
      >
        <nav className="divide-border flex flex-1 flex-col divide-y">
          {ITEMS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative py-4 text-base font-medium transition-colors first:pt-0 last:pb-0 hover:opacity-75"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
              <span
                className={cn(
                  "absolute bottom-3 left-0 h-1 rounded-full bg-primary transition-all duration-300",
                  activeSection === link.href ? "w-4" : "w-0",
                )}
              />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
};

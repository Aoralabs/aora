"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const HIDDEN_ROUTES = ["/login", "/signup", "/client-portal"];

export function Footer() {
  const pathname = usePathname();

  if (HIDDEN_ROUTES.includes(pathname)) {
    return null;
  }
  const navigation = [
    { name: "¿Cómo funciona?", href: "#como-funciona" },
    { name: "Planes", href: "#planes" },
    { name: "FAQ", href: "#faq" },
  ];

  const social = [
    { name: "LinkedIn", href: "#" },
    { name: "Instagram", href: "#" },
  ];

  const legal = [{ name: "Política de Privacidad", href: "/privacy" }];

  return (
    <footer id="contacto" className="relative flex flex-col items-center gap-14 pt-28 lg:pt-32">
      {/* Dashed Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 80% 80% at 0% 100%, #000 50%, transparent 90%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 80% 80% at 0% 100%, #000 50%, transparent 90%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
      <div className="container relative z-10 space-y-3 text-center">
        <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
          Desarrollo continuo por una tarifa mensual
        </h2>
        <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
          Capacidad de desarrollo ilimitada. Sin cotizaciones. Sin sorpresas.
        </p>
        <div>
          <Button size="lg" className="mt-4" asChild>
            <a href="#planes">
              Conoce los planes
            </a>
          </Button>
        </div>
      </div>

      <nav className="container relative z-10 flex flex-col items-center gap-4">
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="font-medium transition-opacity hover:opacity-75"
              >
                {item.name}
              </Link>
            </li>
          ))}
          {social.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center gap-0.5 font-medium transition-opacity hover:opacity-75"
              >
                {item.name} <ArrowUpRight className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {legal.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-muted-foreground text-sm transition-opacity hover:opacity-75"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative z-10 mt-10 w-full overflow-hidden md:mt-14 lg:mt-20">
        <h2 className="text-center text-[15vw] font-bold leading-none tracking-tighter bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">
          Aora
        </h2>
      </div>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";

import Marquee from "react-fast-marquee";

import { cn } from "@/lib/utils";

type Company = {
  name: string;
  logo: string;
  width: number;
  height: number;
  href: string;
};

export const Logos = () => {
  const topRowCompanies = [
    {
      name: "Claude",
      logo: "/logos/claude.svg",
      width: 120,
      height: 32,
      href: "https://claude.ai",
    },
    {
      name: "Next.js",
      logo: "/logos/nextjs.svg",
      width: 120,
      height: 32,
      href: "https://nextjs.org",
    },
    {
      name: "Expo",
      logo: "/logos/expo.svg",
      width: 100,
      height: 32,
      href: "https://expo.dev",
    },
    {
      name: "Supabase",
      logo: "/logos/supabase.svg",
      width: 130,
      height: 32,
      href: "https://supabase.com",
    },
  ];

  const bottomRowCompanies = [
    {
      name: "Firebase",
      logo: "/logos/firebase.svg",
      width: 120,
      height: 32,
      href: "https://firebase.google.com",
    },
    {
      name: "Vercel",
      logo: "/logos/vercel.svg",
      width: 110,
      height: 28,
      href: "https://vercel.com",
    },
    {
      name: "Gemini",
      logo: "/logos/gemini.svg",
      width: 100,
      height: 32,
      href: "https://gemini.google.com",
    },
  ];

  return (
    <section className="pb-28 lg:pb-32 overflow-hidden">
      <div className="container space-y-10 lg:space-y-16">
        <div className="text-center">
          <h2 className="mb-4 text-xl text-balance md:text-2xl lg:text-3xl">
            Todo lo que necesitas, <em className="italic font-normal">incluido</em>
            <br className="max-md:hidden" />
            <span className="text-muted-foreground text-base md:text-lg font-normal">
              IA, automatización y desarrollo con las mejores herramientas
            </span>
          </h2>
        </div>

        <div className="flex w-full flex-col items-center gap-8">
          {/* Top row - 4 logos */}
          <LogoRow companies={topRowCompanies} gridClassName="grid-cols-2 md:grid-cols-4" />

          {/* Bottom row - 3 logos */}
          <LogoRow
            companies={bottomRowCompanies}
            gridClassName="grid-cols-3"
            direction="right"
          />
        </div>
      </div>
    </section>
  );
};

type LogoRowProps = {
  companies: Company[];
  gridClassName: string;
  direction?: "left" | "right";
};

const LogoRow = ({ companies, gridClassName, direction }: LogoRowProps) => {
  return (
    <>
      {/* Desktop static version */}
      <div className="hidden md:block">
        <div
          className={cn(
            "grid items-center justify-items-center gap-x-20 lg:gap-x-28",
            gridClassName,
          )}
        >
          {companies.map((company, index) => (
            <Link href={company.href} target="_blank" key={index}>
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                width={company.width}
                height={company.height}
                className="object-contain opacity-50 transition-opacity hover:opacity-70 dark:invert dark:opacity-100"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile marquee version */}
      <div className="md:hidden w-full">
        <Marquee direction={direction} pauseOnHover speed={30}>
          {companies.map((company, index) => (
            <Link
              href={company.href}
              target="_blank"
              key={index}
              className="mx-6 inline-block"
            >
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                width={company.width}
                height={company.height}
                className="object-contain opacity-50 transition-opacity hover:opacity-70 dark:invert dark:opacity-100"
              />
            </Link>
          ))}
        </Marquee>
      </div>
    </>
  );
};

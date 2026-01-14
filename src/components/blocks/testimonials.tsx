import Image from "next/image";

import { Linkedin } from "lucide-react";

import { DashedLine } from "../dashed-line";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const teamMembers = [
  {
    name: "Adirson Martinez",
    role: "Founder & Full Stack Product Engineer",
    bio: "Apasionado por la innovación tecnológica y el desarrollo de productos digitales que generan impacto.",
    image: "/team/adirson-martinez.webp",
    linkedin: "https://www.linkedin.com/in/adirsonmtnez",
  },
  {
    name: "Elizabeth Morles",
    role: "Project & Client Success Manager",
    bio: "Experta en gestión de proyectos, asegurando entregas exitosas y comunicación efectiva con clientes.",
    image: "/team/elizabeth-morles.webp",
    linkedin: "https://www.linkedin.com/in/elizabeth-morles/",
  },
  {
    name: "Siamalith Contreras",
    role: "Software Developer",
    bio: "Especialista en desarrollo de soluciones web modernas con enfoque en calidad y rendimiento.",
    image: "/team/siamalith-contreras.webp",
    linkedin: "https://linkedin.com/in/",
  },
];

export const Team = ({
  className,
  dashedLineClassName,
}: {
  className?: string;
  dashedLineClassName?: string;
}) => {
  return (
    <>
      <section className={cn("overflow-hidden pt-12 pb-28 lg:pt-16 lg:pb-32", className)}>
        <div className="container">
          <div className="space-y-4">
            <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
              Nuestro equipo
            </h2>
            <p className="text-muted-foreground max-w-md leading-snug">
              Un equipo apasionado por crear soluciones digitales que impulsan
              el crecimiento de tu negocio.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:mt-12 lg:grid-cols-3 lg:mt-20">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-muted h-full overflow-hidden border-none">
                <CardContent className="flex h-full flex-col p-0">
                  <div className="relative h-[288px] lg:h-[328px] bg-muted-foreground/10">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-6 p-6">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.bio}
                    </p>
                    <div className="flex items-end justify-between">
                      <div className="space-y-0.5">
                        <div className="text-primary font-semibold">
                          {member.name}
                        </div>
                        <div className="text-muted-foreground text-sm">
                          {member.role}
                        </div>
                      </div>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Linkedin className="size-5" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <DashedLine
        orientation="horizontal"
        className={cn("mx-auto max-w-[80%]", dashedLineClassName)}
      />
    </>
  );
};

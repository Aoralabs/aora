"use client";

import { useState } from "react";

import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Prueba piloto",
    monthlyPrice: "Gratis",
    yearlyPrice: "Gratis",
    description: "Un pequeño entregable para que veas cómo trabajamos",
    features: [
      "Mini tarea de prueba",
      "Sin compromiso",
      "Conoce al equipo",
      "Evalúa nuestra calidad",
    ],
  },
  {
    name: "Pro",
    monthlyPrice: "$999",
    yearlyPrice: "$799",
    description: "Para empresas que necesitan velocidad",
    features: [
      "2 solicitudes activas a la vez",
      "Entrega al día siguiente",
      "Todo lo del Standard",
      "Integraciones con IA",
      "Canal de Google Chat dedicado",
      "Llamadas semanales",
    ],
  },
  {
    name: "Standard",
    monthlyPrice: "$699",
    yearlyPrice: "$559",
    description: "Ideal para proyectos en crecimiento",
    features: [
      "1 solicitud activa a la vez",
      "Entregas en 1-2 días",
      "Desarrollo web y móvil",
      "Automatizaciones",
    ],
  },
];

export const Pricing = ({ className }: { className?: string }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="planes" className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            Planes <em className="italic font-normal">simples</em>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
            Sin contratos largos, sin sorpresas. Elige el plan que mejor se adapte a tu negocio.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center md:mt-12">
          <div className="bg-muted inline-flex items-center rounded-full p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                !isAnnual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              Mensual
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isAnnual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              Anual <span className="text-primary ml-1 text-xs">-20%</span>
            </button>
          </div>
          <p className="text-muted-foreground mt-3 text-xs">Puedes pausar o cancelar cuando quieras</p>
        </div>

        <div className="mt-8 grid items-start gap-5 text-start md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`${
                plan.name === "Pro"
                  ? "outline-primary origin-top outline-4"
                  : ""
              }`}
            >
              <CardContent className="flex flex-col gap-7 px-6 py-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-foreground font-semibold">{plan.name}</h3>
                    {plan.name === "Pro" && (
                      <span className="bg-primary text-primary-foreground relative inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold shadow-lg shadow-primary/30">
                        <svg className="size-3" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
                        </svg>
                        IA
                      </span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground text-lg font-medium">
                      {isAnnual ? plan.yearlyPrice : plan.monthlyPrice}
                      {plan.name !== "Prueba piloto" && (
                        <span className="text-muted-foreground">
                          /mes
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <span className="text-muted-foreground text-sm">
                  {plan.description}
                </span>

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="text-muted-foreground flex items-center gap-1.5"
                    >
                      <Check className="size-5 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-fit"
                  variant={plan.name === "Pro" ? "default" : "outline"}
                  asChild
                >
                  {plan.name === "Prueba piloto" ? (
                    <a href="https://calendar.app.google/mYAwC3EfiC3VkfyT7" target="_blank" rel="noopener noreferrer">
                      Agendar llamada
                    </a>
                  ) : (
                    <a href="#contacto">Comenzar</a>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

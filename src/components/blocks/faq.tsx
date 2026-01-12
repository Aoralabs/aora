import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const categories = [
  {
    title: "General y Producto",
    questions: [
      {
        question: "¿Qué es Aora Labs?",
        answer:
          "Aora Labs es un servicio de desarrollo de software y automatización por suscripción. En lugar de contratar una agencia tradicional o un equipo interno, te suscribes a un plan mensual y obtienes acceso a desarrollo continuo con entregas rápidas.",
      },
      {
        question: "¿Para quién es este servicio?",
        answer:
          "Ideal para startups, empresas en crecimiento y equipos que necesitan velocidad de desarrollo sin el compromiso de contratar personal a tiempo completo. Perfecto si tienes ideas que quieres ejecutar rápido o necesitas automatizar procesos.",
      },
      {
        question: "¿Qué tipo de proyectos pueden desarrollar?",
        answer:
          "Desarrollamos aplicaciones web y móviles, automatizaciones de procesos, integraciones con IA, dashboards, landing pages, MVPs, y más. Si es software, probablemente podemos ayudarte.",
      },
      {
        question: "¿Cómo funciona el proceso de trabajo?",
        answer:
          "Es simple: te suscribes, accedes a tu portal de cliente, agregas tareas a tu cola de desarrollo y nosotros las entregamos en días, no semanas. Puedes agregar, modificar o priorizar tareas en cualquier momento.",
      },
      {
        question: "¿Puedo ver ejemplos de su trabajo?",
        answer:
          "Por supuesto. Agenda una llamada con nosotros y te mostraremos proyectos relevantes a tu industria. También puedes solicitar una prueba piloto gratuita para evaluar nuestra calidad de primera mano.",
      },
    ],
  },
  {
    title: "Precios y Planes",
    questions: [
      {
        question: "¿Cuánto cuesta el servicio?",
        answer:
          "Ofrecemos tres planes: Prueba Piloto (gratis), Standard ($699/mes o $559/mes anual) y Pro ($999/mes o $799/mes anual). El plan Pro incluye integraciones con IA y entregas al día siguiente.",
      },
      {
        question: "¿Puedo cancelar en cualquier momento?",
        answer:
          "Sí, puedes cancelar o pausar tu suscripción cuando quieras. No hay contratos largos ni penalizaciones. Si pausas, tu suscripción se detiene y puedes reactivarla cuando lo necesites.",
      },
      {
        question: "¿Qué incluye la prueba piloto gratuita?",
        answer:
          "La prueba piloto incluye una mini tarea de desarrollo para que puedas evaluar nuestra calidad, velocidad y forma de trabajo sin ningún compromiso. Es la mejor manera de conocer al equipo antes de suscribirte.",
      },
      {
        question: "¿Cuál es la diferencia entre Standard y Pro?",
        answer:
          "Standard permite 1 solicitud activa con entregas en 1-2 días. Pro permite 2 solicitudes activas simultáneas, entregas al día siguiente, integraciones con IA, canal de Google Chat dedicado y llamadas semanales.",
      },
      {
        question: "¿Hay descuento por pago anual?",
        answer:
          "Sí, al pagar anualmente obtienes un 20% de descuento. Puedes empezar mensual y cambiar a anual cuando quieras para aprovechar el ahorro.",
      },
    ],
  },
  {
    title: "Técnicas y Soporte",
    questions: [
      {
        question: "¿Qué tecnologías utilizan?",
        answer:
          "Trabajamos con las tecnologías más modernas del mercado: React, Next.js, React Native, Node.js, Python, Firebase, Supabase, y más. Elegimos el stack que mejor se adapte a tu proyecto.",
      },
      {
        question: "¿Cómo integran la inteligencia artificial?",
        answer:
          "Integramos APIs de IA como OpenAI, Anthropic y Google para potenciar tu software con chatbots, análisis de datos, generación de contenido, automatización inteligente y más. Disponible en el plan Pro.",
      },
      {
        question: "¿Qué pasa si necesito soporte después del desarrollo?",
        answer:
          "Mientras tu suscripción esté activa, tienes soporte continuo incluido. Podemos hacer ajustes, correcciones y mejoras como parte de tu plan. También ofrecemos mantenimiento post-lanzamiento.",
      },
      {
        question: "¿Cómo me comunico con el equipo?",
        answer:
          "A través de tu portal de cliente puedes gestionar tareas y ver el progreso. El plan Pro incluye un canal de Google Chat dedicado para comunicación directa y llamadas semanales de seguimiento.",
      },
      {
        question: "¿Puedo solicitar cambios o revisiones?",
        answer:
          "Absolutamente. Las revisiones son parte del proceso. Trabajamos contigo hasta que estés satisfecho con el resultado. Puedes dar feedback directamente en el portal y ajustamos según tus necesidades.",
      },
    ],
  },
];

export const FAQ = ({
  headerTag = "h2",
  className,
  className2,
}: {
  headerTag?: "h1" | "h2";
  className?: string;
  className2?: string;
}) => {
  return (
    <section id="faq" className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className={cn("mx-auto grid gap-16 lg:grid-cols-2", className2)}>
          <div className="space-y-4">
            {headerTag === "h1" ? (
              <h1 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Preguntas frecuentes
              </h1>
            ) : (
              <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Preguntas frecuentes
              </h2>
            )}
            <p className="text-muted-foreground max-w-md leading-snug lg:mx-auto">
              ¿No encuentras lo que buscas?{" "}
              <Link href="/contact" className="underline underline-offset-4">
                Contáctanos
              </Link>
              .
            </p>
          </div>

          <div className="grid gap-6 text-start">
            {categories.map((category, categoryIndex) => (
              <div key={category.title} className="">
                <h3 className="text-muted-foreground border-b py-4">
                  {category.title}
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, i) => (
                    <AccordionItem key={i} value={`${categoryIndex}-${i}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const Login = () => {
  return (
    <section className="relative min-h-screen py-28 lg:pt-44 lg:pb-32">
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
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
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
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      <div className="container relative z-10">
        <div className="flex flex-col gap-4">
          <Card className="mx-auto w-full max-w-sm">
            <CardHeader className="flex flex-col items-center space-y-0">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1.5 self-start text-sm transition-colors"
              >
                <ArrowLeft className="size-4" />
                Regresar
              </Link>
              <Link href="/" className="mb-7">
                <span className="text-2xl font-bold text-white">Aora</span>
              </Link>
              <p className="mb-2 text-2xl font-bold">Bienvenido</p>
              <p className="text-muted-foreground">
                Ingresa tus datos para continuar.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Input type="email" placeholder="Correo electrónico" required />
                <div>
                  <Input
                    type="password"
                    placeholder="Contraseña"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      className="border-muted-foreground"
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Recordarme
                    </label>
                  </div>
                  <a href="#" className="text-primary text-sm font-medium">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <Button type="submit" className="mt-2 w-full">
                  Ingresar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Login;

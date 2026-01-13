"use client";

import { useState } from "react";

import { FolderOpen, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IconRenderer, useIconPicker } from "@/components/ui/icon-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ProjectStatus = "open" | "closed";

interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  status: ProjectStatus;
  icon: string;
}


export function ProjectsView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("Folder");
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<ProjectStatus>("open");
  const { search, setSearch, icons } = useIconPicker();

  const filteredProjects = projects.filter((p) => p.status === activeTab);

  const handleSubmit = () => {
    if (!name.trim()) return;

    const newProject: Project = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      createdAt: new Date(),
      status: "open",
      icon: selectedIcon,
    };

    setProjects([...projects, newProject]);
    setIsModalOpen(false);
    setName("");
    setDescription("");
    setSelectedIcon("Folder");
    setSearch("");
  };

  if (projects.length === 0) {
    return (
      <>
        <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-muted">
              <FolderOpen className="size-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">No tienes proyectos</h2>
              <p className="max-w-sm text-muted-foreground">
                Crea tu primer proyecto para comenzar a organizar y gestionar tus
                solicitudes de desarrollo.
              </p>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="mr-2 size-4" />
              Nuevo proyecto
            </Button>
          </div>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Nuevo proyecto</DialogTitle>
              <DialogDescription>
                Crea un nuevo proyecto para organizar tus solicitudes.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  placeholder="Mi proyecto"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Describe brevemente tu proyecto..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Icono</Label>
                <Input
                  placeholder="Buscar icono..."
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="flex h-full max-h-[200px] flex-wrap gap-2 overflow-y-auto py-2">
                  {icons.map(({ name: iconName, Component }) => (
                    <Button
                      key={iconName}
                      type="button"
                      variant={selectedIcon === iconName ? "default" : "outline"}
                      size="icon"
                      onClick={() => setSelectedIcon(iconName)}
                      className="size-10"
                    >
                      <Component className="size-5" />
                      <span className="sr-only">{iconName}</span>
                    </Button>
                  ))}
                  {icons.length === 0 && (
                    <div className="flex w-full flex-col items-center justify-center gap-2 py-4 text-center">
                      <p className="text-sm text-muted-foreground">No se encontraron iconos...</p>
                      <Button onClick={() => setSearch("")} variant="ghost" size="sm">
                        Limpiar búsqueda
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit}>Crear proyecto</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="mx-auto max-w-[1280px] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Proyectos</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 size-4" />
          Nuevo proyecto
        </Button>
      </div>

      <div className="mb-6 border-b border-border">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("open")}
            className={`relative pb-3 text-sm font-medium transition-colors ${
              activeTab === "open" ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Abiertos
            {activeTab === "open" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("closed")}
            className={`relative pb-3 text-sm font-medium transition-colors ${
              activeTab === "closed" ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Cerrados
            {activeTab === "closed" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <FolderOpen className="size-12 text-muted-foreground/50" />
          <p className="mt-4 text-muted-foreground">
            No hay proyectos {activeTab === "open" ? "abiertos" : "cerrados"}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="flex h-32 items-center justify-center bg-muted/50">
                <div className="flex size-16 items-center justify-center rounded-full bg-background">
                  <IconRenderer icon={project.icon} className="size-8 text-primary" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold truncate">{project.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatDate(project.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Nuevo proyecto</DialogTitle>
            <DialogDescription>
              Crea un nuevo proyecto para organizar tus solicitudes.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name2">Nombre</Label>
              <Input
                id="name2"
                placeholder="Mi proyecto"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description2">Descripción</Label>
              <Textarea
                id="description2"
                placeholder="Describe brevemente tu proyecto..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Icono</Label>
              <Input
                placeholder="Buscar icono..."
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="flex h-full max-h-[200px] flex-wrap gap-2 overflow-y-auto py-2">
                {icons.map(({ name: iconName, Component }) => (
                  <Button
                    key={iconName}
                    type="button"
                    variant={selectedIcon === iconName ? "default" : "outline"}
                    size="icon"
                    onClick={() => setSelectedIcon(iconName)}
                    className="size-10"
                  >
                    <Component className="size-5" />
                    <span className="sr-only">{iconName}</span>
                  </Button>
                ))}
                {icons.length === 0 && (
                  <div className="flex w-full flex-col items-center justify-center gap-2 py-4 text-center">
                    <p className="text-sm text-muted-foreground">No se encontraron iconos...</p>
                    <Button onClick={() => setSearch("")} variant="ghost" size="sm">
                      Limpiar búsqueda
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>Crear proyecto</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

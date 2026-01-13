"use client";

import { useEffect, useState } from "react";

import {
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock,
  ClipboardList,
  Loader2,
  MessageSquare,
  Plus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconRenderer } from "@/components/ui/icon-picker";
import { Input } from "@/components/ui/input";

import type { ViewMode } from "@/components/blocks/client-portal-navbar";

type RequestStatus = "todo" | "in_progress" | "review" | "done";

interface Project {
  id: string;
  name: string;
  icon: string;
}

// Mock projects
const MOCK_PROJECTS: Project[] = [
  { id: "1", name: "Web App", icon: "Globe" },
  { id: "2", name: "E-commerce", icon: "ShoppingCart" },
  { id: "3", name: "Mobile App", icon: "Smartphone" },
  { id: "4", name: "Admin Panel", icon: "Layout" },
  { id: "5", name: "Backend", icon: "Server" },
];

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
}

interface Request {
  id: string;
  code: string;
  title: string;
  description: string;
  status: RequestStatus;
  priority: "low" | "medium" | "high";
  project: string;
  createdAt: Date;
  comments: Comment[];
}

const COLUMNS: { id: RequestStatus; label: string; icon: React.ReactNode }[] = [
  { id: "todo", label: "Por hacer", icon: <Circle className="size-4" /> },
  { id: "in_progress", label: "En progreso", icon: <Loader2 className="size-4" /> },
  { id: "review", label: "En revisión", icon: <Clock className="size-4" /> },
  { id: "done", label: "Completado", icon: <CheckCircle2 className="size-4 text-green-500" /> },
];

// Mock data
const MOCK_REQUESTS: Request[] = [
  {
    id: "1",
    code: "SOL-001",
    title: "Diseño de landing page",
    description: "Crear el diseño completo de la landing page incluyendo hero section, features, pricing y footer. Debe ser responsive y seguir la guía de estilos de la marca.",
    status: "done",
    priority: "high",
    project: "Web App",
    createdAt: new Date("2024-01-05"),
    comments: [
      { id: "c1", author: "Juan Pérez", content: "El diseño inicial está listo para revisión", createdAt: new Date("2024-01-06") },
      { id: "c2", author: "María García", content: "Se necesitan ajustes en la sección de pricing", createdAt: new Date("2024-01-07") },
    ],
  },
  {
    id: "2",
    code: "SOL-002",
    title: "Integración API de pagos",
    description: "Integrar Stripe como pasarela de pagos. Incluir manejo de suscripciones, pagos únicos y webhooks para actualización de estados.",
    status: "in_progress",
    priority: "high",
    project: "E-commerce",
    createdAt: new Date("2024-01-10"),
    comments: [
      { id: "c3", author: "Carlos López", content: "Documentación de Stripe revisada", createdAt: new Date("2024-01-11") },
    ],
  },
  {
    id: "3",
    code: "SOL-003",
    title: "Optimización de imágenes",
    description: "Implementar lazy loading y optimización automática de imágenes usando Next.js Image component.",
    status: "in_progress",
    priority: "medium",
    project: "Web App",
    createdAt: new Date("2024-01-12"),
    comments: [],
  },
  {
    id: "4",
    code: "SOL-004",
    title: "Sistema de autenticación",
    description: "Implementar autenticación con email/password y OAuth (Google, GitHub). Incluir recuperación de contraseña y verificación de email.",
    status: "review",
    priority: "high",
    project: "Mobile App",
    createdAt: new Date("2024-01-08"),
    comments: [
      { id: "c4", author: "Ana Martínez", content: "OAuth funcionando correctamente", createdAt: new Date("2024-01-12") },
      { id: "c5", author: "Juan Pérez", content: "Pendiente pruebas de recuperación de contraseña", createdAt: new Date("2024-01-13") },
    ],
  },
  {
    id: "5",
    code: "SOL-005",
    title: "Dashboard de métricas",
    description: "Crear dashboard con gráficos de métricas principales: usuarios activos, ingresos, conversiones y retención.",
    status: "todo",
    priority: "medium",
    project: "Admin Panel",
    createdAt: new Date("2024-01-14"),
    comments: [],
  },
  {
    id: "6",
    code: "SOL-006",
    title: "Notificaciones push",
    description: "Implementar sistema de notificaciones push para iOS y Android usando Firebase Cloud Messaging.",
    status: "todo",
    priority: "low",
    project: "Mobile App",
    createdAt: new Date("2024-01-15"),
    comments: [],
  },
  {
    id: "7",
    code: "SOL-007",
    title: "Exportar reportes PDF",
    description: "Permitir exportar reportes del sistema en formato PDF con diseño personalizado y logo de la empresa.",
    status: "todo",
    priority: "low",
    project: "Admin Panel",
    createdAt: new Date("2024-01-16"),
    comments: [
      { id: "c6", author: "María García", content: "¿Qué librería usaremos para generar PDFs?", createdAt: new Date("2024-01-16") },
    ],
  },
  {
    id: "8",
    code: "SOL-008",
    title: "Chat en tiempo real",
    description: "Implementar chat en tiempo real entre usuarios usando WebSockets. Incluir indicador de typing y estado de lectura.",
    status: "review",
    priority: "medium",
    project: "Web App",
    createdAt: new Date("2024-01-09"),
    comments: [
      { id: "c7", author: "Carlos López", content: "WebSocket server configurado", createdAt: new Date("2024-01-11") },
    ],
  },
];

interface RequestsViewProps {
  viewMode: ViewMode;
}

export function RequestsView({ viewMode }: RequestsViewProps) {
  const [requests, setRequests] = useState<Request[]>(viewMode === "demo" ? MOCK_REQUESTS : []);
  const [selectedProject, setSelectedProject] = useState<Project>(MOCK_PROJECTS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [newComment, setNewComment] = useState("");
  const [requestToDelete, setRequestToDelete] = useState<Request | null>(null);

  useEffect(() => {
    setRequests(viewMode === "demo" ? MOCK_REQUESTS : []);
  }, [viewMode]);

  const getRequestsByStatus = (status: RequestStatus) => {
    return requests.filter((r) => r.status === status);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "Alta";
      case "medium":
        return "Media";
      case "low":
        return "Baja";
      default:
        return priority;
    }
  };

  const getStatusLabel = (status: RequestStatus) => {
    const column = COLUMNS.find((c) => c.id === status);
    return column?.label || status;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatCommentDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedRequest) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: "Usuario",
      content: newComment.trim(),
      createdAt: new Date(),
    };

    const updatedRequest = {
      ...selectedRequest,
      comments: [...selectedRequest.comments, comment],
    };

    setRequests(requests.map((r) => (r.id === selectedRequest.id ? updatedRequest : r)));
    setSelectedRequest(updatedRequest);
    setNewComment("");
  };

  const handleDeleteRequest = (e: React.MouseEvent, request: Request) => {
    e.stopPropagation();
    setRequestToDelete(request);
  };

  const confirmDelete = () => {
    if (!requestToDelete) return;
    setRequests(requests.filter((r) => r.id !== requestToDelete.id));
    setRequestToDelete(null);
  };

  if (viewMode === "empty") {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem-100px)] items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-muted">
            <ClipboardList className="size-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">No hay solicitudes</h2>
            <p className="max-w-sm text-muted-foreground">
              Primero debes crear un proyecto para poder realizar solicitudes de desarrollo.
            </p>
          </div>
          <Button disabled>
            <Plus className="mr-2 size-4" />
            Nueva solicitud
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem-100px)] flex-col">
      {/* Header */}
      <div className="px-6 py-4">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex items-center justify-between">
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 px-4 py-2 transition-all hover:bg-muted">
                  <IconRenderer icon={selectedProject.icon} className="size-5 text-primary" />
                  <span className="text-lg font-semibold">{selectedProject.name}</span>
                  <ChevronDown
                    className={`size-4 text-muted-foreground transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-0" : "-rotate-90"
                    }`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {MOCK_PROJECTS.map((project) => (
                  <DropdownMenuItem
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <IconRenderer icon={project.icon} className="size-4" />
                    <span>{project.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button>
              <Plus className="mr-2 size-4" />
              Nueva solicitud
            </Button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto p-6">
        <div className="mx-auto flex h-full max-w-[1280px] gap-4">
          {COLUMNS.map((column) => {
            const columnRequests = getRequestsByStatus(column.id);
            return (
              <div
                key={column.id}
                className="flex max-h-full w-72 shrink-0 flex-col rounded-xl bg-muted/30"
              >
                {/* Column Header */}
                <div className="flex shrink-0 items-center p-3">
                  <div className="flex items-center gap-2">
                    {column.icon}
                    <span className="text-sm font-medium">{column.label}</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      {columnRequests.length}
                    </span>
                  </div>
                </div>

                {/* Cards */}
                <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-2 pt-0">
                  {columnRequests.map((request) => (
                    <div
                      key={request.id}
                      onClick={() => setSelectedRequest(request)}
                      className="group cursor-pointer rounded-lg border border-border bg-card p-3 transition-all hover:shadow-md hover:shadow-primary/10"
                    >
                      <div className="mb-2 flex items-start justify-between">
                        <span className="text-xs text-muted-foreground">{request.code}</span>
                        <div className="flex items-center gap-2">
                          {column.id === "todo" && (
                            <button
                              onClick={(e) => handleDeleteRequest(e, request)}
                              className="opacity-0 transition-opacity group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          )}
                          <div className={`size-2 rounded-full ${getPriorityColor(request.priority)}`} />
                        </div>
                      </div>
                      <h3 className="mb-3 text-sm font-medium">{request.title}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-muted-foreground">
                          {request.comments.length > 0 && (
                            <div className="flex items-center gap-1">
                              <MessageSquare className="size-3" />
                              <span className="text-xs">{request.comments.length}</span>
                            </div>
                          )}
                          <span className="rounded bg-muted px-1.5 py-0.5 text-xs">
                            {request.project}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Request Detail Modal */}
      <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
        <DialogContent className="max-w-2xl">
          {selectedRequest && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{selectedRequest.code}</span>
                  <div className="flex items-center gap-2">
                    <div className={`size-2 rounded-full ${getPriorityColor(selectedRequest.priority)}`} />
                    <span className="text-xs text-muted-foreground">
                      {getPriorityLabel(selectedRequest.priority)}
                    </span>
                  </div>
                </div>
                <DialogTitle className="text-xl">{selectedRequest.title}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Status and Date */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Estado:</span>
                    <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-sm font-medium">
                      {COLUMNS.find((c) => c.id === selectedRequest.status)?.icon}
                      {getStatusLabel(selectedRequest.status)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {formatCommentDate(selectedRequest.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Descripción</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedRequest.description}
                  </p>
                </div>

                {/* Comments */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="size-4" />
                    <h4 className="text-sm font-medium">
                      Comentarios ({selectedRequest.comments.length})
                    </h4>
                  </div>

                  {selectedRequest.comments.length > 0 ? (
                    <div className="max-h-60 space-y-3 overflow-y-auto pr-2">
                      {selectedRequest.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="rounded-lg border border-border bg-muted/30 p-3"
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatCommentDate(comment.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No hay comentarios aún.</p>
                  )}

                  {/* Add Comment */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Escribe un comentario..."
                      className="flex-1"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                    />
                    <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                      Enviar
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!requestToDelete} onOpenChange={(open) => !open && setRequestToDelete(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Eliminar solicitud</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar la solicitud{" "}
              <span className="font-medium text-foreground">{requestToDelete?.code}</span>? Esta
              acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3">
            <Button variant="outline" onClick={() => setRequestToDelete(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

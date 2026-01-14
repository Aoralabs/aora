"use client";

import { useEffect, useRef, useState } from "react";

import {
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock,
  ClipboardList,
  FileText,
  ImageIcon,
  Loader2,
  MessageSquare,
  Paperclip,
  Plus,
  Trash2,
  X,
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconRenderer } from "@/components/ui/icon-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

interface Attachment {
  id: string;
  name: string;
  type: "image" | "document";
  url: string;
  size: number;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
  attachments?: Attachment[];
}

type RequestType = "feature" | "improvement" | "bug";

interface Request {
  id: string;
  code: string;
  title: string;
  description: string;
  status: RequestStatus;
  priority: "low" | "medium" | "high";
  type: RequestType;
  project: string;
  createdAt: Date;
  comments: Comment[];
  attachments?: Attachment[];
}

const REQUEST_TYPES: { id: RequestType; label: string; color: string }[] = [
  { id: "feature", label: "Funcionalidad", color: "bg-purple-500" },
  { id: "improvement", label: "Mejora", color: "bg-blue-500" },
  { id: "bug", label: "Error", color: "bg-orange-500" },
];

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
    type: "feature",
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
    type: "feature",
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
    type: "improvement",
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
    type: "feature",
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
    type: "feature",
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
    type: "feature",
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
    type: "improvement",
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
    type: "feature",
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
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [commentAttachments, setCommentAttachments] = useState<Attachment[]>([]);
  const [issueAttachments, setIssueAttachments] = useState<Attachment[]>([]);
  const [isNewIssueOpen, setIsNewIssueOpen] = useState(false);
  const [newIssue, setNewIssue] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
    type: "feature" as RequestType,
  });
  const [newIssueAttachments, setNewIssueAttachments] = useState<Attachment[]>([]);
  const [draggedRequest, setDraggedRequest] = useState<Request | null>(null);
  const [dragOverRequestId, setDragOverRequestId] = useState<string | null>(null);

  const commentFileInputRef = useRef<HTMLInputElement>(null);
  const issueFileInputRef = useRef<HTMLInputElement>(null);
  const newIssueFileInputRef = useRef<HTMLInputElement>(null);

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

  const getTypeInfo = (type: RequestType) => {
    return REQUEST_TYPES.find((t) => t.id === type) || REQUEST_TYPES[0];
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

  const handleDeleteRequest = (e: React.MouseEvent, request: Request) => {
    e.stopPropagation();
    setRequestToDelete(request);
  };

  const confirmDelete = () => {
    if (!requestToDelete) return;
    setRequests(requests.filter((r) => r.id !== requestToDelete.id));
    setRequestToDelete(null);
  };

  const handlePriorityChange = (priority: "low" | "medium" | "high") => {
    if (!selectedRequest) return;
    const updatedRequest = { ...selectedRequest, priority };
    setRequests(requests.map((r) => (r.id === selectedRequest.id ? updatedRequest : r)));
    setSelectedRequest(updatedRequest);
  };

  const handleDescriptionEdit = () => {
    if (!selectedRequest || selectedRequest.status !== "todo") return;
    setEditedDescription(selectedRequest.description);
    setIsEditingDescription(true);
  };

  const handleDescriptionSave = () => {
    if (!selectedRequest || !editedDescription.trim()) return;
    const updatedRequest = { ...selectedRequest, description: editedDescription.trim() };
    setRequests(requests.map((r) => (r.id === selectedRequest.id ? updatedRequest : r)));
    setSelectedRequest(updatedRequest);
    setIsEditingDescription(false);
  };

  const handleDescriptionCancel = () => {
    setIsEditingDescription(false);
    setEditedDescription("");
  };

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: "comment" | "issue"
  ) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments: Attachment[] = Array.from(files).map((file) => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type.startsWith("image/") ? "image" : "document",
      url: URL.createObjectURL(file),
      size: file.size,
    }));

    if (target === "comment") {
      setCommentAttachments((prev) => [...prev, ...newAttachments]);
    } else {
      setIssueAttachments((prev) => [...prev, ...newAttachments]);
    }

    e.target.value = "";
  };

  const removeAttachment = (id: string, target: "comment" | "issue") => {
    if (target === "comment") {
      setCommentAttachments((prev) => prev.filter((a) => a.id !== id));
    } else {
      setIssueAttachments((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleAddCommentWithAttachments = () => {
    if (!selectedRequest || (!newComment.trim() && commentAttachments.length === 0)) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: "Usuario",
      content: newComment.trim(),
      createdAt: new Date(),
      attachments: commentAttachments.length > 0 ? [...commentAttachments] : undefined,
    };

    const updatedRequest = {
      ...selectedRequest,
      comments: [...selectedRequest.comments, comment],
    };

    setRequests(requests.map((r) => (r.id === selectedRequest.id ? updatedRequest : r)));
    setSelectedRequest(updatedRequest);
    setNewComment("");
    setCommentAttachments([]);
  };

  const handleSaveIssueAttachments = () => {
    if (!selectedRequest || issueAttachments.length === 0) return;

    const updatedRequest = {
      ...selectedRequest,
      attachments: [...(selectedRequest.attachments || []), ...issueAttachments],
    };

    setRequests(requests.map((r) => (r.id === selectedRequest.id ? updatedRequest : r)));
    setSelectedRequest(updatedRequest);
    setIssueAttachments([]);
  };

  const handleNewIssueFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments: Attachment[] = Array.from(files).map((file) => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type.startsWith("image/") ? "image" : "document",
      url: URL.createObjectURL(file),
      size: file.size,
    }));

    setNewIssueAttachments((prev) => [...prev, ...newAttachments]);
    e.target.value = "";
  };

  const handleCreateIssue = () => {
    if (!newIssue.title.trim()) return;

    const issueCount = requests.length + 1;
    const newRequest: Request = {
      id: Date.now().toString(),
      code: `SOL-${String(issueCount).padStart(3, "0")}`,
      title: newIssue.title.trim(),
      description: newIssue.description.trim(),
      status: "todo",
      priority: newIssue.priority,
      type: newIssue.type,
      project: selectedProject.name,
      createdAt: new Date(),
      comments: [],
      attachments: newIssueAttachments.length > 0 ? [...newIssueAttachments] : undefined,
    };

    // Agregar al inicio de la lista
    const otherRequests = requests.filter((r) => r.status !== "todo");
    const todoRequests = requests.filter((r) => r.status === "todo");
    setRequests([newRequest, ...todoRequests, ...otherRequests]);
    setIsNewIssueOpen(false);
    setNewIssue({ title: "", description: "", priority: "medium", type: "feature" });
    setNewIssueAttachments([]);
  };

  const resetNewIssueForm = () => {
    setNewIssue({ title: "", description: "", priority: "medium", type: "feature" });
    setNewIssueAttachments([]);
  };

  // Drag and drop handlers (solo para columna "todo")
  const handleDragStart = (e: React.DragEvent, request: Request) => {
    if (request.status !== "todo") return;
    setDraggedRequest(request);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, request: Request) => {
    e.preventDefault();
    if (!draggedRequest || request.status !== "todo" || request.id === draggedRequest.id) return;
    setDragOverRequestId(request.id);
  };

  const handleDragLeave = () => {
    setDragOverRequestId(null);
  };

  const handleDrop = (e: React.DragEvent, targetRequest: Request) => {
    e.preventDefault();
    if (!draggedRequest || targetRequest.status !== "todo" || draggedRequest.id === targetRequest.id) {
      setDraggedRequest(null);
      setDragOverRequestId(null);
      return;
    }

    const todoRequests = requests.filter((r) => r.status === "todo");
    const otherRequests = requests.filter((r) => r.status !== "todo");

    const draggedIndex = todoRequests.findIndex((r) => r.id === draggedRequest.id);
    const targetIndex = todoRequests.findIndex((r) => r.id === targetRequest.id);

    const newTodoRequests = [...todoRequests];
    newTodoRequests.splice(draggedIndex, 1);
    newTodoRequests.splice(targetIndex, 0, draggedRequest);

    setRequests([...newTodoRequests, ...otherRequests]);
    setDraggedRequest(null);
    setDragOverRequestId(null);
  };

  const handleDragEnd = () => {
    setDraggedRequest(null);
    setDragOverRequestId(null);
  };

  const isEditable = selectedRequest?.status === "todo";

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
                <div className="flex shrink-0 items-center justify-between p-3">
                  <div className="flex items-center gap-2">
                    {column.icon}
                    <span className="text-sm font-medium">{column.label}</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      {columnRequests.length}
                    </span>
                  </div>
                  {column.id === "todo" && (
                    <button
                      onClick={() => setIsNewIssueOpen(true)}
                      className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <Plus className="size-4" />
                    </button>
                  )}
                </div>

                {/* Cards */}
                <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-2 pt-0">
                  {columnRequests.map((request) => (
                    <div
                      key={request.id}
                      onClick={() => setSelectedRequest(request)}
                      draggable={column.id === "todo"}
                      onDragStart={(e) => handleDragStart(e, request)}
                      onDragOver={(e) => handleDragOver(e, request)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, request)}
                      onDragEnd={handleDragEnd}
                      className={`group rounded-lg border bg-card p-3 transition-all hover:shadow-md hover:shadow-primary/10 ${
                        column.id === "todo" ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
                      } ${
                        draggedRequest?.id === request.id ? "opacity-50" : ""
                      } ${
                        dragOverRequestId === request.id ? "border-primary border-2" : "border-border"
                      }`}
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
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1.5 rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                            <div className={`size-1.5 rounded-full ${getTypeInfo(request.type).color}`} />
                            {getTypeInfo(request.type).label}
                          </span>
                          <span className="flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                            {COLUMNS.find((c) => c.id === request.status)?.icon}
                            {getStatusLabel(request.status)}
                          </span>
                        </div>
                        {request.comments.length > 0 && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MessageSquare className="size-3" />
                            <span className="text-xs">{request.comments.length}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {column.id === "todo" && (
                    <button
                      onClick={() => setIsNewIssueOpen(true)}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border p-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      <Plus className="size-4" />
                      Nueva solicitud
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Request Detail Sheet */}
      <Sheet open={!!selectedRequest} onOpenChange={(open) => {
          if (!open) {
            setSelectedRequest(null);
            setIsEditingDescription(false);
            setEditedDescription("");
            setCommentAttachments([]);
            setIssueAttachments([]);
          }
        }}>
        <SheetContent side="right" className="flex w-full flex-col sm:max-w-xl p-0">
          {selectedRequest && (
            <>
              {/* Header */}
              <div className="border-b border-border px-6 py-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded bg-muted px-2 py-0.5 text-xs font-mono text-muted-foreground">
                    {selectedRequest.code}
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-xs">
                    {COLUMNS.find((c) => c.id === selectedRequest.status)?.icon}
                    {getStatusLabel(selectedRequest.status)}
                  </span>
                </div>
                <SheetHeader className="space-y-0">
                  <SheetTitle className="text-xl leading-tight">{selectedRequest.title}</SheetTitle>
                </SheetHeader>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Metadata */}
                <div className="grid grid-cols-2 gap-4 border-b border-border px-6 py-4">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Tipo</span>
                    <div className="flex items-center gap-2">
                      <div className={`size-2 rounded-full ${getTypeInfo(selectedRequest.type).color}`} />
                      <span className="text-sm font-medium">{getTypeInfo(selectedRequest.type).label}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Prioridad</span>
                    {isEditable ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex items-center gap-2 rounded-md bg-muted px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-muted/80">
                            <div className={`size-2 rounded-full ${getPriorityColor(selectedRequest.priority)}`} />
                            {getPriorityLabel(selectedRequest.priority)}
                            <ChevronDown className="size-3 text-muted-foreground" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem onClick={() => handlePriorityChange("high")} className="flex cursor-pointer items-center gap-2">
                            <div className="size-2 rounded-full bg-red-500" />
                            Alta
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePriorityChange("medium")} className="flex cursor-pointer items-center gap-2">
                            <div className="size-2 rounded-full bg-yellow-500" />
                            Media
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePriorityChange("low")} className="flex cursor-pointer items-center gap-2">
                            <div className="size-2 rounded-full bg-green-500" />
                            Baja
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className={`size-2 rounded-full ${getPriorityColor(selectedRequest.priority)}`} />
                        <span className="text-sm font-medium">{getPriorityLabel(selectedRequest.priority)}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Proyecto</span>
                    <p className="text-sm font-medium">{selectedRequest.project}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Creado</span>
                    <p className="text-sm font-medium">{formatDate(selectedRequest.createdAt)}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="border-b border-border px-6 py-4">
                  <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Descripción
                  </h4>
                  {isEditingDescription ? (
                    <div className="space-y-3">
                      <Textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        className="min-h-[120px] resize-none"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleDescriptionSave}>
                          Guardar
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleDescriptionCancel}>
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p
                      onClick={handleDescriptionEdit}
                      className={`text-sm leading-relaxed text-muted-foreground rounded-md ${
                        isEditable ? "cursor-pointer p-2 -mx-2 transition-colors hover:bg-muted" : ""
                      }`}
                    >
                      {selectedRequest.description}
                    </p>
                  )}
                </div>

                {/* Attachments */}
                <div className="border-b border-border px-6 py-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Adjuntos
                    </h4>
                    {isEditable && (
                      <>
                        <input
                          ref={issueFileInputRef}
                          type="file"
                          multiple
                          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
                          className="hidden"
                          onChange={(e) => handleFileSelect(e, "issue")}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 text-xs"
                          onClick={() => issueFileInputRef.current?.click()}
                        >
                          <Paperclip className="mr-1.5 size-3.5" />
                          Adjuntar
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Pending attachments to save */}
                  {issueAttachments.length > 0 && (
                    <div className="mb-3 space-y-2">
                      <p className="text-xs text-muted-foreground">Nuevos adjuntos:</p>
                      <div className="flex flex-wrap gap-2">
                        {issueAttachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="flex items-center gap-2 rounded-md border border-border bg-muted/50 px-2.5 py-1.5"
                          >
                            {attachment.type === "image" ? (
                              <ImageIcon className="size-4 text-muted-foreground" />
                            ) : (
                              <FileText className="size-4 text-muted-foreground" />
                            )}
                            <span className="max-w-[150px] truncate text-xs">{attachment.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({formatFileSize(attachment.size)})
                            </span>
                            <button
                              onClick={() => removeAttachment(attachment.id, "issue")}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <X className="size-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <Button size="sm" onClick={handleSaveIssueAttachments}>
                        Guardar adjuntos
                      </Button>
                    </div>
                  )}

                  {/* Existing attachments */}
                  {selectedRequest.attachments && selectedRequest.attachments.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedRequest.attachments.map((attachment) => (
                        <a
                          key={attachment.id}
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-md border border-border bg-muted/50 px-2.5 py-1.5 transition-colors hover:bg-muted"
                        >
                          {attachment.type === "image" ? (
                            <ImageIcon className="size-4 text-muted-foreground" />
                          ) : (
                            <FileText className="size-4 text-muted-foreground" />
                          )}
                          <span className="max-w-[150px] truncate text-xs">{attachment.name}</span>
                          <span className="text-xs text-muted-foreground">
                            ({formatFileSize(attachment.size)})
                          </span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    issueAttachments.length === 0 && (
                      <p className="text-sm text-muted-foreground">Sin adjuntos</p>
                    )
                  )}
                </div>

                {/* Comments */}
                <div className="px-6 py-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Comentarios
                    </h4>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      {selectedRequest.comments.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {selectedRequest.comments.length > 0 ? (
                      selectedRequest.comments.map((comment) => (
                        <div key={comment.id} className="rounded-lg bg-muted/50 p-3">
                          <div className="mb-1.5 flex items-center justify-between">
                            <span className="text-sm font-medium">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatCommentDate(comment.createdAt)}
                            </span>
                          </div>
                          {comment.content && (
                            <p className="text-sm text-muted-foreground">{comment.content}</p>
                          )}
                          {comment.attachments && comment.attachments.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {comment.attachments.map((attachment) => (
                                <a
                                  key={attachment.id}
                                  href={attachment.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 rounded border border-border bg-background px-2 py-1 text-xs transition-colors hover:bg-muted"
                                >
                                  {attachment.type === "image" ? (
                                    <ImageIcon className="size-3.5 text-muted-foreground" />
                                  ) : (
                                    <FileText className="size-3.5 text-muted-foreground" />
                                  )}
                                  <span className="max-w-[120px] truncate">{attachment.name}</span>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="py-4 text-center text-sm text-muted-foreground">
                        No hay comentarios aún
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer - Add Comment */}
              <div className="border-t border-border px-6 py-4">
                {/* Preview of attachments */}
                {commentAttachments.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {commentAttachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-2 py-1"
                      >
                        {attachment.type === "image" ? (
                          <ImageIcon className="size-3.5 text-muted-foreground" />
                        ) : (
                          <FileText className="size-3.5 text-muted-foreground" />
                        )}
                        <span className="max-w-[100px] truncate text-xs">{attachment.name}</span>
                        <button
                          onClick={() => removeAttachment(attachment.id, "comment")}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="size-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    ref={commentFileInputRef}
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
                    className="hidden"
                    onChange={(e) => handleFileSelect(e, "comment")}
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    className="shrink-0"
                    onClick={() => commentFileInputRef.current?.click()}
                  >
                    <Paperclip className="size-4" />
                  </Button>
                  <Input
                    placeholder="Escribe un comentario..."
                    className="flex-1"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddCommentWithAttachments()}
                  />
                  <Button
                    onClick={handleAddCommentWithAttachments}
                    disabled={!newComment.trim() && commentAttachments.length === 0}
                  >
                    Enviar
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

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

      {/* New Issue Sheet */}
      <Sheet open={isNewIssueOpen} onOpenChange={(open) => {
        if (!open) resetNewIssueForm();
        setIsNewIssueOpen(open);
      }}>
        <SheetContent side="right" className="flex w-full flex-col sm:max-w-xl p-0">
          {/* Header */}
          <div className="border-b border-border px-6 py-5">
            <SheetHeader className="space-y-1">
              <SheetTitle className="text-xl">Nueva solicitud</SheetTitle>
              <p className="text-sm text-muted-foreground">
                Proyecto: {selectedProject.name}
              </p>
            </SheetHeader>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Title */}
            <div className="border-b border-border px-6 py-4">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Título
              </label>
              <Input
                placeholder="Título de la solicitud..."
                value={newIssue.title}
                onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
              />
            </div>

            {/* Priority */}
            <div className="border-b border-border px-6 py-4">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Prioridad
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
                    <div className={`size-2 rounded-full ${getPriorityColor(newIssue.priority)}`} />
                    {getPriorityLabel(newIssue.priority)}
                    <ChevronDown className="ml-1 size-4 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem
                    onClick={() => setNewIssue({ ...newIssue, priority: "high" })}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <div className="size-2 rounded-full bg-red-500" />
                    Alta
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setNewIssue({ ...newIssue, priority: "medium" })}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <div className="size-2 rounded-full bg-yellow-500" />
                    Media
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setNewIssue({ ...newIssue, priority: "low" })}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <div className="size-2 rounded-full bg-green-500" />
                    Baja
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Type */}
            <div className="border-b border-border px-6 py-4">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Tipo
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
                    <div className={`size-2 rounded-full ${getTypeInfo(newIssue.type).color}`} />
                    {getTypeInfo(newIssue.type).label}
                    <ChevronDown className="ml-1 size-4 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {REQUEST_TYPES.map((type) => (
                    <DropdownMenuItem
                      key={type.id}
                      onClick={() => setNewIssue({ ...newIssue, type: type.id })}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <div className={`size-2 rounded-full ${type.color}`} />
                      {type.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Description */}
            <div className="border-b border-border px-6 py-4">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Descripción
              </label>
              <Textarea
                placeholder="Describe la solicitud en detalle..."
                value={newIssue.description}
                onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                className="min-h-[120px] resize-none"
              />
            </div>

            {/* Attachments */}
            <div className="px-6 py-4">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Adjuntos
                </label>
                <input
                  ref={newIssueFileInputRef}
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
                  className="hidden"
                  onChange={handleNewIssueFileSelect}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs"
                  onClick={() => newIssueFileInputRef.current?.click()}
                >
                  <Paperclip className="mr-1.5 size-3.5" />
                  Adjuntar
                </Button>
              </div>

              {newIssueAttachments.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {newIssueAttachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center gap-2 rounded-md border border-border bg-muted/50 px-2.5 py-1.5"
                    >
                      {attachment.type === "image" ? (
                        <ImageIcon className="size-4 text-muted-foreground" />
                      ) : (
                        <FileText className="size-4 text-muted-foreground" />
                      )}
                      <span className="max-w-[150px] truncate text-xs">{attachment.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({formatFileSize(attachment.size)})
                      </span>
                      <button
                        onClick={() => setNewIssueAttachments((prev) => prev.filter((a) => a.id !== attachment.id))}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Sin adjuntos</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border px-6 py-4">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsNewIssueOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1"
                onClick={handleCreateIssue}
                disabled={!newIssue.title.trim()}
              >
                Crear solicitud
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

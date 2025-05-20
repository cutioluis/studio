
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, XCircle, CheckCircle2, AlertTriangle, UsersRound, PenSquare } from "lucide-react"; // Added PenSquare, removed CalendarPlus

interface ScheduleOption {
  id: string;
  days: string;
  time: string;
  type?: string; // e.g., Intensivo
  status: "agotado" | "disponible" | "ultimas";
  statusText: string;
  notes?: string;
}

const scheduleData: ScheduleOption[] = [
  {
    id: "1",
    days: "Lunes y Miércoles",
    time: "9am - 12pm",
    status: "agotado",
    statusText: "Cupos Agotados",
  },
  {
    id: "2",
    days: "Martes y Viernes",
    time: "9am - 12pm",
    status: "disponible",
    statusText: "Plazas Disponibles",
  },
  {
    id: "3",
    days: "Sábados",
    time: "9am - 3pm",
    type: "Intensivo",
    status: "disponible",
    statusText: "Plazas Disponibles",
  },
  {
    id: "4",
    days: "Domingos",
    time: "9am - 3pm",
    type: "Intensivo",
    status: "disponible",
    statusText: "Plazas Disponibles",
  },
];

export function ScheduleSection() {
  const getStatusIcon = (status: ScheduleOption["status"]) => {
    switch (status) {
      case "agotado":
        return <XCircle className="h-5 w-5" />;
      case "disponible":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "ultimas":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getBadgeVariant = (status: ScheduleOption["status"]): "destructive" | "default" | "secondary" => {
    switch (status) {
      case "agotado":
        return "destructive";
      case "disponible":
        return "default";
      case "ultimas":
        return "secondary";
      default:
        return "default";
    }
  };

  const handleCalendlyPopup = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: 'https://calendly.com/cutioluis?background_color=000000&text_color=f6b5e9',
      });
    }
  };

  return (
    <section id="schedule" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <UsersRound className="h-12 w-12 mx-auto text-accent mb-4" />
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">
            Nuestros Horarios <span className="text-accent">Flexibles</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70 sm:text-xl">
            Encuentra el horario perfecto para ti y comienza tu formación como profesional de la belleza.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {scheduleData.map((schedule) => (
            <Card key={schedule.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card rounded-xl overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl font-semibold text-accent">{schedule.days}</CardTitle>
                  {schedule.type && (
                    <Badge variant="secondary" className="text-xs">
                      {schedule.type}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-foreground/80">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  <span>{schedule.time}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between pt-2">
                <div className="mb-4">
                    <Badge variant={getBadgeVariant(schedule.status)} className="w-full justify-center py-2 text-sm">
                        {getStatusIcon(schedule.status)}
                        <span className="ml-2">{schedule.statusText}</span>
                    </Badge>
                    {schedule.notes && <p className="text-xs text-foreground/60 mt-2 text-center">{schedule.notes}</p>}
                </div>
                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={schedule.status === "agotado"}
                >
                  <a
                    href={schedule.status !== "agotado" ? "https://walink.co/bd3d37" : undefined}
                    target={schedule.status !== "agotado" ? "_blank" : undefined}
                    rel={schedule.status !== "agotado" ? "noopener noreferrer" : undefined}
                  >
                    {schedule.status === "agotado"
                      ? <XCircle className="h-4 w-4 mr-2" />
                      : <PenSquare className="h-4 w-4 mr-2" />
                    }
                    {schedule.status === "agotado"
                      ? schedule.statusText // Will show "Cupos Agotados"
                      : "Inscríbete por WhatsApp"
                    }
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-12 text-center text-foreground/70">
          ¿No encuentras un horario que te funcione o tienes dudas? <a href="#" onClick={handleCalendlyPopup} className="text-accent font-semibold hover:underline">Agenda una asesoría gratuita</a>, ¡podemos ayudarte!
        </p>
      </div>
    </section>
  );
}


"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, XCircle, CheckCircle2, AlertTriangle, UsersRound } from "lucide-react";

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

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.33 3.4 16.8L2 22L7.31 20.65C8.73 21.33 10.33 21.7 12.04 21.7C17.5 21.7 21.95 17.25 21.95 11.81C21.95 6.35 17.5 2 12.04 2ZM17.94 16.11C17.69 16.69 16.94 17.08 16.39 17.18C15.93 17.26 15.33 17.35 13.69 16.78C11.68 16.08 10.18 14.33 10.04 14.17C9.88 13.99 9.08 12.96 9.08 11.91C9.08 10.86 9.83 10.15 10.09 9.9C10.32 9.68 10.67 9.62 10.97 9.62C11.23 9.62 11.45 9.64 11.63 9.67C11.86 9.72 12.08 10.33 12.26 10.83C12.44 11.34 12.53 11.59 12.43 11.89C12.33 12.19 12.23 12.32 12.06 12.52C11.89 12.72 11.71 12.88 11.56 13.08C11.41 13.26 11.25 13.47 11.45 13.82C11.65 14.17 12.38 15.09 13.26 15.83C14.33 16.74 15.12 17.03 15.45 17.03C15.79 17.03 16.16 16.96 16.4 16.54C16.64 16.12 17.07 15.53 17.07 15.53C17.07 15.53 17.45 15.03 17.81 15.03C18.16 15.03 18.51 15.03 18.51 15.03L17.94 16.11Z"/>
  </svg>
);

export function ScheduleSection() {
  const getStatusIcon = (status: ScheduleOption["status"]) => {
    switch (status) {
      case "agotado":
        return <XCircle className="h-5 w-5 text-destructive" />;
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
        return "default"; // Or your accent color for positive
      case "ultimas":
        return "secondary"; // Or a specific warning color
      default:
        return "outline";
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
                    <Badge variant="outline" className="text-xs border-primary/50 text-primary">
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
                  <a href="https://walink.co/bd3d37" target="_blank" rel="noopener noreferrer">
                     <WhatsAppIcon />
                    {schedule.status === "agotado" ? "No Disponible" : "Consultar / Inscribirme"}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-12 text-center text-foreground/70">
          ¿No encuentras un horario que te funcione? <a href="https://walink.co/bd3d37" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">Contáctanos</a>, ¡podemos tener más opciones!
        </p>
      </div>
    </section>
  );
}

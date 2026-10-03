// ISO order: 1 = Monday ... 7 = Sunday
export type WeekDay = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Horario {
  modalidad: string;
  dias: WeekDay[];
  inicio: string; // "HH:mm"
  fin: string; // "HH:mm"
}

export interface Modulo {
  numero: number;
  nombre: string;
  temario: string[];
}

export interface Programa {
  /** Career slug: it is the public id used in /programs/<id>. */
  id: string;
  nombre: string;
  duracion: string;
  descripcion: string;
  /** Value of the `carreras.icono` enum: palette | sparkles | scissors | megaphone | bot. */
  icono?: string;
  mostSell: boolean;
  areas: string[];
  horarios: Horario[];
  modulos: Modulo[];
}

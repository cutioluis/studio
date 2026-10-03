import { describe, expect, it } from "vitest";
import { groupSchedules, mapCareerRow, trimTime, type CareerRow } from "./career-mapper";

const row = (overrides: Partial<CareerRow> = {}): CareerRow => ({
  id: "c1",
  slug: "maestra",
  nombre: "Maestra",
  descripcion: "Desc",
  duracion_meses: 12,
  icono: "sparkles",
  destacada: true,
  orden: 1,
  carrera_areas: [],
  modalidades: [],
  modulos: [],
  ...overrides,
});

describe("trimTime", () => {
  it("drops seconds and keeps the leading zero", () => {
    expect(trimTime("09:00:00")).toBe("09:00");
    expect(trimTime("13:30")).toBe("13:30");
  });
});

describe("groupSchedules", () => {
  it("merges days that share the same hours into one entry", () => {
    expect(
      groupSchedules("Entre semana", [
        { dia_semana: 5, hora_inicio: "09:00:00", hora_fin: "12:00:00" },
        { dia_semana: 1, hora_inicio: "09:00:00", hora_fin: "12:00:00" },
        { dia_semana: 3, hora_inicio: "09:00:00", hora_fin: "12:00:00" },
      ]),
    ).toEqual([{ modalidad: "Entre semana", dias: [1, 3, 5], inicio: "09:00", fin: "12:00" }]);
  });

  it("keeps different hours as separate entries", () => {
    expect(
      groupSchedules("Mixto", [
        { dia_semana: 2, hora_inicio: "14:00:00", hora_fin: "16:00:00" },
        { dia_semana: 1, hora_inicio: "09:00:00", hora_fin: "12:00:00" },
      ]),
    ).toEqual([
      { modalidad: "Mixto", dias: [1], inicio: "09:00", fin: "12:00" },
      { modalidad: "Mixto", dias: [2], inicio: "14:00", fin: "16:00" },
    ]);
  });

  it("returns nothing without schedules", () => expect(groupSchedules("X", [])).toEqual([]));
});

describe("mapCareerRow", () => {
  it("maps identity, duration text, icon and featured flag", () => {
    const career = mapCareerRow(row());
    expect(career).toMatchObject({
      id: "maestra",
      nombre: "Maestra",
      duracion: "12 meses",
      descripcion: "Desc",
      icono: "sparkles",
      mostSell: true,
    });
  });

  it("uses singular for one month and omits a missing icon", () => {
    const career = mapCareerRow(row({ duracion_meses: 1, icono: null, descripcion: null }));
    expect(career.duracion).toBe("1 mes");
    expect(career.icono).toBeUndefined();
    expect(career.descripcion).toBe("");
  });

  it("orders areas and accepts the embedded area as object or array", () => {
    const career = mapCareerRow(
      row({
        carrera_areas: [
          { orden: 2, areas: { nombre: "Cejas" } },
          { orden: 1, areas: [{ nombre: "Uñas" }] },
        ],
      }),
    );
    expect(career.areas).toEqual(["Uñas", "Cejas"]);
  });

  it("skips inactive modalities and orders the rest", () => {
    const career = mapCareerRow(
      row({
        modalidades: [
          { nombre: "B", orden: 2, activa: true, horarios_modalidad: [{ dia_semana: 6, hora_inicio: "08:00:00", hora_fin: "14:00:00" }] },
          { nombre: "Off", orden: 0, activa: false, horarios_modalidad: [{ dia_semana: 1, hora_inicio: "08:00:00", hora_fin: "09:00:00" }] },
          { nombre: "A", orden: 1, activa: true, horarios_modalidad: [{ dia_semana: 4, hora_inicio: "09:00:00", hora_fin: "14:00:00" }] },
        ],
      }),
    );
    expect(career.horarios.map((h) => h.modalidad)).toEqual(["A", "B"]);
  });

  it("sorts modules by number (gaps allowed) and topics by order", () => {
    const career = mapCareerRow(
      row({
        modulos: [
          { numero: 4, nombre: "Cuatro", temas: [] },
          { numero: 1, nombre: "Uno", temas: [{ orden: 2, descripcion: "b" }, { orden: 1, descripcion: "a" }] },
          { numero: 3, nombre: "Tres", temas: [] },
        ],
      }),
    );
    expect(career.modulos.map((m) => m.numero)).toEqual([1, 3, 4]);
    expect(career.modulos[0].temario).toEqual(["a", "b"]);
  });
});

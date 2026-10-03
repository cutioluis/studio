import { describe, expect, it } from "vitest";
import { formatDuration, formatMoney, formatSchedule, formatTime } from "./format";

describe("formatTime", () => {
  it("drops seconds and leading zero", () => {
    expect(formatTime("09:00:00")).toBe("9:00");
    expect(formatTime("13:30:00")).toBe("13:30");
  });
});

describe("formatMoney", () => {
  it("omits cents for whole amounts", () => expect(formatMoney(60)).toBe("$60"));
  it("keeps two decimals otherwise", () => expect(formatMoney(60.5)).toBe("$60.50"));
});

describe("formatDuration", () => {
  it("pluralizes months", () => {
    expect(formatDuration(1)).toBe("1 mes");
    expect(formatDuration(12)).toBe("12 meses");
  });
});

describe("formatSchedule", () => {
  it("joins days and shares the time range", () => {
    expect(
      formatSchedule([
        { dayOfWeek: 1, startTime: "09:00:00", endTime: "12:00:00" },
        { dayOfWeek: 3, startTime: "09:00:00", endTime: "12:00:00" },
        { dayOfWeek: 5, startTime: "09:00:00", endTime: "12:00:00" },
      ]),
    ).toBe("Lunes, miércoles y viernes · 9:00 – 12:00");
  });
  it("handles a single day", () => {
    expect(formatSchedule([{ dayOfWeek: 6, startTime: "08:00:00", endTime: "14:00:00" }])).toBe("Sábado · 8:00 – 14:00");
  });
  it("groups days with different time ranges", () => {
    expect(
      formatSchedule([
        { dayOfWeek: 1, startTime: "09:00:00", endTime: "12:00:00" },
        { dayOfWeek: 2, startTime: "14:00:00", endTime: "16:00:00" },
      ]),
    ).toBe("Lunes · 9:00 – 12:00; martes · 14:00 – 16:00");
  });
  it("returns an empty string without schedules", () => expect(formatSchedule([])).toBe(""));
});

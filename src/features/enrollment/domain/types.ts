export type Schedule = { dayOfWeek: number; startTime: string; endTime: string };

export type Modality = {
  id: string;
  name: string;
  monthlyFee: number;
  schedules: Schedule[];
};

export type Career = {
  id: string;
  slug: string;
  name: string;
  description: string;
  durationMonths: number;
  enrollmentFee: number;
  modalities: Modality[];
};

export type BankAccount = {
  id: string;
  bankName: string;
  accountType: "ahorros" | "corriente";
  accountNumber: string;
  holder: string;
  holderIdType: "cedula" | "ruc";
  holderId: string;
};

export type EnrollmentResult =
  | { ok: true; code: string; amount: number }
  | { ok: false; message: string; fieldErrors?: Record<string, string> };

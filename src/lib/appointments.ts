export const APPOINTMENT_CONFIG = {
  timezone: "Asia/Bangkok",
  openHour: 8,
  closeHour: 17,
  slotMinutes: 60,
  bufferMinutes: 0,
  defaultDays: 14,
  maxDays: 60,
};

const BANGKOK_OFFSET_MINUTES = 7 * 60;

export type Slot = {
  start: Date;
  end: Date;
};

export type StoredAppointment = {
  start_time: string;
  end_time: string;
};

export const addMinutes = (date: Date, minutes: number) =>
  new Date(date.getTime() + minutes * 60 * 1000);

export const getBangkokDateParts = (date: Date) => {
  const shifted = new Date(date.getTime() + BANGKOK_OFFSET_MINUTES * 60 * 1000);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
  };
};

export const createBangkokDate = (
  year: number,
  month: number,
  day: number,
  hour = 0,
  minute = 0,
) => new Date(Date.UTC(year, month - 1, day, hour - 7, minute));

export const isWeekdayBangkok = (date: Date) => {
  const day = date.getUTCDay();
  return day !== 0 && day !== 6;
};

export const buildSlotsForDate = (
  year: number,
  month: number,
  day: number,
) => {
  const slots: Slot[] = [];
  const base = createBangkokDate(year, month, day, 0, 0);
  if (!isWeekdayBangkok(base)) {
    return slots;
  }

  const { openHour, closeHour, slotMinutes, bufferMinutes } =
    APPOINTMENT_CONFIG;
  const totalMinutes = (closeHour - openHour) * 60;

  for (
    let offset = 0;
    offset + slotMinutes <= totalMinutes;
    offset += slotMinutes + bufferMinutes
  ) {
    const start = addMinutes(base, openHour * 60 + offset);
    const end = addMinutes(start, slotMinutes);
    slots.push({ start, end });
  }

  return slots;
};

export const isSlotAligned = (start: Date) => {
  const { openHour, closeHour, slotMinutes, bufferMinutes } =
    APPOINTMENT_CONFIG;
  const parts = getBangkokDateParts(start);
  const base = createBangkokDate(parts.year, parts.month, parts.day, 0, 0);
  if (!isWeekdayBangkok(base)) {
    return false;
  }
  const minutesFromOpen =
    start.getTime() - addMinutes(base, openHour * 60).getTime();
  if (minutesFromOpen < 0) {
    return false;
  }
  const totalMinutes = (closeHour - openHour) * 60;
  if (minutesFromOpen >= totalMinutes * 60 * 1000) {
    return false;
  }
  const slotBlock = (slotMinutes + bufferMinutes) * 60 * 1000;
  return minutesFromOpen % slotBlock === 0;
};

export const hasConflict = (slot: Slot, appointments: StoredAppointment[]) => {
  const buffer = APPOINTMENT_CONFIG.bufferMinutes;
  return appointments.some((appointment) => {
    const existingStart = new Date(appointment.start_time);
    const existingEnd = new Date(appointment.end_time);
    const windowStart = addMinutes(existingStart, -buffer);
    const windowEnd = addMinutes(existingEnd, buffer);
    return slot.start < windowEnd && slot.end > windowStart;
  });
};

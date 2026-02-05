import { useMemo } from "react";

type AvailabilitySlot = {
  start: string;
  end: string;
};

type TimeSlotListProps = {
  slots: AvailabilitySlot[];
  selectedSlot: AvailabilitySlot | null;
  onSelectSlot: (slot: AvailabilitySlot) => void;
  dateLabel: string;
};

export function TimeSlotList({
  slots,
  selectedSlot,
  onSelectSlot,
  dateLabel,
}: TimeSlotListProps) {
  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("th-TH", {
        timeZone: "Asia/Bangkok",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    [],
  );

  const formatTime = (isoString: string) => {
    return timeFormatter.format(new Date(isoString));
  };

  if (slots.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-white/40 text-sm">ไม่มีเวลาว่างแล้ว</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="text-white/80 font-semibold mb-4 text-sm md:text-base">
        ช่วงเวลาว่างวันที่ {dateLabel}
      </div>
      {/* Responsive height - expands based on number of slots */}
      <div className="space-y-2">
        {slots.map((slot) => {
          const isSelected = selectedSlot?.start === slot.start;
          const timeLabel = formatTime(slot.start);

          return (
            <button
              key={slot.start}
              type="button"
              onClick={() => onSelectSlot(slot)}
              className={`w-full text-left px-5 py-3.5 md:py-4 rounded-xl border transition-smooth ${
                isSelected
                  ? "border-[#FFB347] bg-[#FFB347]/20 text-[#FFB347] font-semibold"
                  : "border-white/10 bg-white/[0.02] text-white/80 hover:border-[#FFB347]/60 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <span className="text-base md:text-lg font-mono">{timeLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

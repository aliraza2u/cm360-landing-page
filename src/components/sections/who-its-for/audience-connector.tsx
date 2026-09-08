import { ACCENT_HEX, AUDIENCES } from "./data";

/** Soft dashed arc with colored dots aligned to each audience card. */
export function AudienceConnector() {
  const dots = AUDIENCES.map((item) => ({
    id: item.id,
    color: ACCENT_HEX[item.accent],
  }));

  return (
    <div className="pointer-events-none relative mb-2 hidden h-10 lg:block" aria-hidden>
      <svg
        className="absolute inset-x-0 top-0 h-full w-full overflow-visible"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
      >
        <path
          d="M1 26 C 8 10, 14 8, 20 18 S 32 34, 40 20 S 52 6, 60 20 S 72 34, 80 18 S 92 6, 99 22"
          fill="none"
          stroke="rgba(22,119,255,0.3)"
          strokeWidth="0.65"
          strokeDasharray="1.5 1.7"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="absolute inset-x-0 top-2 grid grid-cols-5">
        {dots.map((dot) => (
          <span key={dot.id} className="flex justify-center">
            <span
              className="h-2.5 w-2.5 rounded-full shadow-[0_0_0_4px_rgba(255,255,255,0.85)]"
              style={{ backgroundColor: dot.color }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

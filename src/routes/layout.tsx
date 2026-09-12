import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Printer,
  CheckCircle2,
  Ruler,
} from "lucide-react";

export const Route = createFileRoute("/layout")({
  head: () => ({
    meta: [
      { title: "ছাদের লে-আউট — ১৮০ kW সোলার (অ্যানিমেটেড)" },
      {
        name: "description",
        content:
          "১৬,০০০ বর্গফুট ছাদে ১৮০ kW অন-গ্রিড সোলার সিস্টেম কীভাবে বসবে — প্যানেল, স্ট্রাকচার, ইনভার্টার, কম্বাইনার বক্স, আর্থিং ও হাঁটার পথ ধাপে ধাপে অ্যানিমেশনে।",
      },
    ],
  }),
  component: RoofLayoutPage,
});

/* ---------------- বাংলা সংখ্যা ---------------- */

const bn = (v: number | string) =>
  String(v).replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

const bnNum = (n: number) => bn(n.toLocaleString("en-IN"));

/* ---------------- জ্যামিতি (সব মাপ ফুটে) ---------------- */

const FT = 6; // ১ ফুট = ৬ SVG ইউনিট
const PAD = 30;

const ROOF_W = 160;
const ROOF_H = 100;
const SETBACK = 4; // পরিধির হাঁটার পথ

const VB_W = ROOF_W * FT + PAD * 2;
const VB_H = ROOF_H * FT + PAD * 2;

// ৬২০ Wp প্যানেল: ২.৩৮ মি × ১.১৩ মি ≈ ৭.৮১ ফুট × ৩.৭১ ফুট (ল্যান্ডস্কেপ)
const P_W = 7.81;
const P_H = 3.71;

const COLS = 19;
const ROWS = 16;
const ROW_PITCH = 4.4; // সারির কেন্দ্র থেকে কেন্দ্র (ছায়ার ফাঁকসহ, ~৫–১০° টিল্ট)
const AISLE_AFTER = 8; // ৮ম সারির পর মাঝের হাঁটার পথ
const AISLE = 3;

const ARRAY_X = (ROOF_W - COLS * P_W) / 2; // ≈ ৫.৮ ফুট
const ARRAY_Y = SETBACK;

const TOTAL_PANELS = 296;
const PANEL_WP = 620;

const x = (ft: number) => PAD + ft * FT;
const y = (ft: number) => PAD + ft * FT;
const w = (ft: number) => ft * FT;

const rowTop = (r: number) =>
  ARRAY_Y + r * ROW_PITCH + (r >= AISLE_AFTER ? AISLE : 0);

type Panel = { i: number; r: number; c: number; fx: number; fy: number };

const PANELS: Panel[] = (() => {
  const out: Panel[] = [];
  let i = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (i >= TOTAL_PANELS) break;
      out.push({ i, r, c, fx: ARRAY_X + c * P_W, fy: rowTop(r) });
      i++;
    }
  }
  return out;
})();

// ইনভার্টার গ্রুপ — রঙ দিয়ে আলাদা করা
const GROUPS = [
  { key: "A", color: "#14324c", panels: 95 },
  { key: "B", color: "#1f5f8f", panels: 95 },
  { key: "C", color: "#3a8dc4", panels: 106 },
];

const groupOf = (r: number) =>
  r <= 4 ? GROUPS[0] : r <= 9 ? GROUPS[1] : GROUPS[2];

// যন্ত্রপাতি জোন
const EQ = { fx: 8, fy: 82, fw: 32, fh: 12 };
const INVERTERS = [{ fx: 10 }, { fx: 20.5 }, { fx: 31 }];
const ACDB = { fx: 46, fy: 84, fw: 7, fh: 6 };
const METER = { fx: 57, fy: 84, fw: 6, fh: 6 };

// DC কম্বাইনার বক্স — মাঝের হাঁটার পথে
const AISLE_Y = rowTop(AISLE_AFTER) - AISLE + 0.4;
const DCDB_X = [10, 34, 58, 82, 106, 130];

// আর্থিং পিট ও লাইটনিং অ্যারেস্টার
const EARTH_PITS: Array<[number, number]> = [
  [4.4, 20],
  [4.4, 52],
  [4.4, 78],
  [155.6, 20],
  [155.6, 52],
  [155.6, 78],
];
const LA_MASTS: Array<[number, number]> = [
  [7.5, 7.5],
  [152.5, 7.5],
];

/* ---------------- হিসাব ---------------- */

const ARRAY_FW = COLS * P_W; // ≈ ১৪৮.৪ ফুট
const ARRAY_FH = rowTop(ROWS - 1) + P_H - ARRAY_Y; // ≈ ৭২.৭ ফুট
const ARRAY_AREA = Math.round(ARRAY_FW * ARRAY_FH);
const EQ_AREA = EQ.fw * EQ.fh;
const ROOF_AREA = ROOF_W * ROOF_H;
const FREE_AREA = ROOF_AREA - ARRAY_AREA - EQ_AREA;
const PANEL_AREA = Math.round(TOTAL_PANELS * P_W * P_H);
const TOTAL_KWP = (TOTAL_PANELS * PANEL_WP) / 1000;

/* ---------------- ধাপ ---------------- */

const STAGES = [
  {
    t: "ধাপ ১ — ছাদ",
    d: `১৬০ ফুট × ১০০ ফুট = ${bnNum(ROOF_AREA)} বর্গফুট ছাদ। (মাপ অনুমান করা — সাইট সার্ভেতে চূড়ান্ত হবে)`,
    ms: 1900,
  },
  {
    t: "ধাপ ২ — পরিধির হাঁটার পথ",
    d: "চারপাশে ৪ ফুট খালি রাখা হয় — অগ্নিনিরাপত্তা, পরিষ্কার ও রক্ষণাবেক্ষণের জন্য।",
    ms: 1900,
  },
  {
    t: "ধাপ ৩ — মাউন্টিং স্ট্রাকচার",
    d: `হট-ডিপ গ্যালভানাইজড ${bn(ROWS)}টি সারি, সারির ফাঁক ${bn(ROW_PITCH)} ফুট (ছায়া এড়াতে) + মাঝে ${bn(AISLE)} ফুট হাঁটার পথ।`,
    ms: 2000,
  },
  {
    t: "ধাপ ৪ — সোলার প্যানেল বসছে",
    d: `${bn(TOTAL_PANELS)} পিস × ${bn(PANEL_WP)} Wp = ${bn(TOTAL_KWP.toFixed(1))} kWp। রঙ অনুযায়ী তিনটি ইনভার্টার গ্রুপ।`,
    ms: 3400,
  },
  {
    t: "ধাপ ৫ — DC ক্যাবল ও কম্বাইনার বক্স",
    d: "৬টি DCDB মাঝের হাঁটার পথে। প্যানেলের স্ট্রিং → DCDB → ক্যাবল ট্রে হয়ে ইনভার্টারে।",
    ms: 2300,
  },
  {
    t: "ধাপ ৬ — ইনভার্টার, ACDB ও নেট-মিটার",
    d: `৩ × ৬০ kW ইনভার্টার ছায়াযুক্ত দেয়ালঘেঁষা ${bn(EQ.fw)}×${bn(EQ.fh)} ফুট জোনে → ACDB → নেট-মিটার।`,
    ms: 2300,
  },
  {
    t: "ধাপ ৭ — আর্থিং ও লাইটনিং প্রোটেকশন",
    d: "৬টি কেমিক্যাল আর্থিং পিট + ২টি ESE লাইটনিং অ্যারেস্টার মাস্ট।",
    ms: 2100,
  },
  {
    t: "ধাপ ৮ — সম্পূর্ণ লে-আউট",
    d: "সব মিলিয়ে ছাদের কতটুকু লাগল, কতটুকু খালি থাকল — নিচে হিসাব।",
    ms: 0,
  },
];

const LAST = STAGES.length - 1;

/* ---------------- পেজ ---------------- */

function RoofLayoutPage() {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [placed, setPlaced] = useState(0);

  const panelsOn = stage >= 3;

  // অটো-প্লে
  useEffect(() => {
    if (!playing || stage >= LAST) return;
    const id = setTimeout(
      () => setStage((s) => Math.min(s + 1, LAST)),
      STAGES[stage].ms,
    );
    return () => clearTimeout(id);
  }, [playing, stage]);

  useEffect(() => {
    if (stage >= LAST) setPlaying(false);
  }, [stage]);

  // প্যানেল কাউন্টার
  useEffect(() => {
    if (!panelsOn) {
      setPlaced(0);
      return;
    }
    let raf = 0;
    const dur = TOTAL_PANELS * 6 + 300;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setPlaced(Math.round(p * TOTAL_PANELS));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [panelsOn]);

  const restart = useCallback(() => {
    setStage(0);
    setPlaced(0);
    setPlaying(true);
  }, []);

  const show = (from: number) => (stage >= from ? 1 : 0);
  const layer = (from: number, delay = 0) => ({
    opacity: show(from),
    transition: `opacity .55s ease ${delay}ms`,
  });

  return (
    <div className="min-h-screen py-6 sm:py-10 print:py-0">
      <style>{`
        @media print {
          .rl-layer { opacity: 1 !important; }
          .rl-panel { opacity: 1 !important; transition: none !important; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-5xl px-3 sm:px-6">
        <div className="no-print mb-4 flex justify-end">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Printer className="h-4 w-4" />
            প্রিন্ট / PDF সেভ করুন
          </button>
        </div>

        <article className="overflow-hidden rounded-xl border border-brand-red/20 bg-card shadow-xl">
          <header className="relative border-b border-brand-red/20 bg-brand-red-soft px-6 py-6 sm:px-10">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-brand-red" />
            <p className="flex items-center gap-2 text-sm font-semibold text-brand-red">
              <Ruler className="h-4 w-4" /> ছাদের লে-আউট পরিকল্পনা
            </p>
            <h1 className="font-display mt-2 border-l-4 border-brand-red pl-4 text-2xl font-bold leading-tight text-foreground sm:text-3xl">
              ১৬,০০০ বর্গফুট ছাদে ১৮০ kW
              <br />
              কীভাবে বসবে — ধাপে ধাপে
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-ink-soft">
              প্যানেল, স্ট্রাকচার, ইনভার্টার, কম্বাইনার বক্স, ক্যাবল রুট, আর্থিং ও
              হাঁটার পথ — প্রতিটি কোথায় বসবে এবং কতটুকু জায়গা নেবে।
            </p>
          </header>

          <main className="space-y-6 px-4 py-6 sm:px-8">
            {/* ধাপের বিবরণ */}
            <div className="rounded-lg border border-brand-red/20 border-l-4 border-l-brand-red bg-brand-red-soft p-4">
              <p className="text-sm font-bold text-brand-red">{STAGES[stage].t}</p>
              <p className="mt-1 text-sm text-ink-soft">{STAGES[stage].d}</p>
            </div>

            {/* ছাদের ড্রয়িং */}
            <div className="overflow-x-auto rounded-lg border border-brand-red/20 bg-[#fbf9f5] p-2">
              <svg
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                className="h-auto w-full min-w-[620px]"
                role="img"
                aria-label="ছাদে সোলার সিস্টেমের লে-আউট"
              >
                <defs>
                  <pattern
                    id="walk"
                    width="8"
                    height="8"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(45)"
                  >
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#d8cfbd" strokeWidth="3" />
                  </pattern>
                </defs>

                {/* ছাদ */}
                <g className="rl-layer" style={layer(0)}>
                  <rect
                    x={x(0)}
                    y={y(0)}
                    width={w(ROOF_W)}
                    height={w(ROOF_H)}
                    rx="4"
                    fill="#f3efe7"
                    stroke="#c9bfab"
                    strokeWidth="2.5"
                  />
                  <text
                    x={x(ROOF_W / 2)}
                    y={y(0) - 10}
                    textAnchor="middle"
                    fontSize="16"
                    fill="#8a7f6b"
                  >
                    ১৬০ ফুট
                  </text>
                  <text
                    x={x(0) - 12}
                    y={y(ROOF_H / 2)}
                    textAnchor="middle"
                    fontSize="16"
                    fill="#8a7f6b"
                    transform={`rotate(-90 ${x(0) - 12} ${y(ROOF_H / 2)})`}
                  >
                    ১০০ ফুট
                  </text>
                </g>

                {/* পরিধির হাঁটার পথ */}
                <g className="rl-layer" style={layer(1)}>
                  <path
                    d={`M${x(0)},${y(0)} H${x(ROOF_W)} V${y(ROOF_H)} H${x(0)} Z M${x(SETBACK)},${y(SETBACK)} V${y(ROOF_H - SETBACK)} H${x(ROOF_W - SETBACK)} V${y(SETBACK)} Z`}
                    fill="url(#walk)"
                    fillRule="evenodd"
                    opacity="0.85"
                  />
                  <rect
                    x={x(SETBACK)}
                    y={y(SETBACK)}
                    width={w(ROOF_W - SETBACK * 2)}
                    height={w(ROOF_H - SETBACK * 2)}
                    fill="none"
                    stroke="#b9ac93"
                    strokeWidth="1.5"
                    strokeDasharray="8 6"
                  />
                  <text
                    x={x(ROOF_W / 2)}
                    y={y(2.9)}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#8a7f6b"
                  >
                    ৪ ফুট পরিধির হাঁটার পথ
                  </text>
                </g>

                {/* মাউন্টিং স্ট্রাকচার */}
                <g className="rl-layer" style={layer(2)}>
                  {Array.from({ length: ROWS }).map((_, r) => (
                    <g key={r}>
                      <rect
                        x={x(ARRAY_X - 0.6)}
                        y={y(rowTop(r) + P_H - 0.35)}
                        width={w(ARRAY_FW + 1.2)}
                        height={w(0.45)}
                        fill="#9aa3ad"
                        rx="1"
                        style={{ transition: `opacity .4s ${r * 45}ms`, opacity: show(2) }}
                      />
                      <rect
                        x={x(ARRAY_X - 0.6)}
                        y={y(rowTop(r))}
                        width={w(ARRAY_FW + 1.2)}
                        height={w(0.35)}
                        fill="#b3bac2"
                        rx="1"
                        style={{ transition: `opacity .4s ${r * 45}ms`, opacity: show(2) }}
                      />
                    </g>
                  ))}
                  <text
                    x={x(ROOF_W / 2)}
                    y={y(rowTop(AISLE_AFTER) - 0.9)}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#8a7f6b"
                  >
                    ৩ ফুট মেইনটেন্যান্স পথ
                  </text>
                </g>

                {/* সোলার প্যানেল */}
                <g>
                  {PANELS.map((p) => {
                    const g = groupOf(p.r);
                    return (
                      <rect
                        key={p.i}
                        className="rl-panel"
                        x={x(p.fx + 0.1)}
                        y={y(p.fy)}
                        width={w(P_W - 0.2)}
                        height={w(P_H)}
                        rx="1.5"
                        fill={g.color}
                        stroke="#0b1c2b"
                        strokeWidth="0.6"
                        style={{
                          opacity: show(3),
                          transition: `opacity .22s ease ${p.i * 6}ms`,
                        }}
                      />
                    );
                  })}
                </g>

                {/* DC ক্যাবল ও কম্বাইনার বক্স */}
                <g className="rl-layer" style={layer(4)}>
                  <line
                    x1={x(10)}
                    y1={y(79)}
                    x2={x(132)}
                    y2={y(79)}
                    stroke="#c2410c"
                    strokeWidth="2"
                    strokeDasharray="7 5"
                  />
                  {DCDB_X.map((dx) => (
                    <g key={dx}>
                      <line
                        x1={x(dx + 2.25)}
                        y1={y(AISLE_Y + 2.2)}
                        x2={x(dx + 2.25)}
                        y2={y(79)}
                        stroke="#c2410c"
                        strokeWidth="1.6"
                        strokeDasharray="6 4"
                      />
                      <rect
                        x={x(dx)}
                        y={y(AISLE_Y)}
                        width={w(4.5)}
                        height={w(2.2)}
                        rx="1.5"
                        fill="#fde7d3"
                        stroke="#c2410c"
                        strokeWidth="1.4"
                      />
                    </g>
                  ))}
                  <line
                    x1={x(24)}
                    y1={y(79)}
                    x2={x(24)}
                    y2={y(EQ.fy)}
                    stroke="#c2410c"
                    strokeWidth="2.4"
                  />
                  <text x={x(136)} y={y(79.8)} fontSize="11" fill="#c2410c">
                    DC ক্যাবল ট্রে
                  </text>
                  <text x={x(10)} y={y(AISLE_Y - 0.6)} fontSize="11" fill="#c2410c">
                    ৬টি DC কম্বাইনার বক্স (DCDB)
                  </text>
                </g>

                {/* ইনভার্টার জোন */}
                <g className="rl-layer" style={layer(5)}>
                  <rect
                    x={x(EQ.fx)}
                    y={y(EQ.fy)}
                    width={w(EQ.fw)}
                    height={w(EQ.fh)}
                    rx="3"
                    fill="#eef2f6"
                    stroke="#475569"
                    strokeWidth="2"
                  />
                  {INVERTERS.map((inv, idx) => (
                    <g key={inv.fx}>
                      <rect
                        x={x(inv.fx)}
                        y={y(85.5)}
                        width={w(7)}
                        height={w(5)}
                        rx="1.5"
                        fill={GROUPS[idx].color}
                        stroke="#0f172a"
                        strokeWidth="1"
                      />
                      <text
                        x={x(inv.fx + 3.5)}
                        y={y(88.6)}
                        textAnchor="middle"
                        fontSize="12"
                        fill="#ffffff"
                        fontWeight="700"
                      >
                        ৬০
                      </text>
                    </g>
                  ))}
                  <text
                    x={x(EQ.fx)}
                    y={y(EQ.fy - 1.2)}
                    fontSize="12"
                    fill="#334155"
                    fontWeight="700"
                  >
                    ইনভার্টার জোন ৩২ × ১২ ফুট (৩ × ৬০ kW)
                  </text>

                  <line
                    x1={x(EQ.fx + EQ.fw)}
                    y1={y(87)}
                    x2={x(ACDB.fx)}
                    y2={y(87)}
                    stroke="#0f766e"
                    strokeWidth="2.4"
                  />
                  <rect
                    x={x(ACDB.fx)}
                    y={y(ACDB.fy)}
                    width={w(ACDB.fw)}
                    height={w(ACDB.fh)}
                    rx="2"
                    fill="#ccfbf1"
                    stroke="#0f766e"
                    strokeWidth="1.8"
                  />
                  <text
                    x={x(ACDB.fx + ACDB.fw / 2)}
                    y={y(ACDB.fy + 3.8)}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#0f766e"
                    fontWeight="700"
                  >
                    ACDB
                  </text>
                  <line
                    x1={x(ACDB.fx + ACDB.fw)}
                    y1={y(87)}
                    x2={x(METER.fx)}
                    y2={y(87)}
                    stroke="#0f766e"
                    strokeWidth="2.4"
                  />
                  <rect
                    x={x(METER.fx)}
                    y={y(METER.fy)}
                    width={w(METER.fw)}
                    height={w(METER.fh)}
                    rx="2"
                    fill="#ccfbf1"
                    stroke="#0f766e"
                    strokeWidth="1.8"
                  />
                  <text
                    x={x(METER.fx + METER.fw / 2)}
                    y={y(METER.fy + 3.8)}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#0f766e"
                    fontWeight="700"
                  >
                    নেট-মিটার
                  </text>
                </g>

                {/* আর্থিং ও লাইটনিং */}
                <g className="rl-layer" style={layer(6)}>
                  {EARTH_PITS.map(([ex, ey]) => (
                    <g key={`${ex}-${ey}`}>
                      <circle
                        cx={x(ex)}
                        cy={y(ey)}
                        r={w(1.3)}
                        fill="#fef3c7"
                        stroke="#b45309"
                        strokeWidth="1.6"
                      />
                      <text
                        x={x(ex)}
                        y={y(ey) + 4}
                        textAnchor="middle"
                        fontSize="9"
                        fill="#b45309"
                        fontWeight="700"
                      >
                        E
                      </text>
                    </g>
                  ))}
                  {LA_MASTS.map(([lx, ly]) => (
                    <g key={`${lx}-${ly}`}>
                      <circle
                        cx={x(lx)}
                        cy={y(ly)}
                        r={w(1.5)}
                        fill="#fee2e2"
                        stroke="#b91c1c"
                        strokeWidth="1.8"
                      />
                      <circle
                        cx={x(lx)}
                        cy={y(ly)}
                        r={w(3)}
                        fill="none"
                        stroke="#b91c1c"
                        strokeWidth="1"
                        opacity="0.55"
                      />
                      <circle
                        cx={x(lx)}
                        cy={y(ly)}
                        r={w(4.5)}
                        fill="none"
                        stroke="#b91c1c"
                        strokeWidth="0.8"
                        opacity="0.3"
                      />
                    </g>
                  ))}
                  <text
                    x={x(ROOF_W / 2)}
                    y={y(ROOF_H - 1.2)}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#b45309"
                  >
                    E = কেমিক্যাল আর্থিং পিট (৬টি) • লাল বৃত্ত = ESE লাইটনিং অ্যারেস্টার (২টি)
                  </text>
                </g>
              </svg>
            </div>

            {/* কন্ট্রোল */}
            <div className="no-print flex flex-wrap items-center gap-2">
              <button
                onClick={() => (stage >= LAST ? restart() : setPlaying((p) => !p))}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {stage >= LAST ? (
                  <>
                    <RotateCcw className="h-4 w-4" /> আবার দেখুন
                  </>
                ) : playing ? (
                  <>
                    <Pause className="h-4 w-4" /> থামান
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" /> চালান
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setPlaying(false);
                  setStage((s) => Math.max(0, s - 1));
                }}
                className="inline-flex items-center gap-1 rounded-lg border border-brand-red/30 px-3 py-2 text-sm font-medium text-brand-red"
              >
                <ChevronLeft className="h-4 w-4" /> আগের
              </button>
              <button
                onClick={() => {
                  setPlaying(false);
                  setStage((s) => Math.min(LAST, s + 1));
                }}
                className="inline-flex items-center gap-1 rounded-lg border border-brand-red/30 px-3 py-2 text-sm font-medium text-brand-red"
              >
                পরের <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={restart}
                className="inline-flex items-center gap-1 rounded-lg border border-brand-red/30 px-3 py-2 text-sm font-medium text-brand-red"
              >
                <RotateCcw className="h-4 w-4" /> শুরু থেকে
              </button>
            </div>

            {/* ধাপের চিপ */}
            <div className="no-print flex flex-wrap gap-1.5">
              {STAGES.map((s, i) => (
                <button
                  key={s.t}
                  onClick={() => {
                    setPlaying(false);
                    setStage(i);
                  }}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    i === stage
                      ? "bg-brand-red text-white"
                      : i < stage
                        ? "bg-brand-red-soft text-brand-red"
                        : "border border-brand-red/20 text-ink-soft"
                  }`}
                >
                  {bn(i + 1)}
                </button>
              ))}
            </div>

            {/* লাইভ কাউন্টার */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["প্যানেল বসানো হলো", `${bn(placed)} / ${bn(TOTAL_PANELS)}`],
                ["ক্ষমতা", `${bn(((placed * PANEL_WP) / 1000).toFixed(1))} kWp`],
                ["সারি", `${bn(ROWS)} সারি × ${bn(COLS)}`],
                ["ইনভার্টার", "৩ × ৬০ kW"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="rounded-lg border border-brand-red/15 border-t-2 border-t-brand-red bg-card p-4"
                >
                  <p className="text-xs text-muted-foreground">{k}</p>
                  <p className="mt-1 font-bold tabular-nums">{v}</p>
                </div>
              ))}
            </div>

            {/* লেজেন্ড */}
            <div className="rounded-lg border border-brand-red/20 bg-card p-4">
              <p className="text-sm font-bold text-brand-red">রঙের অর্থ</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {GROUPS.map((g, i) => (
                  <div key={g.key} className="flex items-center gap-2 text-sm">
                    <span className="h-4 w-6 rounded-sm" style={{ background: g.color }} />
                    <span className="text-ink-soft">
                      ইনভার্টার-{bn(i + 1)} — {bn(g.panels)} প্যানেল (
                      {bn(((g.panels * PANEL_WP) / 1000).toFixed(1))} kWp)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* জায়গার হিসাব */}
            <section>
              <h2 className="font-display text-lg font-bold text-foreground">জায়গার হিসাব</h2>
              <div className="mt-3 overflow-x-auto rounded-lg border border-brand-red/20">
                <table className="w-full min-w-[520px] text-sm">
                  <thead>
                    <tr className="bg-brand-red text-left text-primary-foreground">
                      <th className="px-3 py-2.5 font-semibold">অংশ</th>
                      <th className="px-3 py-2.5 font-semibold">মাপ</th>
                      <th className="px-3 py-2.5 text-right font-semibold">আয়তন (বর্গফুট)</th>
                      <th className="px-3 py-2.5 text-right font-semibold">ছাদের %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(
                      [
                        [
                          "প্যানেল অ্যারে ব্লক (সারির ফাঁকসহ)",
                          `${bn(Math.round(ARRAY_FW))} × ${bn(Math.round(ARRAY_FH))} ফুট`,
                          ARRAY_AREA,
                        ],
                        [
                          "ইনভার্টার ও সুইচগিয়ার জোন",
                          `${bn(EQ.fw)} × ${bn(EQ.fh)} ফুট`,
                          EQ_AREA,
                        ],
                        ["পরিধি + রক্ষণাবেক্ষণের খালি জায়গা", "—", FREE_AREA],
                      ] as Array<[string, string, number]>
                    ).map(([k, m, a]) => (
                      <tr key={k} className="border-t even:bg-brand-red-soft/45">
                        <td className="px-3 py-2.5">{k}</td>
                        <td className="whitespace-nowrap px-3 py-2.5 text-ink-soft">{m}</td>
                        <td className="px-3 py-2.5 text-right tabular-nums">{bnNum(a)}</td>
                        <td className="px-3 py-2.5 text-right tabular-nums">
                          {bn(((a / ROOF_AREA) * 100).toFixed(1))}%
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-brand-red bg-brand-red-soft font-bold">
                      <td className="px-3 py-2.5">মোট ছাদ</td>
                      <td className="px-3 py-2.5">১৬০ × ১০০ ফুট</td>
                      <td className="px-3 py-2.5 text-right tabular-nums">{bnNum(ROOF_AREA)}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums">১০০%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-ink-soft">
                শুধু প্যানেলগুলোর নিজস্ব আয়তন {bnNum(PANEL_AREA)} বর্গফুট; সারির মাঝে ছায়া
                এড়ানোর ফাঁক ও হাঁটার পথ যোগ করলে অ্যারে ব্লক দাঁড়ায় {bnNum(ARRAY_AREA)}{" "}
                বর্গফুট।
              </p>
            </section>

            {/* সিদ্ধান্ত */}
            <div className="rounded-lg border-2 border-brand-red bg-brand-red-soft p-5">
              <p className="flex items-center gap-2 font-bold text-brand-red">
                <CheckCircle2 className="h-5 w-5" />
                হ্যাঁ — ১৬,০০০ বর্গফুট ছাদে ১৮০ kW আরামে বসানো যাবে
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-ink-soft">
                <li>
                  প্যানেল অ্যারে + যন্ত্রপাতি জোন মিলে লাগছে {bnNum(ARRAY_AREA + EQ_AREA)}{" "}
                  বর্গফুট — ছাদের{" "}
                  {bn((((ARRAY_AREA + EQ_AREA) / ROOF_AREA) * 100).toFixed(0))}%।
                </li>
                <li>
                  বাকি {bnNum(FREE_AREA)} বর্গফুট খালি থাকছে হাঁটাচলা, পরিষ্কার ও ভবিষ্যতের
                  সম্প্রসারণের জন্য।
                </li>
                <li>
                  শর্ত: ছাদ ছায়ামুক্ত হতে হবে (পানির ট্যাংক, লিফট রুম, পাশের বিল্ডিং, গাছ)
                  এবং ছাদ প্রতি বর্গফুটে অতিরিক্ত ৪–৫ কেজি ভার নিতে সক্ষম হতে হবে।
                </li>
                <li>
                  ছাদের প্রকৃত আকার ও বাধা অনুযায়ী সারি বিন্যাস সাইট সার্ভেতে চূড়ান্ত হবে।
                </li>
              </ul>
            </div>
          </main>

          <footer className="border-t border-brand-red/20 bg-brand-red-soft px-6 py-5 text-center text-xs text-ink-soft sm:px-10">
            <p className="font-bold text-brand-red">SUNCLICK GLOBAL LIMITED</p>
            <p className="mt-1">www.sunclickgloballimited.com</p>
            <p className="mt-2">
              এই লে-আউট পরিকল্পনার উদ্দেশ্যে তৈরি — চূড়ান্ত ডিজাইনের জন্য সাইট পরিদর্শন
              প্রয়োজন।
            </p>
          </footer>
        </article>
      </div>
    </div>
  );
}

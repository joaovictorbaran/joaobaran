import type { ReactNode } from "react";
import { COLORS } from "./colors";

export const LINE = {
  stroke: COLORS.text3,
  strokeOpacity: 0.55,
  strokeWidth: 1.5,
  fill: "none",
} as const;

type NodeProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  accent?: boolean;
  muted?: boolean;
  size?: number;
};

export function Node({ x, y, w, h, label, accent, muted, size = 14 }: NodeProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={12}
        fill={accent ? COLORS.accent : COLORS.bg}
        fillOpacity={accent ? 0.16 : 1}
        stroke={accent ? COLORS.accent : COLORS.text3}
        strokeOpacity={accent ? 1 : muted ? 0.35 : 0.55}
        strokeWidth={1.5}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + size * 0.35}
        textAnchor="middle"
        fontSize={size}
        fontWeight={600}
        fill={muted ? COLORS.text3 : COLORS.text}
      >
        {label}
      </text>
    </g>
  );
}

export function DiagramDefs() {
  return (
    <defs>
      <marker id="jb-arrow" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={7} markerHeight={7} orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={COLORS.text3} fillOpacity={0.8} />
      </marker>
      <marker id="jb-arrow-blue" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={7} markerHeight={7} orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={COLORS.accent} />
      </marker>
    </defs>
  );
}

type CaptionProps = {
  x?: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
};

export function Caption({ x = 200, y, children, anchor = "middle" }: CaptionProps) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={12.5} fill={COLORS.text3}>
      {children}
    </text>
  );
}

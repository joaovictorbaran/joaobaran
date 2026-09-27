import { COLORS } from "./colors";
import { Caption, DiagramDefs, LINE } from "./shared";

export function DiagMigracao() {
  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label="A operação segue no ar sem interrupção enquanto a base muda de Bubble para Xano"
    >
      <DiagramDefs />
      <text x={20} y={42} fontSize={13} fontWeight={600} fill={COLORS.text}>
        Operação no ar
      </text>
      <text x={380} y={42} textAnchor="end" fontSize={12.5} fill={COLORS.text3}>
        sem downtime
      </text>
      <rect x={20} y={54} width={360} height={10} rx={5} fill={COLORS.accent} />
      <line x1={170} y1={84} x2={170} y2={236} stroke={COLORS.text3} strokeOpacity={0.5} strokeDasharray="4 4" />
      <line x1={232} y1={84} x2={232} y2={236} stroke={COLORS.text3} strokeOpacity={0.5} strokeDasharray="4 4" />
      <rect x={20} y={112} width={212} height={40} rx={12} fill={COLORS.surface} stroke={COLORS.text3} strokeOpacity={0.35} strokeWidth={1.5} />
      <text x={36} y={137} fontSize={14} fontWeight={600} fill={COLORS.text3}>
        Bubble
      </text>
      <rect x={170} y={178} width={210} height={40} rx={12} fill={COLORS.accent} fillOpacity={0.16} stroke={COLORS.accent} strokeWidth={1.5} />
      <text x={364} y={203} textAnchor="end" fontSize={14} fontWeight={600} fill={COLORS.text}>
        Xano
      </text>
      <Caption x={201} y={256}>transição</Caption>
      <path d="M 20 280 L 378 280" {...LINE} markerEnd="url(#jb-arrow)" />
      <text x={20} y={272} fontSize={12} fill={COLORS.text3}>
        tempo
      </text>
    </svg>
  );
}

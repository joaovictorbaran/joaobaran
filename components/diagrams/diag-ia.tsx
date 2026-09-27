import { COLORS } from "./colors";
import { Caption, DiagramDefs, LINE } from "./shared";

const FIELDS = ["Emitente", "Data", "Valor", "Itens"];
const LINE_WIDTHS = [64, 44, 64, 44, 64];

export function DiagIA() {
  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label="Uma nota fiscal é lida por um modelo de IA, que extrai emitente, data, valor e itens como dados estruturados"
    >
      <DiagramDefs />
      <rect x={24} y={58} width={92} height={124} rx={10} fill={COLORS.bg} stroke={COLORS.text3} strokeOpacity={0.55} strokeWidth={1.5} />
      {[82, 100, 118, 136, 154].map((y, i) => (
        <rect key={y} x={38} y={y} width={LINE_WIDTHS[i]} height={6} rx={3} fill={COLORS.text3} fillOpacity={0.4} />
      ))}
      <Caption x={70} y={206}>Nota fiscal</Caption>
      <path d="M 116 120 L 164 120" {...LINE} markerEnd="url(#jb-arrow)" />
      <circle cx={200} cy={120} r={32} fill={COLORS.accent} fillOpacity={0.16} stroke={COLORS.accent} strokeWidth={1.5} />
      <text x={200} y={126} textAnchor="middle" fontSize={17} fontWeight={700} fill={COLORS.text}>
        IA
      </text>
      <path d="M 232 120 L 256 120" stroke={COLORS.accent} strokeWidth={1.5} fill="none" markerEnd="url(#jb-arrow-blue)" />
      <rect x={260} y={50} width={122} height={140} rx={12} fill={COLORS.bg} stroke={COLORS.accent} strokeWidth={1.5} />
      {FIELDS.map((field, i) => {
        const y = 78 + i * 30;
        return (
          <g key={field}>
            <text x={274} y={y + 4} fontSize={12.5} fill={COLORS.text2}>
              {field}
            </text>
            <rect x={332} y={y - 3} width={38} height={6} rx={3} fill={COLORS.accent} fillOpacity={0.55} />
          </g>
        );
      })}
      <Caption x={321} y={214}>Dados estruturados</Caption>
      <Caption y={266}>Leitura e extração automáticas, dentro do sistema</Caption>
    </svg>
  );
}

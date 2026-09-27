import { COLORS } from "./colors";
import { Caption, DiagramDefs, LINE, Node } from "./shared";

const ROWS = ["Crédito", "Identidade", "Fraude"];

export function DiagCredito() {
  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label="Um pedido de parcelamento passa pelo motor, que analisa crédito, identidade e fraude, e sai aprovado ou recusado"
    >
      <DiagramDefs />
      <Node x={14} y={128} w={96} h={44} label="Pedido" />
      <path d="M 110 150 L 140 150" {...LINE} markerEnd="url(#jb-arrow)" />
      <rect x={144} y={62} width={142} height={176} rx={14} fill={COLORS.bg} stroke={COLORS.text3} strokeOpacity={0.55} strokeWidth={1.5} />
      <text x={215} y={92} textAnchor="middle" fontSize={14} fontWeight={600} fill={COLORS.text}>
        Motor de crédito
      </text>
      {ROWS.map((row, i) => {
        const y = 130 + i * 36;
        return (
          <g key={row}>
            <circle cx={168} cy={y} r={8} fill={COLORS.accent} />
            <path d="M 164 0 l 2.6 2.6 l 5 -5.2" transform={`translate(0 ${y})`} stroke="#fff" strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x={184} y={y + 4.5} fontSize={13} fill={COLORS.text2}>
              {row}
            </text>
          </g>
        );
      })}
      <path d="M 286 150 C 296 150, 294 108, 302 108" {...LINE} markerEnd="url(#jb-arrow)" />
      <path d="M 286 150 C 296 150, 294 192, 302 192" {...LINE} markerEnd="url(#jb-arrow)" />
      <Node x={306} y={88} w={84} h={40} label="Aprovado" accent size={13} />
      <Node x={306} y={172} w={84} h={40} label="Recusado" muted size={13} />
      <Caption y={276}>Decidir quem pode parcelar, com segurança</Caption>
    </svg>
  );
}

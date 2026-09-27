import { COLORS } from "./colors";
import { Caption, DiagramDefs, LINE, Node } from "./shared";

const DOTS = [70, 122, 174, 226, 278, 330];

export function DiagCobranca() {
  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label="Paciente paga em parcelas, a plataforma acompanha cada uma até o pagamento e a clínica recebe"
    >
      <DiagramDefs />
      <Node x={20} y={36} w={110} h={44} label="Paciente" />
      <Node x={270} y={36} w={110} h={44} label="Clínica" />
      <path d="M 75 80 L 75 150" {...LINE} markerEnd="url(#jb-arrow)" />
      <line x1={70} y1={170} x2={330} y2={170} stroke={COLORS.text3} strokeOpacity={0.35} strokeWidth={2} />
      <line x1={70} y1={170} x2={174} y2={170} stroke={COLORS.accent} strokeWidth={2} />
      {DOTS.map((x, i) => (
        <g key={x}>
          <circle
            cx={x}
            cy={170}
            r={12}
            fill={i < 3 ? COLORS.accent : COLORS.bg}
            stroke={i < 3 ? COLORS.accent : COLORS.text3}
            strokeOpacity={i < 3 ? 1 : 0.55}
            strokeWidth={1.5}
          />
          {i < 3 ? (
            <path
              d={`M ${x - 5} 170 l 3.5 3.5 l 6.5 -7`}
              stroke="#fff"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}
          <text x={x} y={202} textAnchor="middle" fontSize={12} fill={COLORS.text3}>
            {i + 1}ª
          </text>
        </g>
      ))}
      <path d="M 330 150 L 330 84" {...LINE} markerEnd="url(#jb-arrow)" />
      <Caption y={254}>Cada parcela acompanhada até o pagamento</Caption>
    </svg>
  );
}

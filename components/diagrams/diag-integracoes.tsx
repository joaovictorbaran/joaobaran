import { Caption, DiagramDefs, LINE, Node } from "./shared";

const ROW_Y = [44, 128, 212];
const BANK_LETTERS = ["A", "B", "C"];

export function DiagIntegracoes() {
  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label="Instituições financeiras se conectam à Parcela Mais por integração direta, e clientes enterprise se conectam pela API pública"
    >
      <DiagramDefs />
      {ROW_Y.map((y, i) => (
        <g key={`banco-${y}`}>
          <Node x={14} y={y} w={86} h={44} label={`Banco ${BANK_LETTERS[i]}`} size={13} />
          <path d={`M 100 ${y + 22} C 122 ${y + 22}, 122 150, 142 150`} {...LINE} />
        </g>
      ))}
      <Node x={142} y={128} w={116} h={44} label="Parcela Mais" accent size={13.5} />
      {ROW_Y.map((y, i) => (
        <g key={`cliente-${y}`}>
          <path d={`M 258 150 C 278 150, 278 ${y + 22}, 296 ${y + 22}`} {...LINE} markerEnd="url(#jb-arrow)" />
          <Node x={300} y={y} w={86} h={44} label={`Cliente ${i + 1}`} size={13} />
        </g>
      ))}
      <Caption x={14} y={282} anchor="start">
        Integração direta
      </Caption>
      <Caption x={386} y={282} anchor="end">
        API pública
      </Caption>
    </svg>
  );
}

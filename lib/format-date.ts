export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    // O front matter só tem a data (sem hora), então `new Date(date)` a lê como
    // meia-noite UTC. Sem fixar o fuso aqui, a formatação usa o fuso de quem
    // renderiza a página e pode mostrar o dia anterior (ex.: em UTC-3).
    timeZone: "UTC",
  });
}

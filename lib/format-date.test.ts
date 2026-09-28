import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { formatDate } from "./format-date";

describe("formatDate", () => {
  const originalTz = process.env.TZ;

  beforeEach(() => {
    // UTC-3 (Brasil): fuso onde o bug aparecia, já que `new Date(date)` lê a
    // string do front matter como meia-noite UTC.
    process.env.TZ = "America/Sao_Paulo";
  });

  afterEach(() => {
    process.env.TZ = originalTz;
  });

  it("mostra a mesma data do front matter, independentemente do fuso de quem renderiza", () => {
    expect(formatDate("2026-01-25")).toBe("25 de janeiro de 2026");
  });

  it("não perde um dia em viradas de mês", () => {
    expect(formatDate("2026-02-01")).toBe("1 de fevereiro de 2026");
  });
});

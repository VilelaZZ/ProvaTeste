/** Formata datas da API em pt-BR. Retorna null se vazio ou inválido. */
export function formatDate(value: string | null | undefined): string | null {
  if (!value) return null;

  // "2026-11-20" (LocalDate do Java) deve ser lido como data LOCAL; o `new Date(string)`
  // trataria como UTC e mostraria o dia anterior no Brasil.
  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  const date = dateOnly
    ? new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]))
    : new Date(value);

  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

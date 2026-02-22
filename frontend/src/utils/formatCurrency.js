export function formatCurrency(value, currency = 'BRL', locale = 'pt-BR') {
  const numeric = typeof value === 'number' ? value : Number(value);
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(
    Number.isFinite(numeric) ? numeric : 0,
  );
}

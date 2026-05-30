export function sampleItems(items, amount, excludedIds = []) {
  const pool = items.filter((item) => !excludedIds.includes(item.id));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, amount);
}

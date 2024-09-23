export function getViewsLabelRu(count: number): string {
  if (count % 10 === 1 && count % 100 !== 11) {
    return `просмотр`;
  } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14)) {
    return `просмотра`;
  } else {
    return `просмотров`;
  }
}

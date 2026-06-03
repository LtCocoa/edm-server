export function formatNameShort(name: { first: string, last: string, middle: string }) {
  return `${name.last} ${name.first.charAt(0)}.${name.middle.charAt(0)}`;
}
export default function classNames(
  ...classes: (string | undefined | null | boolean)[]
) {
  return classes
    .filter((v) => typeof v === "string")
    .filter(Boolean)
    .join(" ");
}

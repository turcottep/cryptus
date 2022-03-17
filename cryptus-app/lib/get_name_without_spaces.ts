export default function GetNameWithoutSpaces(name: string) {
  return name.replace(/\s/g, "");
}

export function get_clean_name(name: string) {
  return name
    .replace(/[^0-9a-z]/gi, " ")
    .replace(/\s/g, "")
    .toLowerCase();
}

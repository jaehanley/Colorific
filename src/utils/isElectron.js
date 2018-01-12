export default function isElectron() {
  let output = false;
  if (process && process.versions && process.versions.electron) {
    output = true;
  }
  return output;
}
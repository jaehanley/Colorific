export default function isElectron() {
  if (typeof require !== 'function') return false;
  if (typeof window !== 'object') return false;
  try {
    const electron = require('electron');
    if (typeof electron !== 'object') return false;
  } catch(e) {
    return false;
  }
  return true;
}
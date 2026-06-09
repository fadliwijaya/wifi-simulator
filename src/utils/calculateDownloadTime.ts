export function calculateDownloadTime(fileSizeGB: number, throughputMbps: number): number {
  // fileSizeMb = fileSizeGB * 1000 * 8
  // downloadTimeSeconds = fileSizeMb / throughputMbps
  const fileSizeMb = fileSizeGB * 1000 * 8;
  return fileSizeMb / throughputMbps;
}
